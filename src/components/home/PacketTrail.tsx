'use client';

import { useEffect, useRef } from 'react';

const PACKETS = 5;
const SPACING = 0.075;

/** Ereignis, auf das der Ausweis mit einem kleinen Schwung reagiert */
export const PACKET_ARRIVED = 'badge:packet';

/**
 * Verbindet Netzwerk und Ausweis: Beim Scrollen fliegen einzelne Datenpakete
 * aus dem Serverraum im Hero nach unten und landen im Umhängeband.
 *
 * Eine feste SVG-Ebene über der Seite; Start und Ziel werden bei jedem
 * Scroll-Frame aus den Elementen gemessen, ohne React neu zu rendern.
 */
export default function PacketTrail() {
  const svg = useRef<SVGSVGElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const dots = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let arrived = false;

    const render = () => {
      frame = 0;
      const net = document.querySelector('[data-network-diagram]');
      const badge = document.querySelector('[data-badge-anchor]');
      const el = svg.current;
      if (!net || !badge || !el || !trail.current) return;

      const vh = window.innerHeight;
      const n = net.getBoundingClientRect();
      const b = badge.getBoundingClientRect();

      // 0, wenn der Ausweis unten ins Bild kommt; 1, wenn sein Band oben angekommen ist
      const t = (vh - b.top) / (vh * 0.8);
      if (t <= 0 || t >= 1.5) {
        el.style.opacity = '0';
        if (t <= 0.2) arrived = false;
        return;
      }

      const sx = n.left + n.width * 0.55;
      const sy = n.top + n.height * 0.55;
      const ex = b.left + b.width / 2;
      const ey = b.top + b.height * 0.12;
      const dy = ey - sy;
      const c1x = sx;
      const c1y = sy + dy * 0.5;
      const c2x = ex;
      const c2y = ey - dy * 0.5;
      trail.current.setAttribute('d', `M${sx},${sy} C${c1x},${c1y} ${c2x},${c2y} ${ex},${ey}`);

      const point = (u: number) => {
        const v = 1 - u;
        return [
          v * v * v * sx + 3 * v * v * u * c1x + 3 * v * u * u * c2x + u * u * u * ex,
          v * v * v * sy + 3 * v * v * u * c1y + 3 * v * u * u * c2y + u * u * u * ey,
        ];
      };

      const head = Math.min(t * 1.25, 1 + PACKETS * SPACING);
      dots.current.forEach((dot, i) => {
        if (!dot) return;
        const u = head - i * SPACING;
        if (u <= 0 || u >= 1) {
          dot.style.opacity = '0';
          return;
        }
        const [x, y] = point(u);
        dot.setAttribute('x', String(x - 3));
        dot.setAttribute('y', String(y - 3));
        dot.style.opacity = String(1 - i * 0.15);
      });

      // Spur nur im Bereich der Pakete sichtbar, danach ausblenden
      const len = trail.current.getTotalLength();
      const from = Math.max(0, head - PACKETS * SPACING - 0.1);
      const to = Math.min(1, head);
      trail.current.style.strokeDasharray = `0 ${from * len} ${(to - from) * len} ${len}`;
      el.style.opacity = String(Math.min(1, t * 4, (1.5 - t) * 3));

      if (!arrived && head - (PACKETS - 1) * SPACING >= 1) {
        arrived = true;
        window.dispatchEvent(new Event(PACKET_ARRIVED));
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <svg
      ref={svg}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      style={{ opacity: 0, transition: 'opacity 200ms' }}
    >
      <defs>
        <filter id="packet-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path ref={trail} fill="none" stroke="#ff6a2b" strokeOpacity="0.35" strokeWidth="1" />
      {Array.from({ length: PACKETS }, (_, i) => (
        <rect
          key={i}
          ref={(el) => {
            dots.current[i] = el;
          }}
          width="6"
          height="6"
          fill="#ff6a2b"
          filter="url(#packet-glow)"
          style={{ opacity: 0 }}
        />
      ))}
    </svg>
  );
}
