import Link from 'next/link';
import { BlogListItem } from '../../lib/blog';

interface LatestPostsProps {
  posts: BlogListItem[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  if (!posts?.length) {
    return null;
  }

  return (
    <section className="w-full px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gray-800/60 bg-gradient-to-br from-gray-900 via-gray-900/70 to-black p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300/80">Neu im Blog</p>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Frische Artikel für dich</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Aktuelle Tutorials und Guides aus dem Blog. Mehr Tiefe findest du im vollständigen Archiv.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-blue-500/60 px-4 py-2 text-sm font-medium text-blue-100 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-500/10"
          >
            Alle Artikel ansehen
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800/80 bg-gray-900/60 p-5 shadow-lg transition hover:-translate-y-1 hover:border-blue-500/60 hover:bg-gray-900"
            >
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-blue-300/80">
                {post.frontmatter.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-900/30 px-2 py-1 text-[11px] font-semibold text-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white transition group-hover:text-blue-300">
                {post.frontmatter.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                {post.frontmatter.description}
              </p>
              <div className="mt-auto pt-4 text-xs text-gray-500">
                <span>
                  {new Date(post.frontmatter.date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="mx-2 text-gray-700">•</span>
                <span>{post.frontmatter.readingTime} min</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
