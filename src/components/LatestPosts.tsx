'use client';

import Link from 'next/link';
import { BlogListItem } from '../../lib/blog';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar, FiArrowRight, FiBookOpen, FiTrendingUp } from 'react-icons/fi';

interface LatestPostsProps {
  posts: BlogListItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function LatestPosts({ posts }: LatestPostsProps) {
  if (!posts?.length) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Background treatment — full bleed subtle gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-blue-600/[0.03] blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5">
              <FiTrendingUp className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Neu im Blog
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Aktuelle Artikel
            </h2>
            <p className="mt-3 max-w-2xl text-base text-gray-400 md:text-lg">
              Die neuesten Tutorials und Guides — frisch geschrieben und direkt zum Lesen bereit.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-300 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-white hover:shadow-lg hover:shadow-blue-500/10 md:self-auto"
          >
            Alle Artikel ansehen
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Featured Article — full width */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="mb-6"
        >
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-800/60 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-950 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 md:flex-row"
          >
            {/* Left content */}
            <div className="flex flex-1 flex-col justify-between p-8 md:p-10 lg:p-12">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
                    <FiBookOpen className="h-3 w-3" />
                    Featured
                  </span>
                  {featured.frontmatter.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-800/80 px-3 py-1 text-xs font-medium text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold leading-tight text-white transition-colors group-hover:text-blue-200 md:text-3xl lg:text-4xl">
                  {featured.frontmatter.title}
                </h3>
                <p className="mt-4 line-clamp-3 text-base leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300 md:text-lg">
                  {featured.frontmatter.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-5 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar className="h-4 w-4 text-blue-400/50" />
                    {new Date(featured.frontmatter.date).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiClock className="h-4 w-4 text-blue-400/50" />
                    {featured.frontmatter.readingTime} min Lesezeit
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400/0 transition-all group-hover:text-blue-400">
                  Jetzt lesen
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>

            {/* Right decorative panel */}
            <div className="relative hidden w-[340px] shrink-0 overflow-hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.08),transparent_70%)]" />
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8">
                <div className="text-8xl font-black text-blue-500/10">01</div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-blue-400/30">Neuester Artikel</span>
              </div>
            </div>

            {/* Hover accent line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
          </Link>
        </motion.div>

        {/* Remaining articles — two-column grid */}
        {rest.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((post, index) => (
              <motion.div
                key={post.slug}
                custom={index + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800/60 bg-gradient-to-b from-gray-900/80 to-gray-950/90 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 md:flex-row md:items-start md:gap-6"
                >
                  {/* Number accent */}
                  <div className="hidden shrink-0 md:flex">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-800/50 text-lg font-black text-blue-400/40 transition-colors group-hover:bg-blue-500/10 group-hover:text-blue-300/60">
                      {String(index + 2).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.frontmatter.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-300/70 transition-colors group-hover:text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-blue-200">
                      {post.frontmatter.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300">
                      {post.frontmatter.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-800/40 pt-4">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <FiCalendar className="h-3.5 w-3.5 text-blue-400/50" />
                          {new Date(post.frontmatter.date).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiClock className="h-3.5 w-3.5 text-blue-400/50" />
                          {post.frontmatter.readingTime} min
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400/0 transition-all group-hover:text-blue-400">
                        Lesen
                        <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
