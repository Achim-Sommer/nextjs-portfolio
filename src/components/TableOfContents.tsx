import { useEffect, useState, useCallback, useRef } from 'react';
import {
  Box,
  List,
  ListItem,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

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

  const linkColor = useColorModeValue('gray.600', 'gray.400');
  const activeLinkColor = useColorModeValue('blue.500', 'blue.300');
  const hoverColor = useColorModeValue('blue.600', 'blue.400');

  if (headings.length === 0) return null;

  return (
    <Box
      as="nav"
      aria-label="Table of Contents"
      position="sticky"
      top="2rem"
      maxHeight="calc(100vh - 4rem)"
      overflowY="auto"
      className="toc-container"
      ml="-12rem"
      display={{ base: 'none', xl: 'block' }}
      width="10rem"
    >
      <Text
        as="h2"
        fontSize="sm"
        fontWeight="bold"
        mb={4}
        color="white"
      >
        Inhaltsverzeichnis
      </Text>
      <List spacing={2}>
        {headings.map((heading) => (
          <ListItem
            key={`toc-${heading.id}`}
            pl={(heading.level - 2) * 4}
            lineHeight="1.4"
            transition="all 0.2s"
          >
            <Link
              href={`#${heading.id}`}
              color={activeId === heading.id ? activeLinkColor : linkColor}
              _hover={{ color: hoverColor }}
              fontWeight={activeId === heading.id ? 'medium' : 'normal'}
              onClick={(e) => handleClick(e, heading.id)}
              transition="all 0.2s"
            >
              {heading.text}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
