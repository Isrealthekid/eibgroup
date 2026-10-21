import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
// Serve Next.js's static export after npm run build.
const root=path.resolve(fileURLToPath(new URL('./out/',import.meta.url)));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.json':'application/json','.txt':'text/plain; charset=utf-8'};
async function sendFile(res, file, status = 200) {
  const body = await readFile(file);
  res.writeHead(status, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  res.end(body);
}

createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    // Resolve exported pages as .html files or directory indexes.
    const candidates = path.extname(file) ? [file] : [file, `${file}.html`, path.join(file, 'index.html')];
    for (const candidate of candidates) {
      try { await sendFile(res, candidate); return; } catch {}
    }
  } catch {}
  try { await sendFile(res, path.join(root, '404.html'), 404); }
  catch { res.writeHead(404); res.end('Not found'); }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://localhost:4173'));
