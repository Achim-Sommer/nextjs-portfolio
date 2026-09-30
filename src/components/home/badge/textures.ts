/**
 * Zeichnet Vorder- und Rückseite des Ausweises sowie das Umhängeband in
 * Canvas-Elemente. Die Canvas werden in BadgeScene.tsx zu Texturen.
 *
 * Maße der Karte in Welteinheiten, das Seitenverhältnis der Texturen folgt daraus.
 */

export const CARD = { width: 1.6, height: 2.3, depth: 0.025, radius: 0.09 };
export const CARD_TEXTURE = { width: 1024, height: Math.round((1024 * CARD.height) / CARD.width) };

/** Schlitz für den Clip, in Anteilen der Kartenbreite bzw. -höhe */
export const SLOT = { width: 0.2, height: 0.028, top: 0.045 };

const COLORS = {
  card: '#121212',
  fg: '#ecebe8',
  muted: '#8e8d89',
  faint: '#4a4946',
  line: '#262624',
  accent: '#ff6a2b',
};

export interface BadgeFonts {
  sans: string;
  mono: string;
}

/** Schriftfamilien von next/font auslesen und laden, bevor gezeichnet wird */
export async function loadBadgeFonts(): Promise<BadgeFonts> {
  const style = getComputedStyle(document.body);
  const sans = style.getPropertyValue('--font-plex-sans').trim() || 'system-ui, sans-serif';
  const mono = style.getPropertyValue('--font-plex-mono').trim() || 'ui-monospace, monospace';
  try {
    await Promise.all([
      document.fonts.load(`500 100px ${sans}`),
      document.fonts.load(`400 100px ${sans}`),
      document.fonts.load(`400 40px ${mono}`),
    ]);
  } catch {
    // Dann eben mit Ersatzschrift
  }
  return { sans, mono };
}

type Ctx = CanvasRenderingContext2D & { letterSpacing?: string };

function roundedRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function spacing(ctx: Ctx, px: number) {
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${px}px`;
}

/** Kartengrund mit abgerundeten Ecken und ausgestanztem Schlitz */
function cardBase(ctx: Ctx, w: number, h: number) {
  const r = (CARD.radius / CARD.width) * w;
  ctx.clearRect(0, 0, w, h);
  roundedRect(ctx, 0, 0, w, h, r);
  ctx.fillStyle = COLORS.card;
  ctx.fill();

  const sw = SLOT.width * w;
  const sh = SLOT.height * h;
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  roundedRect(ctx, (w - sw) / 2, SLOT.top * h, sw, sh, sh / 2);
  ctx.fill();
  ctx.restore();
}

/** Balken für den Strichcode, deterministisch aus einem Text abgeleitet */
function barcode(ctx: Ctx, text: string, x: number, y: number, w: number, h: number) {
  let seed = 0;
  for (const ch of text) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  ctx.fillStyle = COLORS.fg;
  let cx = x;
  while (cx < x + w) {
    const bar = 3 + Math.floor(rand() * 4) * 3;
    const gap = 4 + Math.floor(rand() * 3) * 3;
    if (cx + bar > x + w) break;
    ctx.fillRect(cx, y, bar, h);
    cx += bar + gap;
  }
}

export function drawFront(canvas: HTMLCanvasElement, fonts: BadgeFonts) {
  const { width: w, height: h } = CARD_TEXTURE;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d') as Ctx;
  cardBase(ctx, w, h);

  const pad = 84;
  ctx.textBaseline = 'alphabetic';

  // Kopfzeile
  ctx.font = `400 30px ${fonts.mono}`;
  spacing(ctx, 5);
  ctx.fillStyle = COLORS.muted;
  ctx.textAlign = 'left';
  ctx.fillText('ZUGANGSAUSWEIS', pad, 214);
  ctx.textAlign = 'right';
  ctx.fillText('ID AS-2018', w - pad, 214);
  ctx.fillStyle = COLORS.line;
  ctx.fillRect(pad, 246, w - pad * 2, 2);

  // Monogramm statt Foto
  const box = 300;
  const by = 300;
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(pad, by, box, box);
  ctx.fillStyle = COLORS.card;
  ctx.font = `500 150px ${fonts.sans}`;
  spacing(ctx, -6);
  ctx.textAlign = 'center';
  ctx.fillText('AS', pad + box / 2, by + box / 2 + 54);

  // Zugangsebenen, dieselben wie im Netzwerk oben auf der Seite
  const lx = pad + box + 56;
  ctx.textAlign = 'left';
  ctx.font = `400 26px ${fonts.mono}`;
  spacing(ctx, 5);
  ctx.fillStyle = COLORS.faint;
  ctx.fillText('ZUGANG', lx, by + 34);
  const levels = ['01 CLOUD', '02 SERVERRAUM', '03 ARBEITSPLÄTZE'];
  ctx.font = `400 30px ${fonts.mono}`;
  spacing(ctx, 2);
  levels.forEach((level, i) => {
    const y = by + 112 + i * 70;
    ctx.fillStyle = COLORS.accent;
    ctx.fillRect(lx, y - 20, 16, 16);
    ctx.fillStyle = COLORS.fg;
    ctx.fillText(level, lx + 34, y - 2);
  });

  // Name und Rolle
  ctx.fillStyle = COLORS.fg;
  ctx.font = `500 150px ${fonts.sans}`;
  spacing(ctx, -7);
  ctx.fillText('Achim', pad - 6, 790);
  ctx.fillText('Sommer', pad - 6, 930);
  ctx.fillStyle = COLORS.accent;
  ctx.font = `400 58px ${fonts.sans}`;
  spacing(ctx, -1);
  ctx.fillText('Head of IT', pad, 1024);

  // Angaben
  ctx.fillStyle = COLORS.line;
  ctx.fillRect(pad, 1090, w - pad * 2, 2);
  const cols = [
    { label: 'STANDORT', value: 'Aachen, DE' },
    { label: 'SEIT', value: '2018' },
  ];
  cols.forEach((c, i) => {
    const x = pad + i * 460;
    ctx.font = `400 24px ${fonts.mono}`;
    spacing(ctx, 5);
    ctx.fillStyle = COLORS.faint;
    ctx.fillText(c.label, x, 1150);
    ctx.font = `400 44px ${fonts.sans}`;
    spacing(ctx, 0);
    ctx.fillStyle = COLORS.fg;
    ctx.fillText(c.value, x, 1210);
  });

  barcode(ctx, 'achimsommer.com', pad, 1286, w - pad * 2, 64);
  ctx.font = `400 22px ${fonts.mono}`;
  spacing(ctx, 6);
  ctx.fillStyle = COLORS.faint;
  ctx.fillText('ACHIMSOMMER.COM', pad, 1398);
}

export function drawBack(canvas: HTMLCanvasElement, fonts: BadgeFonts) {
  const { width: w, height: h } = CARD_TEXTURE;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d') as Ctx;
  cardBase(ctx, w, h);

  const pad = 84;
  ctx.textAlign = 'left';

  ctx.font = `400 30px ${fonts.mono}`;
  spacing(ctx, 5);
  ctx.fillStyle = COLORS.muted;
  ctx.fillText('RÜCKSEITE', pad, 214);
  ctx.fillStyle = COLORS.line;
  ctx.fillRect(pad, 246, w - pad * 2, 2);

  ctx.fillStyle = COLORS.fg;
  ctx.font = `500 120px ${fonts.sans}`;
  spacing(ctx, -5);
  ctx.fillText('Gefunden?', pad - 4, 440);

  ctx.font = `400 50px ${fonts.sans}`;
  spacing(ctx, -1);
  ctx.fillStyle = COLORS.muted;
  ctx.fillText('Bitte zurück an', pad, 540);
  ctx.fillStyle = COLORS.fg;
  ctx.fillText('dev@achimsommer.com', pad, 610);

  // Chip
  const cx = pad;
  const cy = 760;
  ctx.strokeStyle = COLORS.muted;
  ctx.lineWidth = 3;
  roundedRect(ctx, cx, cy, 190, 150, 22);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + 63, cy);
  ctx.lineTo(cx + 63, cy + 150);
  ctx.moveTo(cx + 127, cy);
  ctx.lineTo(cx + 127, cy + 150);
  ctx.moveTo(cx, cy + 75);
  ctx.lineTo(cx + 190, cy + 75);
  ctx.stroke();

  ctx.font = `400 26px ${fonts.mono}`;
  spacing(ctx, 5);
  ctx.fillStyle = COLORS.faint;
  ctx.fillText('NFC', cx + 230, cy + 60);
  ctx.fillText('NUR FÜR BEFUGTE', cx + 230, cy + 110);

  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(pad, h - 200, 22, 22);
  ctx.font = `400 34px ${fonts.mono}`;
  spacing(ctx, 4);
  ctx.fillStyle = COLORS.fg;
  ctx.fillText('ACHIMSOMMER.COM', pad + 44, h - 179);
}

/** Band: Akzentfarbe mit wiederholtem Schriftzug, kachelbar in Längsrichtung */
export const STRAP_TEXTURE = { width: 1024, height: 128 };

export function drawStrap(canvas: HTMLCanvasElement, fonts: BadgeFonts) {
  const { width: w, height: h } = STRAP_TEXTURE;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d') as Ctx;
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(0, 0, w, h);

  // feine Webstruktur
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  for (let y = 0; y < h; y += 6) ctx.fillRect(0, y, w, 2);

  ctx.fillStyle = '#1a0d06';
  ctx.font = `500 50px ${fonts.mono}`;
  spacing(ctx, 8);
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText('ACHIM SOMMER', w * 0.25, h / 2 + 2);
  ctx.fillText('HEAD OF IT', w * 0.75, h / 2 + 2);
  ctx.fillRect(w * 0.5 - 6, h / 2 - 6, 12, 12);
  ctx.fillRect(w - 6, h / 2 - 6, 12, 12);
  ctx.fillRect(-6, h / 2 - 6, 12, 12);
}
