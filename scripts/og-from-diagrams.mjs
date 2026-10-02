/**
 * Vorschaubilder (Open Graph, 1200 x 630) für Blogartikel mit Diagramm.
 * Nimmt das erste <Figure src="..."> eines Artikels, setzt es auf den dunklen
 * Hintergrund der Seite und speichert es als public/img/og/<slug>.jpg.
 * Läuft vor jedem Build (prebuild) und erzeugt nur fehlende oder veraltete Bilder.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const postsDir = path.join(root, 'content/blog');
const outDir = path.join(root, 'public/img/og');
const W = 1200;
const H = 630;
const BAR = 6;

fs.mkdirSync(outDir, { recursive: true });

let created = 0;
for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  const match = fs.readFileSync(path.join(postsDir, file), 'utf8').match(/<Figure[^>]*\ssrc="([^"]+)"/);
  if (!match) continue;

  const source = path.join(root, 'public', match[1]);
  const target = path.join(outDir, `${slug}.jpg`);
  if (!fs.existsSync(source)) continue;
  if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= fs.statSync(source).mtimeMs) continue;

  const diagram = await sharp(source)
    .resize(W, H - BAR, { fit: 'contain', background: '#0a0a0a' })
    .toBuffer();
  await sharp({ create: { width: W, height: H, channels: 3, background: '#0a0a0a' } })
    .composite([
      { input: diagram, top: 0, left: 0 },
      {
        input: { create: { width: W, height: BAR, channels: 3, background: '#ff6a2b' } },
        top: H - BAR,
        left: 0,
      },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(target);
  created++;
}

console.log(`OG-Bilder aus Diagrammen: ${created} neu erzeugt`);
