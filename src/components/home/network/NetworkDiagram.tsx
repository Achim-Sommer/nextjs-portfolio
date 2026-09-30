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

/**
 * Kleine Statuszeile im Stil einer Monitoring-Konsole. Die Werte schwanken
 * leicht, damit das Netzwerk lebendig wirkt (dekorativ, keine echten Messwerte).
 */
function LiveStatus({ animate }: { animate: boolean }) {
  const [stats, setStats] = useState({ packets: 24, latency: 12 });

  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => {
      setStats((s) => ({
        packets: Math.min(34, Math.max(16, s.packets + Math.round((Math.random() - 0.5) * 6))),
        latency: Math.min(18, Math.max(8, s.latency + Math.round((Math.random() - 0.5) * 3))),
      }));
    }, 1400);
    return () => window.clearInterval(id);
  }, [animate]);

  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 whitespace-nowrap text-muted" aria-hidden="true">
      <span className="relative flex h-1.5 w-1.5">
        {animate && <span className="absolute inset-0 animate-ping bg-accent opacity-60" />}
        <span className="relative h-1.5 w-1.5 bg-accent" />
      </span>
      <span className="text-fg">Live</span>
      <span className="tabular-nums">{stats.packets} Pakete/s</span>
      <span className="text-faint">·</span>
      <span className="tabular-nums">{stats.latency} ms</span>
      <span className="text-faint">·</span>
      <span>Alle Systeme online</span>
    </p>
  );
}

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
    <div data-network-diagram className="ml-auto" style={{ maxWidth: `calc((100svh - 14rem) * ${ASPECT.toFixed(4)})` }}>
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

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]">
        <LiveStatus animate={!reducedMotion} />
        <p
          className={`text-faint transition-opacity duration-700 ${
            showScene && ready ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={!showScene}
        >
          Ziehen zum Drehen · Geräte anfahren für Details
        </p>
      </div>
    </div>
  );
}
