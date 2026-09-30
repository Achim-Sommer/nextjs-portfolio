'use client';

import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import type { BlogListItem } from '../../lib/blog';
import { Reveal, Section, SectionHeading } from './home/primitives';

interface LatestPostsProps {
  posts: BlogListItem[];
}

/** "2026-07-10" zu "10.07.2026", ohne Zeitzonen-Abhängigkeit zwischen Server und Browser */
function formatDate(date: string) {
  const [y, m, d] = date.slice(0, 10).split('-');
  return d && m && y ? `${d}.${m}.${y}` : date;
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  if (!posts?.length) return null;

  return (
    <Section id="blog">
      <SectionHeading index="05" label="Blog" title="Notizen aus dem Serverraum.">
        <p>Tutorials und Erfahrungsberichte zu Servern, Hosting und Webentwicklung.</p>
      </SectionHeading>

      <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-10">
        <ul className="lg:col-span-8 lg:col-start-5">
          {posts.map((post, i) => (
            <li key={post.slug} className="border-t border-line last:border-b">
              <Reveal delay={i * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-3 py-8 sm:grid-cols-[7rem_1fr_auto] sm:gap-8"
                >
                  <span className="font-mono text-xs text-faint sm:pt-1.5">
                    {formatDate(post.frontmatter.date)}
                  </span>
                  <span>
                    <span className="block text-xl font-medium leading-snug tracking-[-0.015em] text-fg transition-colors duration-200 group-hover:text-accent">
                      {post.frontmatter.title}
                    </span>
                    <span className="mt-2 text-[15px] leading-relaxed text-muted line-clamp-2">
                      {post.frontmatter.description}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 font-mono text-xs text-faint sm:items-start sm:pt-1.5">
                    {post.frontmatter.readingTime} min
                    <FiArrowUpRight
                      className="h-4 w-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8 lg:col-start-5">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 border border-[#2e2e2c] px-5 py-3 text-sm text-fg transition-colors duration-200 hover:border-fg"
          >
            Alle Artikel
            <FiArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}
