import { GetStaticProps } from 'next';
import { getAllPosts, getTagPages } from '../../lib/blog';
import { SITE_URL } from '@/lib/schema';
import { FiArrowUpRight } from 'react-icons/fi';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ogImageUrl } from '@/lib/og-image';
import BlogSearch from '@/components/BlogSearch';
import BlogFilter from '@/components/BlogFilter';
import PostList from '@/components/blog/PostList';
import { Container, Eyebrow } from '@/components/home/primitives';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { BlogPost } from '@/types/blog';

interface Props {
  posts: BlogPost[];
  topics: { name: string; slug: string; count: number }[];
}

const BLOG_TITLE = 'Blog: Anleitungen zu IT, Linux und Webentwicklung';
const BLOG_DESCRIPTION =
  'Anleitungen und Praxiswissen von Achim Sommer: IT-Sicherheit, Microsoft 365, Linux-Server, Docker, Self-Hosting und Webentwicklung mit Next.js.';

export default function Blog({ posts, topics }: Props) {
  const siteUrl = SITE_URL;
  const currentUrl = `${siteUrl}/blog`;

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  const filteredAndSortedPosts = useMemo(() => {
    return posts
      .filter(post => {
        const matchesSearch =
          post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'date-desc':
            return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
          case 'date-asc':
            return new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime();
          case 'title':
            return a.frontmatter.title.localeCompare(b.frontmatter.title);
          case 'reading-time':
            return b.frontmatter.readingTime - a.frontmatter.readingTime;
          default:
            return 0;
        }
      });
  }, [posts, searchQuery, sortBy]);

  const featuredPost = useMemo(() => {
    return posts.find(post => post.frontmatter.featured);
  }, [posts]);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: BLOG_TITLE,
          description: BLOG_DESCRIPTION,
          canonical: currentUrl,
          robotsProps: {
            maxImagePreview: 'large',
            maxSnippet: -1,
            maxVideoPreview: -1,
          },
          openGraph: {
            type: 'website',
            url: currentUrl,
            title: BLOG_TITLE,
            description: BLOG_DESCRIPTION,
            images: [
              {
                url: ogImageUrl({
                  title: 'Blog',
                  subtitle: 'Anleitungen zu IT, Linux und Webentwicklung',
                  baseUrl: siteUrl,
                }),
                width: 1200,
                height: 630,
                alt: 'Achim Sommer Blog',
                type: 'image/png',
              },
            ],
            siteName: 'Achim Sommer Blog',
          },
          twitter: {
            handle: '@achimsommer',
            site: '@achimsommer',
            cardType: 'summary_large_image',
          },
          additionalMetaTags: [
            {
              name: 'author',
              content: 'Achim Sommer',
            },
            {
              name: 'keywords',
              content: topics.map((topic) => topic.name).join(', '),
            },
          ],
        })}
      </Head>
      <header className="border-b border-line">
        <Container className="pb-14 pt-28 sm:pb-20 sm:pt-36">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-fg">
            Anleitungen aus dem IT&#8209;Alltag.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Praxiswissen zu IT-Sicherheit, Microsoft 365, Linux-Servern, Docker und Webentwicklung mit Next.js.
            Geschrieben so, dass du es direkt nachbauen kannst.
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
            {[
              { label: 'Artikel', value: posts.length },
              { label: 'Themen', value: topics.length },
              { label: 'Minuten Lesestoff', value: posts.reduce((acc, post) => acc + (post.frontmatter.readingTime || 0), 0) },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-medium tracking-[-0.03em] text-fg">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="Themen" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/blog/tag/${topic.slug}`}
                    className="inline-flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors duration-200 hover:border-accent hover:text-fg"
                  >
                    {topic.name}
                    <span className="text-faint">{topic.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </header>

      {featuredPost && (
        <section className="border-b border-line" aria-label="Empfohlener Artikel">
          <Container className="py-12 sm:py-16">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block overflow-hidden border border-line bg-surface p-6 transition-colors duration-200 hover:border-[#3a3a37] sm:p-10"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-accent/70" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Empfohlen</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] text-fg transition-colors duration-200 group-hover:text-accent sm:text-4xl">
                {featuredPost.frontmatter.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{featuredPost.frontmatter.description}</p>
              <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg">
                Artikel lesen
                <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </p>
            </Link>
          </Container>
        </section>
      )}

      <section aria-label="Alle Artikel">
        <Container className="py-12 sm:py-16">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BlogSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <BlogFilter sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {filteredAndSortedPosts.length > 0 ? (
            <PostList posts={filteredAndSortedPosts} />
          ) : (
            <div className="border border-dashed border-line px-6 py-16 text-center">
              <p className="text-lg text-fg">Keine Artikel gefunden.</p>
              <p className="mt-2 text-sm text-muted">Versuche es mit einem anderen Suchbegriff.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    posts: getAllPosts() as BlogPost[],
    topics: getTagPages().map(({ name, slug, count }) => ({ name, slug, count })),
  },
});
