// Tiny static file server for local preview and Playwright (mimics GitHub Pages: /dir/ -> /dir/index.html).
// Usage: node scripts/serve.mjs <root> <port> [basePath]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');
const port = Number(process.argv[3] ?? 4791);
const base = process.argv[4] ?? '/kit-gpsr-vendeurs';
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
};

createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!p.startsWith(base + '/') && p !== base) { res.writeHead(302, { location: base + '/' }); return res.end(); }
  p = p.slice(base.length) || '/';
  let file = normalize(join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(await readFile(join(root, '404.html')).catch(() => 'Not found'));
  }
}).listen(port, () => console.log(`serving ${root} at http://localhost:${port}${base}/`));
