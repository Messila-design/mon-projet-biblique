'use strict';

const crypto = require('node:crypto');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { pipeline } = require('node:stream');

const ROOT = fs.realpathSync(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const CSP_BASE = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://*.mailerlite.com https://assets.mailerlite.com",
  // Meta Pixel (connect.facebook.net), MailerLite (universal, webforms, jQuery,
  // polices) et Cloudflare Web Analytics doivent etre explicitement autorises,
  // sinon leurs ressources sont bloquees par le navigateur.
  "script-src 'self' https://connect.facebook.net https://assets.mailerlite.com https://assets.mlcdn.com https://groot.mailerlite.com https://static.mailerlite.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.mailerlite.com https://assets.mlcdn.com https://fonts.mailerlite.com",
  "font-src 'self' https://fonts.gstatic.com https://assets.mlcdn.com https://assets.mailerlite.com https://fonts.mailerlite.com",
  "img-src 'self' data: blob: https://img.youtube.com https://*.mailerlite.com https://storage.mlcdn.com https://assets.mlcdn.com",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://drive.google.com",
  "connect-src 'self' https://*.mailerlite.com https://assets.mailerlite.com https://assets.mlcdn.com https://storage.mlcdn.com https://cloudflareinsights.com"
];

// Un nonce unique par reponse autorise les scripts inline de la page
// sans avoir a maintenir 'unsafe-inline' dans script-src.
function buildCsp(nonce) {
  return CSP_BASE.map(directive => {
    if (!directive.startsWith('script-src ')) return directive;
    return `${directive} 'nonce-${nonce}'`;
  }).join('; ');
}

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Resource-Policy': 'same-origin'
  // Content-Security-Policy et Cache-Control sont defines lors de la reponse.
};

// HSTS : force le HTTPS pendant 2 ans (inclut les sous-domaines).
// Uniquement envoye sur une connexion securisee : inutile et trompeur en HTTP.
const HSTS_HEADER = 'max-age=63072000; includeSubDomains; preload';

function isPublicFile(name) {
  if (['index.html', 'app.js', 'articles-contenu.js'].includes(name)) return true;
  if (/^(?:images|images - la croix)\/[^/\\]+\.(?:png|jpe?g|webp|gif|ico|svg)$/i.test(name)) return true;
  if (/^articles\/[^/\\]+\.txt$/i.test(name)) return true;
  if (name === 'Textes/d-elohim-a-dieu.txt') return true;
  if (name === 'la croix/La Croix.docx.pdf') return true;
  return false;
}

function isInsideRoot(file) {
  const relative = path.relative(ROOT, file);
  return relative !== '' && relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
}

// Ajoute l'attribut nonce="..." aux scripts inline de la page.
// Seuls les blocs <script> sans src sont concernes : ce sont les seuls
// executes dans le contexte de la page.
function injecterNonce(html, nonce) {
  return html.replace(/<script(?![^>]*\bsrc=)([^>]*)>/gi, (balise, attrs) => {
    if (/\bnonce\s*=/i.test(attrs)) return balise;
    return `<script${attrs} nonce="${nonce}">`;
  });
}

function createServer() {
  return http.createServer({
    requestTimeout: 15000,
    headersTimeout: 10000,
    maxHeaderSize: 16384
  }, async (req, res) => {
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => res.setHeader(key, value));

    // HSTS uniquement sur une connexion securisee (derriere un reverse proxy HTTPS).
    const estSecurise = req.socket.encrypted === true
      || (req.headers['x-forwarded-proto'] || '').split(',')[0].trim().toLowerCase() === 'https';
    if (estSecurise) res.setHeader('Strict-Transport-Security', HSTS_HEADER);

    function fail(status, text) {
      res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : text);
    }

    if (!['GET', 'HEAD'].includes(req.method)) {
      res.setHeader('Allow', 'GET, HEAD');
      fail(405, 'Méthode non autorisée');
      return;
    }

    let requestPath;
    try {
      requestPath = decodeURIComponent((req.url || '').split('?')[0]);
    } catch {
      fail(400, 'Adresse invalide');
      return;
    }

    if (
      !requestPath.startsWith('/') ||
      /[\\\x00-\x1f\x7f:]/.test(requestPath) ||
      requestPath.split('/').some(part => part === '.' || part === '..' || part.startsWith('.'))
    ) {
      fail(400, 'Adresse invalide');
      return;
    }

    const name = requestPath === '/' ? 'index.html' : requestPath.slice(1);
    if (!isPublicFile(name)) {
      fail(404, 'Fichier introuvable');
      return;
    }

    // Nonce CSP : genere a chaque reponse, il autorise les scripts inline
    // de la page sans weakens 'unsafe-inline' dans script-src.
    const nonce = crypto.randomBytes(16).toString('base64');
    res.setHeader('Content-Security-Policy', buildCsp(nonce));

    let handle;
    try {
      const realFile = await fs.promises.realpath(path.resolve(ROOT, name));
      if (!isInsideRoot(realFile)) {
        fail(404, 'Fichier introuvable');
        return;
      }

      // Le HTML est relu pour y injecter le nonce sur les scripts inline.
      if (name === 'index.html') {
        const html = await fs.promises.readFile(realFile, 'utf8');
        const avecNonce = injecterNonce(html, nonce);
        const buffer = Buffer.from(avecNonce, 'utf8');
        res.writeHead(200, {
          'Content-Type': MIME_TYPES['.html'],
          'Content-Length': buffer.length,
          'Cache-Control': 'no-cache'
        });
        if (req.method === 'HEAD') {
          res.end();
          return;
        }
        res.end(buffer);
        return;
      }

      handle = await fs.promises.open(realFile, 'r');
      const stat = await handle.stat();
      if (!stat.isFile()) {
        await handle.close();
        handle = null;
        fail(404, 'Fichier introuvable');
        return;
      }
      const ext = path.extname(name).toLowerCase();
      // Le HTML et les scripts doivent toujours etre revalides ; les images et
      // documents, eux, sont stables et peuvent etre mis en cache longtemps.
      const estDocument = ext === '.js' || ext === '.json';
      const cacheControl = estDocument ? 'no-cache' : 'public, max-age=604800, stale-while-revalidate=86400';
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Content-Length': stat.size,
        'Cache-Control': cacheControl
      });
      if (req.method === 'HEAD') {
        await handle.close();
        handle = null;
        res.end();
        return;
      }
      const stream = handle.createReadStream();
      handle = null;
      pipeline(stream, res, () => { });
    } catch (error) {
      if (handle) await handle.close().catch(() => { });
      if (res.headersSent) {
        res.destroy();
        return;
      }
      fail(['ENOENT', 'ENOTDIR', 'EACCES', 'EPERM'].includes(error.code) ? 404 : 500, 'Fichier indisponible');
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT invalide');
  }
  const host = process.env.HOST || (process.env.RENDER ? '0.0.0.0' : '127.0.0.1');
  const server = createServer();
  server.on('error', error => {
    console.error('Impossible de démarrer le serveur : ' + error.code);
    process.exitCode = 1;
  });
  server.listen(port, host, () => {
    console.log(`Serveur Laméd sécurisé en écoute sur http://${host}:${port}/`);
  });
}

module.exports = { createServer, isPublicFile, buildCsp, injecterNonce };
