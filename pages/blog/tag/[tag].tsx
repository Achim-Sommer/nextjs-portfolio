import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { generateNextSeo } from 'next-seo/pages';
import { getPostsByTag, getTagPages } from '../../../lib/blog';
import { findTagBySlug } from '../../../lib/blog-tags';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { BlogGrid } from '@/components/ui/blog-grid';
import '@/styles/grid-pattern.css';
import { ogImageUrl } from '@/lib/og-image';
import { jsonLd, SITE_URL, WEBSITE_ID } from '@/lib/schema';
import type { BlogPost } from '@/types/blog';

interface Props {
  tag: { name: string; slug: string; intro: string };
  posts: BlogPost[];
  otherTopics: { name: string; slug: string }[];
}

/** Themenseite: alle Artikel zu einem Tag, mit kurzer Einleitung */
export default function BlogTagPage({ tag, posts, otherTopics }: Props) {
  const url = `${SITE_URL}/blog/tag/${tag.slug}`;
  const title = `${tag.name}: Artikel und Anleitungen`;

  return (
    <>
      <Head>
        {generateNextSeo({
          title,
          description: tag.intro,
          canonical: url,
          robotsProps: {
            maxImagePreview: 'large',
            maxSnippet: -1,
            maxVideoPreview: -1,
          },
          openGraph: {
            type: 'website',
            url,
            title,
            description: tag.intro,
            images: [
              {
                url: ogImageUrl({ title: tag.name, subtitle: 'Artikel und Anleitungen', baseUrl: SITE_URL }),
                width: 1200,
                height: 630,
                alt: title,
                type: 'image/png',
              },
            ],
            siteName: 'Achim Sommer Blog',
          },
        })}
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': url,
            url,
            name: title,
            description: tag.intro,
            inLanguage: 'de-DE',
            isPartOf: { '@id': WEBSITE_ID },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: posts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${SITE_URL}/blog/${post.slug}`,
                name: post.frontmatter.title,
              })),
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
              { '@type': 'ListItem', position: 3, name: tag.name, item: url },
            ],
          }),
        }}
      />
      <div className="min-h-screen bg-gray-900 relative overflow-hidden">
        <BackgroundGrid />

        <div className="relative z-[1]">
          <div className="relative mb-16 px-8 pt-20">
            <div className="max-w-7xl mx-auto pb-10 border-b-2 border-white/10">
              <nav aria-label="Brotkrumen" className="mb-6 text-sm font-mono text-gray-400">
                <Link href="/" className="hover:text-blue-300">
                  Startseite
                </Link>
                <span className="mx-2 text-gray-600">/</span>
                <Link href="/blog" className="hover:text-blue-300">
                  Blog
                </Link>
              </nav>
              <div className="flex flex-col gap-6 items-start">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-400 font-mono tracking-tight">{tag.name}</h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">{tag.intro}</p>
                <p className="text-sm font-mono text-gray-500">
                  {posts.length} Artikel
                </p>
              </div>
            </div>
          </div>

          <div className="px-8">
            <div className="max-w-7xl mx-auto">
              <BlogGrid posts={posts} />

              {otherTopics.length > 0 && (
                <nav aria-label="Weitere Themen" className="mb-20">
                  <h2 className="mb-4 text-lg font-bold text-blue-300 font-mono">Weitere Themen</h2>
                  <ul className="flex flex-wrap gap-2">
                    {otherTopics.map((topic) => (
                      <li key={topic.slug}>
                        <Link
                          href={`/blog/tag/${topic.slug}`}
                          className="inline-block rounded-full bg-blue-900/40 px-3 py-1 text-sm font-mono text-blue-200 hover:bg-blue-800"
                        >
                          {topic.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getTagPages().map((tag) => ({ params: { tag: tag.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tag = findTagBySlug(String(params?.tag));
  if (!tag) return { notFound: true };

  return {
    props: {
      tag: { name: tag.name, slug: tag.slug, intro: tag.intro },
      posts: getPostsByTag(tag.name) as BlogPost[],
      otherTopics: getTagPages()
        .filter((other) => other.slug !== tag.slug)
        .map(({ name, slug }) => ({ name, slug })),
    },
  };
};
