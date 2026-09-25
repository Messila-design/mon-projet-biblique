'use strict';

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

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://*.mailerlite.com https://assets.mailerlite.com",
  "script-src 'self' 'unsafe-inline' https://assets.mailerlite.com https://groot.mailerlite.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.mailerlite.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://img.youtube.com https://*.mailerlite.com https://storage.mlcdn.com https://assets.mlcdn.com",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://drive.google.com",
  "connect-src 'self' https://*.mailerlite.com https://assets.mailerlite.com https://storage.mlcdn.com https://cloudflareinsights.com",
].join('; ');

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Content-Security-Policy': CSP,
  'Cache-Control': 'no-cache'
};

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

function createServer() {
  return http.createServer({
    requestTimeout: 15000,
    headersTimeout: 10000,
    maxHeaderSize: 16384
  }, async (req, res) => {
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => res.setHeader(key, value));

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

    let handle;
    try {
      const realFile = await fs.promises.realpath(path.resolve(ROOT, name));
      if (!isInsideRoot(realFile)) {
        fail(404, 'Fichier introuvable');
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
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Content-Length': stat.size
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

module.exports = { createServer, isPublicFile };
