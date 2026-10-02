'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  HOSTING_PRODUCTS,
  RENT_DISCOUNT,
  breakEvenMonths,
  eur,
  months1,
  type HostingProduct,
} from '@/data/hosting-prices';

const CUSTOM = 'custom';

// Zeichenfläche: viewBox folgt der echten Breite, damit die Schrift auf dem Handy lesbar bleibt
const PAD = { top: 24, right: 16, bottom: 40, left: 56 };

const eurShort = (v: number) => `${Math.round(v).toLocaleString('de-DE')} €`;

/** Schöne Achsenschritte (1, 2, 5 × 10^n) */
function niceStep(max: number, ticks = 4) {
  const raw = max / ticks;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const n = raw / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
}

/** Eingabefeld für eigene Preise */
function PriceInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      <span className="flex items-center border border-line bg-canvas focus-within:border-accent">
        <input
          type="number"
          inputMode="decimal"
          min={0.5}
          step={0.01}
          value={Number.isFinite(value) ? value : ''}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full bg-transparent px-3 py-2.5 font-mono text-fg outline-none"
        />
        <span className="pr-3 text-faint">€</span>
      </span>
    </label>
  );
}

/**
 * Interaktives Diagramm: kumulierte Miete gegen Lifetime-Einmalpreis, Schnittpunkt = Break-even.
 * Im Markdown: <BreakEvenChart initial="palworld" only="palworld,custom" />
 * `only` begrenzt die Auswahl (Produkt-IDs aus src/data/hosting-prices.ts, „custom“ = eigene Preise).
 */
export default function BreakEvenChart({
  initial = 'vserver',
  only,
  customMonthly = 10,
  customLifetime = 120,
}: {
  initial?: string;
  only?: string;
  customMonthly?: number;
  customLifetime?: number;
}) {
  const ids = only ? only.split(',').map((s) => s.trim()) : [...HOSTING_PRODUCTS.map((p) => p.id), CUSTOM];
  const products = HOSTING_PRODUCTS.filter((p) => ids.includes(p.id));
  const withCustom = ids.includes(CUSTOM);
  const options = [...products.map((p) => ({ id: p.id, label: p.short })), ...(withCustom ? [{ id: CUSTOM, label: 'Eigene Preise' }] : [])];

  const [productId, setProductId] = useState(ids.includes(initial) ? initial : options[0]?.id ?? CUSTOM);
  const [ownMonthly, setOwnMonthly] = useState(customMonthly);
  const [ownLifetime, setOwnLifetime] = useState(customLifetime);
  const [discount, setDiscount] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [W, setW] = useState(640);
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);

  const isCustom = productId === CUSTOM;
  const product: HostingProduct = isCustom
    ? {
        id: CUSTOM,
        name: 'Eigene Preise',
        short: 'Eigene Preise',
        monthly: Math.max(0.5, Number.isFinite(ownMonthly) ? ownMonthly : 0.5),
        lifetime: Math.max(1, Number.isFinite(ownLifetime) ? ownLifetime : 1),
      }
    : products.find((p) => p.id === productId) ?? products[0];
  const monthly = discount ? product.monthly * (1 - RENT_DISCOUNT) : product.monthly;
  const breakEven = breakEvenMonths(product, discount ? RENT_DISCOUNT : 0);
  // Zeitachse: mindestens 2 Jahre, bei spätem Break-even länger (in Halbjahresschritten, maximal 5 Jahre)
  const MONTHS = Math.min(60, Math.max(24, Math.ceil((breakEven * 1.5) / 6) * 6));

  // Animation erst starten, wenn das Diagramm im Bild ist
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    const ro = new ResizeObserver(([entry]) => setW(Math.round(Math.min(720, Math.max(300, entry.contentRect.width)))));
    ro.observe(svgWrapRef.current ?? el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const H = W < 480 ? 280 : 340;
  const PW = W - PAD.left - PAD.right;
  const PH = H - PAD.top - PAD.bottom;
  const compact = W < 480;

  const geo = useMemo(() => {
    const top = Math.max(monthly * MONTHS, product.lifetime) * 1.08;
    const step = niceStep(top);
    const yMax = Math.ceil(top / step) * step;
    const x = (m: number) => PAD.left + (m / MONTHS) * PW;
    const y = (v: number) => PAD.top + PH - (v / yMax) * PH;
    const yTicks = Array.from({ length: Math.round(yMax / step) + 1 }, (_, i) => i * step);

    const be = Math.min(breakEven, MONTHS);
    const ix = x(be);
    const iy = y(product.lifetime);
    const rentEnd = y(monthly * MONTHS);
    const life = y(product.lifetime);
    const base = y(0);

    return {
      x,
      y,
      yTicks,
      ix,
      iy,
      inRange: breakEven <= MONTHS,
      rentPath: `M${x(0)},${base} L${x(MONTHS)},${rentEnd}`,
      lifePath: `M${x(0)},${life} L${x(MONTHS)},${life}`,
      // Mehrkosten vor dem Break-even (Lifetime liegt über der Miete)
      lossArea: `M${x(0)},${life} L${ix},${iy} L${x(0)},${base} Z`,
      // Ersparnis nach dem Break-even (Miete liegt über Lifetime)
      gainArea: breakEven < MONTHS ? `M${ix},${iy} L${x(MONTHS)},${rentEnd} L${x(MONTHS)},${life} Z` : '',
    };
  }, [monthly, product.lifetime, breakEven, PW, PH, MONTHS]);

  const onPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * W;
    const m = Math.round(((vx - PAD.left) / PW) * MONTHS);
    setHover(m < 0 || m > MONTHS ? null : m);
  };

  const hoverRent = hover !== null ? monthly * hover : 0;
  const hoverDiff = hoverRent - product.lifetime;
  // Break-even-Beschriftung links vom Punkt, wenn sie rechts nicht mehr passt (ca. 7,3 px pro Zeichen)
  const labelText = `Break-even: ${months1(breakEven)} ${compact ? 'Mon.' : 'Monate'}`;
  const labelFlip = geo.ix + 12 + labelText.length * 7.3 > W - PAD.right;
  const tooltipLeft = hover !== null && geo.x(hover) > W * 0.62;

  // Neue Animation bei jedem Produkt- oder Rabattwechsel
  const animKey = isCustom ? `${CUSTOM}-${discount}` : `${product.id}-${discount}`;
  const play = visible ? 'animate-draw' : 'opacity-0';

  const gridCols =
    options.length % 3 === 0 ? 'grid-cols-3' : options.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4';

  const tabClass = (active: boolean) =>
    `px-3 py-2 text-left text-sm transition-colors ${
      active ? 'bg-fg text-canvas' : 'border border-line text-muted hover:border-accent hover:text-fg'
    }`;

  return (
    <div ref={rootRef} className="not-article my-10 border border-line bg-surface p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Break-even-Diagramm</div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input type="checkbox" checked={discount} onChange={(e) => setDiscount(e.target.checked)} className="accent-[#ff6a2b]" />
          Miete mit 20 % Rabatt
        </label>
      </div>

      {options.length > 1 && (
      <label className="mb-6 block sm:hidden">
        <span className="mb-2 block text-sm text-muted">Produkt</span>
        <select
          value={product.id}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border border-line bg-canvas px-3 py-2.5 text-fg"
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      )}

      {options.length > 1 && (
      <div className={`mb-6 hidden gap-2 sm:grid ${gridCols}`} role="radiogroup" aria-label="Produkt">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={o.id === productId}
            className={tabClass(o.id === productId)}
            onClick={() => setProductId(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
      )}

      {isCustom && (
        <div className="mb-6 grid grid-cols-2 gap-3">
          <PriceInput label="Miete pro Monat" value={ownMonthly} onChange={setOwnMonthly} />
          <PriceInput label="Lifetime einmalig" value={ownLifetime} onChange={setOwnLifetime} />
        </div>
      )}

      <div ref={svgWrapRef} className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full touch-pan-y select-none"
          role="img"
          aria-label={`${product.name}: Miete ${eur(monthly)} pro Monat gegen ${eur(product.lifetime)} einmalig. Break-even nach ${months1(breakEven)} Monaten.`}
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          onPointerLeave={() => setHover(null)}
        >
          {/* Raster und Achsen */}
          {geo.yTicks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={geo.y(t)} y2={geo.y(t)} stroke="#1f1f1f" />
              <text x={PAD.left - 10} y={geo.y(t) + 4} textAnchor="end" className="fill-faint font-mono text-[11px]">
                {eurShort(t)}
              </text>
            </g>
          ))}
          {(compact ? [0, 0.5, 1] : [0, 0.25, 0.5, 0.75, 1]).map((f) => Math.round(f * MONTHS)).map((m) => (
            <text key={m} x={geo.x(m)} y={H - PAD.bottom + 22} textAnchor={m === 0 ? 'start' : m === MONTHS ? 'end' : 'middle'} className="fill-faint font-mono text-[11px]">
              {m === 0 ? 'Start' : `${m} Mon.`}
            </text>
          ))}

          <g key={animKey}>
            {/* Flächen: Mehrkosten und Ersparnis */}
            <path d={geo.lossArea} fill="#8e8d89" fillOpacity={0.08} className={visible ? 'animate-fade' : 'opacity-0'} style={{ animationDelay: '1.1s' }} />
            {geo.gainArea && (
              <path d={geo.gainArea} fill="#ff6a2b" fillOpacity={0.14} className={visible ? 'animate-fade' : 'opacity-0'} style={{ animationDelay: '1.3s' }} />
            )}

            {/* Linien */}
            <path d={geo.lifePath} pathLength={1} fill="none" stroke="#ecebe8" strokeWidth={2} strokeDasharray="1" className={play} />
            <path
              d={geo.rentPath}
              pathLength={1}
              fill="none"
              stroke="#ff6a2b"
              strokeWidth={2.5}
              strokeDasharray="1"
              className={play}
              style={{ animationDelay: '0.25s' }}
            />

            {/* Schnittpunkt */}
            {geo.inRange && (
              <g className={visible ? 'animate-fade' : 'opacity-0'} style={{ animationDelay: '1s' }}>
                <line x1={geo.ix} x2={geo.ix} y1={geo.iy} y2={PAD.top + PH} stroke="#ff6a2b" strokeDasharray="3 4" strokeOpacity={0.7} />
                <circle cx={geo.ix} cy={geo.iy} r={12} fill="#ff6a2b" className="motion-safe:animate-pulse-ring [transform-box:fill-box] [transform-origin:center]" />
                <circle cx={geo.ix} cy={geo.iy} r={5.5} fill="#ff6a2b" stroke="#0a0a0a" strokeWidth={2} />
                <text
                  x={geo.ix + (labelFlip ? -12 : 12)}
                  y={geo.iy - 14}
                  textAnchor={labelFlip ? 'end' : 'start'}
                  className="fill-fg font-mono text-[12px]"
                >
                  {labelText}
                </text>
              </g>
            )}

            {/* Linienbeschriftung */}
            <text x={W - PAD.right} y={geo.iy + 18} textAnchor="end" className={`fill-muted text-[12px] ${visible ? 'animate-fade' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
              Lifetime einmalig
            </text>
            <text x={W - PAD.right - 4} y={geo.y(monthly * MONTHS) - 10} textAnchor="end" className={`fill-accent text-[12px] ${visible ? 'animate-fade' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
              Miete summiert
            </text>
          </g>

          {/* Hover-Linie */}
          {hover !== null && (
            <g pointerEvents="none">
              <line x1={geo.x(hover)} x2={geo.x(hover)} y1={PAD.top} y2={PAD.top + PH} stroke="#ecebe8" strokeOpacity={0.25} />
              <circle cx={geo.x(hover)} cy={geo.y(hoverRent)} r={4} fill="#ff6a2b" />
              <circle cx={geo.x(hover)} cy={geo.y(product.lifetime)} r={4} fill="#ecebe8" />
            </g>
          )}
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 border border-line bg-canvas/95 px-3 py-2 text-xs shadow-lg"
            style={tooltipLeft ? { right: `${100 - (geo.x(hover) / W) * 100 + 2}%` } : { left: `${(geo.x(hover) / W) * 100 + 2}%` }}
          >
            <div className="mb-1 font-mono text-faint">{hover === 0 ? 'Start' : `Nach ${hover} Monaten`}</div>
            <div className="text-accent">Miete: {eur(hoverRent)}</div>
            <div className="text-fg">Lifetime: {eur(product.lifetime)}</div>
            <div className={hoverDiff >= 0 ? 'mt-1 text-fg' : 'mt-1 text-muted'}>
              {hoverDiff >= 0 ? `Lifetime spart ${eur(hoverDiff)}` : `Miete noch ${eur(-hoverDiff)} günstiger`}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5 text-sm" aria-live="polite">
        <div>
          <div className="text-faint">Miete pro Monat</div>
          <div className="font-mono text-fg">{eur(monthly)}</div>
        </div>
        <div>
          <div className="text-faint">Lifetime einmalig</div>
          <div className="font-mono text-fg">{eur(product.lifetime)}</div>
        </div>
        <div>
          <div className="text-faint">Ersparnis nach 2 Jahren</div>
          <div className={`font-mono ${monthly * 24 - product.lifetime >= 0 ? 'text-accent' : 'text-muted'}`}>
            {eur(monthly * 24 - product.lifetime)}
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-faint">Fahre mit der Maus über das Diagramm oder tippe darauf, um einzelne Monate zu sehen. Preise ohne Gewähr.</div>
    </div>
  );
}
