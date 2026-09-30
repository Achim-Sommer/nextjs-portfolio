'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import NetworkFallback from './NetworkFallback';
import { EXTENT } from './data';
import { prefersLightweight, supportsWebGL2 } from '../webgl';

// three.js ist groß, deshalb eigener Chunk, der erst bei Bedarf geladen wird
const NetworkScene = dynamic(() => import('./NetworkScene'), { ssr: false });

type Mode = 'static' | 'animated' | '3d';

const ASPECT = EXTENT.width / EXTENT.height;

/**
 * Netzwerk im Hero.
 *
 * Auf großen Bildschirmen mit WebGL: echte 3D-Szene, geladen sobald der
 * Browser Leerlauf hat. Bis dahin (und auf Handys) liegt dieselbe Ansicht
 * als SVG da, auf Handys mit animierten Datenpaketen.
 */
export default function NetworkDiagram() {
  const [mode, setMode] = useState<Mode>('static');
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const large = window.matchMedia('(min-width: 1024px)').matches;
    setReducedMotion(reduce);

    if (large && !prefersLightweight() && supportsWebGL2()) {
      const start = () => setMode('3d');
      if (typeof window.requestIdleCallback === 'function') {
        const id = window.requestIdleCallback(start, { timeout: 2500 });
        return () => window.cancelIdleCallback(id);
      }
      const id = window.setTimeout(start, 800);
      return () => window.clearTimeout(id);
    }

    if (!reduce) setMode('animated');
  }, []);

  // Scheitert die 3D-Szene (Treiber, Chunk nicht ladbar), bleibt das SVG stehen
  const showScene = mode === '3d' && !failed;

  return (
    // Breite so begrenzen, dass die Szene samt Faktenleiste in den ersten Bildschirm passt
    <div className="ml-auto" style={{ maxWidth: `calc((100svh - 14rem) * ${ASPECT.toFixed(4)})` }}>
      <div
        className="relative w-full"
        style={{ aspectRatio: `${EXTENT.width} / ${EXTENT.height}` }}
        role="img"
        aria-label="Schematische 3D-Darstellung einer IT-Infrastruktur: Cloud-Dienste wie Microsoft 365 und Entra ID, ein Serverraum mit Firewall, Hyper-V, Docker und Backup sowie Arbeitsplätze mit Switches und WLAN."
      >
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            showScene && ready ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <NetworkFallback animated={mode === 'animated'} />
        </div>

        {showScene && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ErrorBoundary fallback={null} onError={() => setFailed(true)}>
              <NetworkScene reducedMotion={reducedMotion} onReady={() => setReady(true)} />
            </ErrorBoundary>
          </div>
        )}
      </div>

      <p
        className={`mt-3 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-faint transition-opacity duration-700 ${
          showScene && ready ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!showScene}
      >
        Ziehen zum Drehen · Geräte anfahren für Details
      </p>
    </div>
  );
}
