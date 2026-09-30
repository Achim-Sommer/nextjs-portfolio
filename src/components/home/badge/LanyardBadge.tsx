'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Teilt sich die three.js-Chunks mit dem Netzwerk im Hero
const BadgeScene = dynamic(() => import('./BadgeScene'), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Statische Variante für Browser ohne WebGL und fürs erste HTML.
 * Maße in cqh (Höhe des Containers), passend zur Kamera der 3D-Szene.
 */
function StaticBadge() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute left-1/2 top-0 h-[45%] w-[5.9cqh] -translate-x-1/2 bg-accent" />
      <div className="absolute left-1/2 top-[44%] h-[4cqh] w-[4cqh] -translate-x-1/2 rounded-full border-[0.7cqh] border-[#c9c8c4]" />
      <div className="absolute left-1/2 top-[49%] flex h-[45.5%] w-[31.7cqh] -translate-x-1/2 flex-col rounded-[1.8cqh] border border-[#262624] bg-[#121212] p-[2.6cqh]">
        <div className="mx-auto h-[1.3cqh] w-[6.3cqh] rounded-full bg-canvas" />
        <div className="mt-[2.6cqh] h-[9.4cqh] w-[9.4cqh] bg-accent" />
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

/**
 * Ausweis am Umhängeband. Lädt die 3D-Szene, kurz bevor der Bereich ins Bild
 * scrollt. Ohne WebGL bleibt die statische Karte stehen.
 */
export default function LanyardBadge({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const supported = supportsWebGL();
    setWebgl(supported);
    const el = ref.current;
    if (!supported || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mit WebGL die statische Karte gar nicht erst zeigen: Die 3D-Karte fällt
  // beim ersten Sichtkontakt ins Bild, ein Überblenden würde springen.
  const showStatic = webgl === false || (webgl === null && !ready);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        containerType: 'size',
        // Band blendet oben weich ein, statt an der Kante abzubrechen
        maskImage: 'linear-gradient(to bottom, transparent 0, #000 16%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 16%)',
      }}
      role="img"
      aria-label="Interaktiver 3D-Ausweis von Achim Sommer, Head of IT, an einem Umhängeband. Mit der Maus ziehen lässt ihn schwingen, antippen dreht ihn um."
    >
      {showStatic && <StaticBadge />}
      {load && (
        <div className={`absolute inset-0 transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <BadgeScene reducedMotion={reducedMotion} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
