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

      const elements = Array.from(articleContent.querySelectorAll('h2, h3'))
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
      const navbarHeight = 96;
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
    <nav aria-label="Inhaltsverzeichnis" className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Inhalt</p>
      <ul className="space-y-2 border-l border-line">
        {headings.map((heading) => (
          <li key={`toc-${heading.id}`}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`-ml-px block border-l py-0.5 text-[13px] leading-snug transition-colors duration-200 ${
                heading.level === 3 ? 'pl-6' : 'pl-4'
              } ${
                activeId === heading.id
                  ? 'border-accent text-fg'
                  : 'border-transparent text-muted hover:text-fg'
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
