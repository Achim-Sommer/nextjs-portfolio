'use client';

interface BlogFilterProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function BlogFilter({ sortBy, onSortChange }: BlogFilterProps) {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      aria-label="Artikel sortieren"
      className="border border-line bg-surface px-3 py-2.5 font-mono text-xs text-fg transition-colors focus:border-accent focus:outline-none sm:w-[200px]"
    >
      <option value="date-desc">Neueste zuerst</option>
      <option value="date-asc">Älteste zuerst</option>
      <option value="title">Alphabetisch</option>
      <option value="reading-time">Längste zuerst</option>
    </select>
  );
}
