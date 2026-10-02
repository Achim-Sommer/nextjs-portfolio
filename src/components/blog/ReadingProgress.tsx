'use client';

import { useEffect, useRef } from 'react';

/**
 * Dünne Linie am oberen Rand, die beim Lesen des Artikels mitwächst.
 * Gemessen wird nur der Artikeltext (Element mit der übergebenen id), nicht die ganze Seite.
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.getElementById(targetId);
      if (!el || !bar.current) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const progress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 1;
      bar.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]" aria-hidden="true">
      <div ref={bar} className="h-full origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
