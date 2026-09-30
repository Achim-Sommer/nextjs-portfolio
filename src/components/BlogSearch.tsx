'use client';

import { FiSearch } from 'react-icons/fi';

interface BlogSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogSearch({ searchQuery, onSearchChange }: BlogSearchProps) {
  return (
    <label className="relative flex-1">
      <span className="sr-only">Artikel durchsuchen</span>
      <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden="true" />
      <input
        type="search"
        placeholder="Artikel durchsuchen"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
      />
    </label>
  );
}
