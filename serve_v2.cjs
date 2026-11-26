const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 18088);
const ROOT = path.join(__dirname, 'build_v2');
const UPSTREAM_HOST = '127.0.0.1';
const UPSTREAM_PORT = 18080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function proxyChatwoot(req, res) {
  const options = {
    hostname: UPSTREAM_HOST,
    port: UPSTREAM_PORT,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: `${UPSTREAM_HOST}:${UPSTREAM_PORT}`,
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'upstream_unreachable', detail: err.message }));
  });

  req.pipe(proxyReq, { end: true });
}

const server = http.createServer((req, res) => {
  const reqPath = decodeURIComponent((req.url || '/').split('?')[0]);

  if (reqPath.startsWith('/cw/api/chatwoot')) {
    proxyChatwoot(req, res);
    return;
  }

  let relPath = reqPath === '/' ? '/index.html' : reqPath;
  if (relPath.endsWith('/')) relPath += 'index.html';

  const filePath = path.normalize(path.join(ROOT, relPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Aurellix Pay v2 test server listening on http://127.0.0.1:${PORT}/index.html`);
});
