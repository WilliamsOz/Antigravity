#!/usr/bin/env node
/**
 * GuitarStudio — Serveur local avec synchronisation Git
 * Permet l'auto-sauvegarde de la progression dans progression.json dès qu'un niveau ou de l'XP est gagné.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = parseInt(process.env.PORT || '3000', 10);
const ROOT = path.resolve(__dirname);
const SAVE_JSON = path.join(ROOT, 'progression.json');
const SAVE_JS = path.join(ROOT, 'app', 'progression.js');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.m4a': 'audio/mp4',
  '.wav': 'audio/wav',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function writeSaveFiles(data) {
  const jsonStr = JSON.stringify(data, null, 2);
  fs.writeFileSync(SAVE_JSON, jsonStr, 'utf8');
  const jsContent = `/* Fichier de progression généré automatiquement par GuitarStudio pour synchronisation Git */\nwindow.GS_SAVED_STATE = ${jsonStr};\n`;
  fs.writeFileSync(SAVE_JS, jsContent, 'utf8');
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // API : Sauvegarde
  if (pathname === '/api/save') {
    if (req.method === 'GET') {
      if (fs.existsSync(SAVE_JSON)) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-cache' });
        return fs.createReadStream(SAVE_JSON).pipe(res);
      }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({}));
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 10 * 1024 * 1024) req.destroy();
      });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed && typeof parsed === 'object' && parsed.v === 2) {
            writeSaveFiles(parsed);
            console.log(`[${new Date().toLocaleTimeString()}] 💾 Progression enregistrée dans progression.json (Niv. XP: ${parsed.xp || 0})`);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            return res.end(JSON.stringify({ ok: true, timestamp: Date.now() }));
          }
          throw new Error('Données de sauvegarde invalides');
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    res.writeHead(405);
    return res.end();
  }

  // Fichiers statiques
  if (pathname === '/' || pathname === '/index.html') {
    pathname = '/studio_guitare.html';
  }

  const safePath = path.normalize(path.join(ROOT, pathname));
  if (!safePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Accès refusé');
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Fichier non trouvé');
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const range = req.headers.range;

    // Prise en charge des requêtes partielles (Range) pour les fichiers audio / PDF
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(safePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      file.pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Accept-Ranges': 'bytes'
    });
    fs.createReadStream(safePath).pipe(res);
  });
});

function openBrowser(url) {
  if (process.argv.includes('--no-open')) return;
  const cmd = process.platform === 'darwin'
    ? `open "${url}"`
    : process.platform === 'win32'
    ? `start "" "${url}"`
    : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n=============================================================`);
  console.log(`🎸 GuitarStudio est démarré sur : ${url}`);
  console.log(`💾 Sauvegarde automatique active -> progression.json`);
  console.log(`=============================================================`);
  console.log(`Pour synchroniser sur GitHub :`);
  console.log(`   git add progression.json app/progression.js`);
  console.log(`   git commit -m "Progression"`);
  console.log(`   git push`);
  console.log(`=============================================================\n`);
  openBrowser(url);
});
