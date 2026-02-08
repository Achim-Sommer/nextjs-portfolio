'use client';

interface BlogFilterProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function BlogFilter({ 
  sortBy,
  onSortChange 
}: BlogFilterProps) {
  return (
    <div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Artikel sortieren"
        className="bg-gray-800 border border-gray-700 text-gray-100 w-[200px] text-sm font-mono px-3 py-1.5 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="date-desc">Neueste zuerst</option>
        <option value="date-asc">Älteste zuerst</option>
        <option value="title">Alphabetisch</option>
        <option value="reading-time">Lesezeit</option>
      </select>
    </div>
  );
}
