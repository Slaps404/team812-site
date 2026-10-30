import { copyFile, mkdir, rm } from 'node:fs/promises';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const PORT = 4532;
const distDir = new URL('../dist', import.meta.url).pathname;
const origin = `http://127.0.0.1:${PORT}`;
const packetUrl = `${origin}/packet/`;
const outFile = new URL('../packet/Team-812-Sponsorship-Packet-2027.pdf', import.meta.url);
const publicFile = new URL('../public/packet.pdf', import.meta.url);

const MIME = {
  '.css': 'text/css',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function fileFor(urlPath) {
  let rel = decodeURIComponent(urlPath.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';
  const candidates = [join(distDir, rel), join(distDir, rel, 'index.html')];
  for (const file of candidates) {
    if (!file.startsWith(distDir)) continue;
    if (existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

const server = createServer((req, res) => {
  const file = fileFor(req.url ?? '/');
  if (!file) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));

let browser;
try {
  await mkdir(new URL('../packet', import.meta.url), { recursive: true });
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.emulateMedia({ media: 'print' });
  await page.goto(packetUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await Promise.race([
    page.evaluate(() => document.fonts.ready),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  await page.pdf({
    path: outFile.pathname,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await copyFile(outFile, publicFile);
  await rm(join(distDir, 'packet'), { recursive: true, force: true });
  console.log(`Wrote ${outFile.pathname}`);
  console.log(`Synced ${publicFile.pathname}`);
} finally {
  await browser?.close();
  server.close();
}
