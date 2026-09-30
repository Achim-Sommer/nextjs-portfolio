import React from 'react';

interface TipProps {
  children: React.ReactNode;
  title?: string;
}

/** Hervorgehobener Hinweis im Artikel */
const Tip: React.FC<TipProps> = ({ children, title = 'Praxis-Tipp' }) => (
  <aside className="my-8 border border-line border-l-2 border-l-accent bg-surface px-5 py-4 sm:px-6">
    <p className="!mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{title}</p>
    <div className="text-[15px] leading-relaxed text-[#cfcdc8] [&>*:last-child]:!mb-0">{children}</div>
  </aside>
);

export default Tip;
