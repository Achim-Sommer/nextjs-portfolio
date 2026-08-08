import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

// Die TTF wird vom Bundler in die Edge-Function inlined – kein Netzwerk-Call zur Laufzeit.
// Bewusst nur ein Schnitt: jede weitere Inter-Datei kostet ~165 KB gzip im Edge-Bundle
// und das Limit liegt bei 1 MB. SemiBold trägt Headline und Kleintext gleichermaßen.
const interSemiBold = fetch(new URL('../../public/fonts/Inter-SemiBold.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer()
);

const BG = '#070B16';
const ACCENT = '#3B82F6';
const ACCENT_LIGHT = '#60A5FA';
const CYAN = '#22D3EE';

const STACK = ['TypeScript', 'React', 'Next.js', 'Node.js', 'FiveM'];

/** Lange Blog-Titel dürfen das Layout nicht sprengen – Größe skaliert mit der Länge. */
function titleFontSize(length: number) {
  if (length <= 20) return 88;
  if (length <= 32) return 74;
  if (length <= 46) return 62;
  if (length <= 64) return 52;
  return 44;
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
      rawSubtitle || (rawTitle ? 'Achim Sommer · Head of IT & Full Stack Developer' : 'Head of IT & Full Stack Developer'),
      74
    );

    const fontData = await interSemiBold;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '68px 72px 76px 72px',
            background: BG,
            position: 'relative',
            fontFamily: 'Inter',
          }}
        >
          {/* Glow oben links */}
          <div
            style={{
              position: 'absolute',
              top: -280,
              left: -180,
              width: 900,
              height: 900,
              display: 'flex',
              background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.42), rgba(7, 11, 22, 0) 62%)',
            }}
          />

          {/* Glow unten rechts */}
          <div
            style={{
              position: 'absolute',
              bottom: -340,
              right: -220,
              width: 820,
              height: 820,
              display: 'flex',
              background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.24), rgba(7, 11, 22, 0) 62%)',
            }}
          />

          {/* Feines Raster */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex' }}>
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={`v${i}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: (i + 1) * 100,
                  width: 1,
                  display: 'flex',
                  background: 'rgba(148, 163, 184, 0.06)',
                }}
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`h${i}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: (i + 1) * 90,
                  height: 1,
                  display: 'flex',
                  background: 'rgba(148, 163, 184, 0.06)',
                }}
              />
            ))}
          </div>

          {/* Akzentkante links */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 10,
              display: 'flex',
              background: `linear-gradient(to bottom, ${ACCENT}, ${CYAN})`,
            }}
          />

          {/* Kopfzeile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 92,
                  height: 92,
                  borderRadius: 24,
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #1D4ED8 100%)`,
                  border: '1px solid rgba(191, 219, 254, 0.35)',
                  boxShadow: '0 18px 45px rgba(37, 99, 235, 0.45)',
                  color: '#FFFFFF',
                  fontSize: 38,
                  letterSpacing: '-0.02em',
                }}
              >
                <span style={{ display: 'flex', opacity: 0.65 }}>{'{'}</span>
                <span style={{ display: 'flex', padding: '0 6px' }}>AS</span>
                <span style={{ display: 'flex', opacity: 0.65 }}>{'}'}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', fontSize: 30, color: '#F1F5F9' }}>achimsommer.com</div>
                <div style={{ display: 'flex', fontSize: 19, color: ACCENT_LIGHT, letterSpacing: '0.22em' }}>
                  PORTFOLIO
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 24px',
                borderRadius: 999,
                border: '1px solid rgba(96, 165, 250, 0.32)',
                background: 'rgba(37, 99, 235, 0.14)',
                color: '#DBEAFE',
                fontSize: 22,
              }}
            >
              <div style={{ display: 'flex', width: 10, height: 10, borderRadius: 999, background: CYAN }} />
              Aachen · Deutschland
            </div>
          </div>

          {/* Titelblock */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
              position: 'relative',
              maxWidth: 1000,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 104,
                height: 7,
                borderRadius: 999,
                background: `linear-gradient(to right, ${ACCENT}, ${CYAN})`,
              }}
            />
            <div
              style={{
                display: 'flex',
                fontSize: titleFontSize(title.length),
                color: '#F8FAFC',
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 30,
                color: '#94A3B8',
                lineHeight: 1.35,
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Fußzeile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            {STACK.map((tech) => (
              <div
                key={tech}
                style={{
                  display: 'flex',
                  padding: '11px 22px',
                  borderRadius: 999,
                  border: '1px solid rgba(148, 163, 184, 0.22)',
                  background: 'rgba(148, 163, 184, 0.08)',
                  color: '#CBD5E1',
                  fontSize: 22,
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Abschlusskante unten */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              display: 'flex',
              background: `linear-gradient(to right, ${ACCENT}, ${CYAN} 55%, #8B5CF6)`,
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
