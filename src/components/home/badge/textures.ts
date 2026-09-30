/**
 * Zeichnet Vorder- und Rückseite des Ausweises sowie das Umhängeband in
 * Canvas-Elemente. Die Canvas werden in BadgeScene.tsx zu Texturen.
 *
 * Die Karte ist auf dem Bildschirm höchstens rund 200 CSS-Pixel breit, auf
 * dem Handy etwa 140. 640 Pixel Texturbreite reichen damit auch bei doppelter
 * Pixeldichte. Schrift unter etwa 30 Texturpixeln wäre auf dem Handy nicht
 * mehr lesbar, deshalb gibt es keine kleineren Beschriftungen.
 */

export const CARD = { width: 1.6, height: 2.3, depth: 0.025, radius: 0.09 };
export const CARD_TEXTURE = { width: 640, height: Math.round((640 * CARD.height) / CARD.width) };

/** Schlitz für den Clip, in Anteilen der Kartenbreite bzw. -höhe */
export const SLOT = { width: 0.2, height: 0.028, top: 0.045 };

const COLORS = {
  card: '#121212',
  fg: '#ecebe8',
  muted: '#8e8d89',
  line: '#2a2a28',
  accent: '#ff6a2b',
};

export const BADGE_PHOTO = '/img/badge-photo.jpg';

export interface BadgeFonts {
  sans: string;
  mono: string;
  /** Passfoto für die Vorderseite, null falls es nicht lädt (dann Monogramm) */
  photo: HTMLImageElement | null;
}

function loadPhoto(): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = BADGE_PHOTO;
  });
}

/** Schriftfamilien von next/font auslesen und zusammen mit dem Foto laden, bevor gezeichnet wird */
export async function loadBadgeFonts(): Promise<BadgeFonts> {
  const style = getComputedStyle(document.body);
  const sans = style.getPropertyValue('--font-plex-sans').trim() || 'system-ui, sans-serif';
  const mono = style.getPropertyValue('--font-plex-mono').trim() || 'ui-monospace, monospace';
  const photo = loadPhoto();
  try {
    await Promise.all([
      document.fonts.load(`500 60px ${sans}`),
      document.fonts.load(`400 60px ${sans}`),
      document.fonts.load(`400 30px ${mono}`),
    ]);
  } catch {
    // Dann eben mit Ersatzschrift
  }
  return { sans, mono, photo: await photo };
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

function setup(canvas: HTMLCanvasElement) {
  const { width: w, height: h } = CARD_TEXTURE;
  canvas.width = w;
  canvas.height = h;
  return { ctx: canvas.getContext('2d') as Ctx, w, h };
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
    const bar = 2 + Math.floor(rand() * 4) * 2;
    const gap = 3 + Math.floor(rand() * 3) * 2;
    if (cx + bar > x + w) break;
    ctx.fillRect(cx, y, bar, h);
    cx += bar + gap;
  }
}

const PAD = 52;

export function drawFront(canvas: HTMLCanvasElement, fonts: BadgeFonts) {
  const { ctx, w } = setup(canvas);
  cardBase(ctx, w, CARD_TEXTURE.height);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  // Kopfzeile
  ctx.font = `400 30px ${fonts.mono}`;
  spacing(ctx, 3);
  ctx.fillStyle = COLORS.muted;
  ctx.fillText('AUSWEIS', PAD, 128);
  ctx.textAlign = 'right';
  ctx.fillText('AS-2018', w - PAD, 128);
  ctx.fillStyle = COLORS.line;
  ctx.fillRect(PAD, 150, w - PAD * 2, 2);

  // Passfoto mit Akzentkante, ersatzweise Monogramm
  const box = 196;
  const by = 184;
  if (fonts.photo) {
    ctx.drawImage(fonts.photo, PAD, by, box, box);
    ctx.fillStyle = COLORS.accent;
    ctx.fillRect(PAD, by + box - 8, box, 8);
  } else {
    ctx.fillStyle = COLORS.accent;
    ctx.fillRect(PAD, by, box, box);
    ctx.fillStyle = COLORS.card;
    ctx.font = `500 96px ${fonts.sans}`;
    spacing(ctx, -4);
    ctx.textAlign = 'center';
    ctx.fillText('AS', PAD + box / 2, by + box / 2 + 34);
  }

  // Zugangsebenen, dieselben wie im Netzwerk oben auf der Seite
  const lx = PAD + box + 30;
  ctx.textAlign = 'left';
  ctx.font = `400 30px ${fonts.mono}`;
  spacing(ctx, 1);
  ['CLOUD', 'SERVER', 'OFFICE'].forEach((level, i) => {
    const y = by + 44 + i * 64;
    ctx.fillStyle = COLORS.accent;
    ctx.fillRect(lx, y - 20, 14, 14);
    ctx.fillStyle = COLORS.fg;
    ctx.fillText(level, lx + 28, y);
  });

  // Name und Rolle
  ctx.fillStyle = COLORS.fg;
  ctx.font = `500 100px ${fonts.sans}`;
  spacing(ctx, -4);
  ctx.fillText('Achim', PAD - 4, 510);
  ctx.fillText('Sommer', PAD - 4, 600);
  ctx.fillStyle = COLORS.accent;
  ctx.font = `400 42px ${fonts.sans}`;
  spacing(ctx, 0);
  ctx.fillText('Head of IT', PAD, 668);

  // Ort und Jahr
  ctx.fillStyle = COLORS.line;
  ctx.fillRect(PAD, 712, w - PAD * 2, 2);
  ctx.fillStyle = COLORS.fg;
  ctx.font = `400 34px ${fonts.sans}`;
  ctx.fillText('Aachen, DE', PAD, 770);
  ctx.textAlign = 'right';
  ctx.fillText('seit 2018', w - PAD, 770);

  barcode(ctx, 'achimsommer.com', PAD, 808, w - PAD * 2, 60);
}

export function drawBack(canvas: HTMLCanvasElement, fonts: BadgeFonts) {
  const { ctx, w, h } = setup(canvas);
  cardBase(ctx, w, h);
  ctx.textAlign = 'left';

  ctx.font = `400 30px ${fonts.mono}`;
  spacing(ctx, 3);
  ctx.fillStyle = COLORS.muted;
  ctx.fillText('RÜCKSEITE', PAD, 128);
  ctx.fillStyle = COLORS.line;
  ctx.fillRect(PAD, 150, w - PAD * 2, 2);

  ctx.fillStyle = COLORS.fg;
  ctx.font = `500 84px ${fonts.sans}`;
  spacing(ctx, -3);
  ctx.fillText('Gefunden?', PAD - 3, 300);

  ctx.font = `400 38px ${fonts.sans}`;
  spacing(ctx, 0);
  ctx.fillStyle = COLORS.muted;
  ctx.fillText('Bitte zurück an', PAD, 380);
  ctx.fillStyle = COLORS.fg;
  ctx.fillText('dev@achimsommer.com', PAD, 432);

  // Chip
  const cx = PAD;
  const cy = 520;
  ctx.strokeStyle = COLORS.muted;
  ctx.lineWidth = 3;
  roundedRect(ctx, cx, cy, 128, 100, 16);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + 43, cy);
  ctx.lineTo(cx + 43, cy + 100);
  ctx.moveTo(cx + 85, cy);
  ctx.lineTo(cx + 85, cy + 100);
  ctx.moveTo(cx, cy + 50);
  ctx.lineTo(cx + 128, cy + 50);
  ctx.stroke();

  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(PAD, h - 108, 18, 18);
  ctx.font = `400 30px ${fonts.mono}`;
  spacing(ctx, 2);
  ctx.fillStyle = COLORS.fg;
  ctx.fillText('ACHIMSOMMER.COM', PAD + 34, h - 90);
}

/** Band: Akzentfarbe mit wiederholtem Schriftzug, kachelbar in Längsrichtung */
export const STRAP_TEXTURE = { width: 512, height: 64 };

export function drawStrap(canvas: HTMLCanvasElement, fonts: BadgeFonts) {
  const { width: w, height: h } = STRAP_TEXTURE;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d') as Ctx;
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(0, 0, w, h);

  // feine Webstruktur
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  for (let y = 0; y < h; y += 4) ctx.fillRect(0, y, w, 1);

  ctx.fillStyle = '#1a0d06';
  ctx.font = `400 25px ${fonts.mono}`;
  spacing(ctx, 4);
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText('ACHIM SOMMER', w * 0.25, h / 2 + 1);
  ctx.fillText('HEAD OF IT', w * 0.75, h / 2 + 1);
  ctx.fillRect(w * 0.5 - 3, h / 2 - 3, 6, 6);
  ctx.fillRect(w - 3, h / 2 - 3, 6, 6);
  ctx.fillRect(-3, h / 2 - 3, 6, 6);
}
