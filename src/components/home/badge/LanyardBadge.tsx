'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { prefersLightweight, supportsWebGL2 } from '../webgl';
import { BADGE_PHOTO } from './textures';

// Nutzt dieselben three.js-Chunks wie das Netzwerk im Hero (dort nur ab 1024 px)
const BadgeScene = dynamic(() => import('./BadgeScene'), { ssr: false });

/**
 * Statische Karte: im ersten HTML, ohne WebGL, im Datensparmodus und falls die
 * 3D-Szene scheitert. Maße in cqh (Höhe des Containers), deckungsgleich mit
 * der ruhenden 3D-Karte, damit der Wechsel nicht springt.
 */
function StaticBadge() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute left-1/2 top-0 h-[45%] w-[5.9cqh] -translate-x-1/2 bg-accent" />
      <div className="absolute left-1/2 top-[44%] h-[4cqh] w-[4cqh] -translate-x-1/2 rounded-full border-[0.7cqh] border-[#c9c8c4]" />
      <div className="absolute left-1/2 top-[49%] flex h-[45.5%] w-[31.7cqh] -translate-x-1/2 flex-col rounded-[1.8cqh] border border-[#3a3a38] bg-[#2a2a29] p-[2.6cqh]">
        <div className="mx-auto h-[1.3cqh] w-[6.3cqh] rounded-full bg-canvas" />
        {/* eslint-disable-next-line @next/next/no-img-element -- kleines statisches Bild im Container-Maßstab */}
        <img src={BADGE_PHOTO} alt="" className="mt-[2.6cqh] h-[9.4cqh] w-[9.4cqh] border-b-[0.4cqh] border-accent object-cover" />
        <p className="mt-auto text-[4.6cqh] font-medium leading-[0.95] tracking-[-0.04em] text-fg">
          Achim
          <br />
          Sommer
        </p>
        <p className="mt-[0.8cqh] text-[1.8cqh] text-accent">Head of IT</p>
      </div>
    </div>
  );
}

const MASK =
  'linear-gradient(to bottom, transparent 0, #000 16%), linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%)';

/**
 * Ausweis am Umhängeband. Die 3D-Szene lädt, kurz bevor der Bereich ins Bild
 * scrollt, und löst die statische Karte erst ab, wenn ihr erstes Bild steht.
 */
export default function LanyardBadge({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [flipSignal, setFlipSignal] = useState(0);
  /** Zähler für die Meldung "Zugang gewährt"; jeder Tipp startet sie neu */
  const [granted, setGranted] = useState(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = ref.current;
    if (!el || prefersLightweight()) return;

    let idle: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        // WebGL erst jetzt prüfen und dann in einer ruhigen Phase laden
        if (!supportsWebGL2()) return;
        const start = () => setLoad(true);
        idle =
          typeof window.requestIdleCallback === 'function'
            ? window.requestIdleCallback(start, { timeout: 3000 })
            : window.setTimeout(start, 200);
      },
      { rootMargin: '150px 0px' },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (idle === undefined) return;
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
    };
  }, []);

  const showScene = load && !failed;
  const interactive = showScene && ready;

  return (
    <div
      ref={ref}
      data-badge-anchor
      className={`relative ${className}`}
      style={{ containerType: 'size', maskImage: MASK, WebkitMaskImage: MASK, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
    >
      <div
        className="absolute inset-0"
        role="img"
        aria-label="Ausweis von Achim Sommer, Head of IT, Aachen, seit 2018, an einem orangefarbenen Umhängeband. Auf der Rückseite steht: Gefunden? Bitte zurück an dev@achimsommer.com."
      >
        {!interactive && <StaticBadge />}
        {showScene && (
          <ErrorBoundary fallback={null} onError={() => setFailed(true)}>
            {/* Kein Überblenden: das erste 3D-Bild zeigt exakt die ruhende statische Karte */}
            <div className={`absolute inset-0 ${ready ? 'opacity-100' : 'opacity-0'}`}>
              <BadgeScene
                reducedMotion={reducedMotion}
                flipSignal={flipSignal}
                onReady={() => setReady(true)}
                onTap={() => setGranted((n) => n + 1)}
              />
            </div>
          </ErrorBoundary>
        )}
      </div>

      {granted > 0 && (
        <div
          key={granted}
          className="pointer-events-none absolute left-1/2 top-[30%] z-10 -translate-x-1/2 animate-toast whitespace-nowrap border border-accent/60 bg-canvas/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg backdrop-blur-sm"
          role="status"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 bg-accent align-middle" aria-hidden="true" />
          Zugang gewährt
        </div>
      )}

      {interactive && (
        <button
          type="button"
          onClick={() => setFlipSignal((n) => n + 1)}
          className="sr-only left-1/2 top-[calc(100%-2.5rem)] -translate-x-1/2 border border-[#2e2e2c] bg-canvas font-mono text-[11px] uppercase tracking-[0.14em] text-fg focus:not-sr-only focus:absolute focus:whitespace-nowrap focus:px-3 focus:py-1.5"
        >
          Ausweis umdrehen
        </button>
      )}
    </div>
  );
}
