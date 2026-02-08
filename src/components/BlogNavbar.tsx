'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineArrowLeft, AiOutlineHome } from 'react-icons/ai';

export default function BlogNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-[1000] bg-gray-900 border-b border-gray-800 backdrop-blur-lg flex items-center">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-400 hover:bg-white/10 rounded-md transition-colors"
            >
              <AiOutlineHome />
              Home
            </Link>
            {pathname !== '/blog' && (
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 text-blue-400 hover:bg-white/10 rounded-md transition-colors"
              >
                <AiOutlineArrowLeft />
                Back to Blog
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
