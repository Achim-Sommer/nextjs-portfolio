import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'imprint@achimsommer.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'Kontaktformular <kontakt@achimsommer.com>';

// Rate-Limit: max. 3 Nachrichten pro IP pro Stunde (In-Memory, pro Server-Instanz)
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const rateLimit = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateLimit.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimit.set(ip, hits);
    return true;
  }

  hits.push(now);
  rateLimit.set(ip, hits);

  // Alte Einträge aufräumen, damit die Map nicht unbegrenzt wächst
  if (rateLimit.size > 5000) {
    for (const [key, timestamps] of rateLimit) {
      if (timestamps.every((t) => now - t >= RATE_LIMIT_WINDOW)) {
        rateLimit.delete(key);
      }
    }
  }

  return false;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

// Verhindert Header-Injection über den Reply-To-Header
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]/g, ' ').trim();
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  privacy?: unknown;
  website?: unknown; // Honeypot — muss leer bleiben
}

function validate(body: ContactPayload) {
  const errors: Record<string, string> = {};

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2 || name.length > 100) {
    errors.name = 'Bitte gib einen Namen mit 2 bis 100 Zeichen an.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    errors.email = 'Bitte gib eine gültige E-Mail-Adresse an.';
  }
  if (subject.length > 150) {
    errors.subject = 'Der Betreff darf höchstens 150 Zeichen lang sein.';
  }
  if (message.length < 10 || message.length > 5000) {
    errors.message = 'Bitte schreibe eine Nachricht mit 10 bis 5000 Zeichen.';
  }
  if (body.privacy !== true) {
    errors.privacy = 'Bitte stimme der Verarbeitung deiner Daten zu.';
  }

  return { errors, data: { name, email, subject, message } };
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  // Honeypot: Bots füllen dieses versteckte Feld aus. Wir tun so, als wäre alles gut.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  const { errors, data } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Bitte prüfe deine Eingaben.', errors }, { status: 400 });
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuche es später erneut oder schreibe direkt an ' + TO_EMAIL + '.' },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY ist nicht gesetzt.');
    return NextResponse.json(
      { error: 'Der Versand ist derzeit nicht verfügbar. Bitte schreibe direkt an ' + TO_EMAIL + '.' },
      { status: 503 }
    );
  }

  const subject = data.subject
    ? `[Kontaktformular] ${sanitizeHeaderValue(data.subject)}`
    : `[Kontaktformular] Neue Nachricht von ${sanitizeHeaderValue(data.name)}`;

  const text = [
    `Name:    ${data.name}`,
    `E-Mail:  ${data.email}`,
    `Betreff: ${data.subject || '—'}`,
    '',
    '---',
    '',
    data.message,
    '',
    '---',
    `Gesendet über das Kontaktformular auf achimsommer.com am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}.`,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: sanitizeHeaderValue(data.email),
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('[contact] Resend-Fehler:', response.status, detail);
      return NextResponse.json(
        { error: 'Die Nachricht konnte nicht versendet werden. Bitte schreibe direkt an ' + TO_EMAIL + '.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[contact] Unerwarteter Fehler:', error);
    return NextResponse.json(
      { error: 'Die Nachricht konnte nicht versendet werden. Bitte schreibe direkt an ' + TO_EMAIL + '.' },
      { status: 500 }
    );
  }
}
