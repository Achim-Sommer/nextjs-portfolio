import { useEffect, useState, useCallback, useRef } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingsRef = useRef<TOCItem[]>([]);

  const generateId = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }, []);

  useEffect(() => {
    const setupHeadings = () => {
      // Nur Überschriften innerhalb des Artikel-Inhalts erfassen
      const articleContent = document.getElementById('article-content');
      if (!articleContent) return;

      const elements = Array.from(articleContent.querySelectorAll('h2, h3, h4'))
        .map((element) => {
          if (!element.id) {
            const generatedId = generateId(element.textContent || '');
            element.id = generatedId;
          }
          return {
            id: element.id,
            text: element.textContent || '',
            level: Number(element.tagName.charAt(1)),
          };
        })
        .filter((item) => item.text && item.id);

      headingsRef.current = elements;
      setHeadings(elements);
    };

    const setupObserver = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-80px 0px -40% 0px',
          threshold: [0.5],
        }
      );

      headingsRef.current.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observerRef.current?.observe(element);
        }
      });
    };

    // Warte bis das DOM vollständig geladen ist
    if (document.readyState === 'complete') {
      setupHeadings();
      setupObserver();
    } else {
      window.addEventListener('load', () => {
        setupHeadings();
        setupObserver();
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [generateId]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="toc-container sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto -ml-48 hidden xl:block w-40"
    >
      <h2 className="text-sm font-bold mb-4 text-white">
        Inhaltsverzeichnis
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={`toc-${heading.id}`}
            style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
            className="leading-snug transition-all duration-200"
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`transition-all duration-200 hover:text-blue-400 ${
                activeId === heading.id
                  ? 'text-blue-300 font-medium'
                  : 'text-gray-400 font-normal'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
