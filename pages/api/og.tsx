import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

// Schrift und Foto werden vom Bundler in die Edge-Function inlined, kein Netzwerk-Call zur Laufzeit.
// Bewusst nur ein Schnitt: jede weitere Inter-Datei kostet ~165 KB gzip im Edge-Bundle
// und das Limit liegt bei 1 MB.
const interSemiBold = fetch(new URL('../../public/fonts/Inter-SemiBold.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer()
);
const photo = fetch(new URL('../../public/img/achim-sommer.jpg', import.meta.url)).then((res) => res.arrayBuffer());

// Farben der Seite (tailwind.config.js)
const CANVAS = '#0a0a0a';
const FG = '#ecebe8';
const MUTED = '#8e8d89';
const FAINT = '#83827d';
const LINE = '#1f1f1f';
const ACCENT = '#ff6a2b';

const PHOTO_WIDTH = 440;

/** Lange Blog-Titel dürfen das Layout nicht sprengen: Größe skaliert mit der Länge. */
function titleFontSize(length: number) {
  if (length <= 20) return 84;
  if (length <= 32) return 66;
  if (length <= 46) return 54;
  if (length <= 64) return 46;
  return 40;
}

function truncate(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawTitle = searchParams.get('title')?.trim();
    const rawSubtitle = searchParams.get('subtitle')?.trim();

    const title = truncate(rawTitle || 'Achim Sommer', 96);
    const subtitle = truncate(
      rawSubtitle || (rawTitle ? 'Achim Sommer · Head of IT in Aachen' : 'Head of IT in Aachen'),
      64
    );

    const [fontData, photoData] = await Promise.all([interSemiBold, photo]);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            background: CANVAS,
            position: 'relative',
            fontFamily: 'Inter',
          }}
        >
          {/* Warmes Licht oben links, wie im Hero */}
          <div
            style={{
              position: 'absolute',
              top: -360,
              left: -260,
              width: 980,
              height: 980,
              display: 'flex',
              background: 'radial-gradient(circle at center, rgba(255, 106, 43, 0.16), rgba(10, 10, 10, 0) 60%)',
            }}
          />

          {/* Textspalte */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: 1200 - PHOTO_WIDTH,
              padding: '64px 64px 60px 72px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: FAINT, fontSize: 20, letterSpacing: '0.18em' }}>
              <div style={{ display: 'flex', width: 12, height: 12, background: ACCENT }} />
              ACHIMSOMMER.COM
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: titleFontSize(title.length),
                  color: FG,
                  lineHeight: 1.05,
                  letterSpacing: '-0.035em',
                }}
              >
                {title}
              </div>
              <div style={{ display: 'flex', fontSize: 30, color: ACCENT, lineHeight: 1.3 }}>{subtitle}</div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                paddingTop: 22,
                borderTop: `1px solid ${LINE}`,
                color: MUTED,
                fontSize: 21,
              }}
            >
              <span style={{ display: 'flex' }}>IT-Infrastruktur</span>
              <span style={{ display: 'flex', color: '#3a3a37' }}>/</span>
              <span style={{ display: 'flex' }}>Security</span>
              <span style={{ display: 'flex', color: '#3a3a37' }}>/</span>
              <span style={{ display: 'flex' }}>Microsoft 365</span>
              <span style={{ display: 'flex', color: '#3a3a37' }}>/</span>
              <span style={{ display: 'flex' }}>Next.js</span>
            </div>
          </div>

          {/* Foto rechts, weich in den Hintergrund auslaufend */}
          <div style={{ display: 'flex', position: 'relative', width: PHOTO_WIDTH, height: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- Satori rendert nur <img> */}
            <img
              src={photoData as unknown as string}
              width={PHOTO_WIDTH}
              height={630}
              style={{ width: PHOTO_WIDTH, height: 630, objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: 180,
                display: 'flex',
                background: `linear-gradient(to right, ${CANVAS}, rgba(10, 10, 10, 0))`,
              }}
            />
          </div>

          {/* Akzentkante unten */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 6,
              display: 'flex',
              background: ACCENT,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' }],
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
        },
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
