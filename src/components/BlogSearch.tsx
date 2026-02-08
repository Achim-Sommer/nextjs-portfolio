'use client';

import { FiSearch } from 'react-icons/fi';

interface BlogSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogSearch({ searchQuery, onSearchChange }: BlogSearchProps) {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FiSearch className="text-gray-400" />
      </div>
      <input
        aria-label="Artikel durchsuchen"
        role="searchbox"
        placeholder="Artikel durchsuchen..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-transparent border border-gray-700 text-gray-100 placeholder-gray-500 hover:border-blue-500 focus:border-blue-500 focus:outline-none text-sm font-mono pl-10 pr-4 py-2 rounded-md transition-colors"
      />
    </div>
  );
}
