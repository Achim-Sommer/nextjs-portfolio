import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('de-DE', { year: 'numeric', month: 'short', day: 'numeric' });

/** Artikelliste als redaktionelle Zeilen: Datum, Titel, Beschreibung, Themen */
export default function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="border-t border-line">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-line">
          <Link
            href={`/blog/${post.slug}`}
            className="group grid gap-3 py-7 transition-colors duration-200 hover:bg-surface sm:px-4 md:grid-cols-[150px_minmax(0,1fr)_110px] md:gap-8"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint md:pt-1.5">
              {formatDate(post.frontmatter.date)}
            </span>
            <span className="min-w-0">
              <h2 className="text-xl font-medium leading-snug tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                {post.frontmatter.title}
              </h2>
              <span className="mt-2 block max-w-2xl text-[15px] leading-relaxed text-muted">{post.frontmatter.description}</span>
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-faint">
                  {post.frontmatter.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint md:pt-1.5 md:text-right">
              {post.frontmatter.readingTime} Min.
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
