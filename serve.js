const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://assets.mailerlite.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: https://img.youtube.com; frame-src https://www.youtube.com https://drive.google.com; connect-src 'self' https://*.mailerlite.com;"
};

const server = http.createServer((req, res) => {
  // 1. Autoriser uniquement les requêtes GET et HEAD
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', 'Allow': 'GET, HEAD', ...SECURITY_HEADERS });
    res.end('405 Méthode non autorisée');
    return;
  }

  // 2. Décoder et nettoyer l'URL demandée
  const rawUrl = req.url.split('?')[0];
  if (rawUrl.includes('\0')) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
    res.end('400 Requête invalide');
    return;
  }

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(rawUrl);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
    res.end('400 Requête invalide');
    return;
  }

  if (decodedPath === '/' || decodedPath === '') {
    decodedPath = '/index.html';
  }

  // 3. Protection stricte contre la traversée de répertoire (Path Traversal)
  const cleanPath = decodedPath.replace(/^[a-zA-Z]:/, '').replace(/^[\\/]+/, '/');
  const relPath = cleanPath.replace(/^\/+/, '');
  const filePath = path.resolve(ROOT_DIR, relPath);

  if (filePath !== ROOT_DIR && !filePath.startsWith(ROOT_DIR + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
    res.end('403 Accès interdit');
    return;
  }

  // 4. Vérification de l'existence du fichier
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
      res.end('404 Fichier introuvable');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const headers = {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      ...SECURITY_HEADERS
    };

    if (req.method === 'HEAD') {
      res.writeHead(200, headers);
      res.end();
      return;
    }

    res.writeHead(200, headers);
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
      }
      res.end('500 Erreur interne du serveur');
    });
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Serveur Laméd sécurisé en écoute sur http://localhost:${PORT}/`);
});
