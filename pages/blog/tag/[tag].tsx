import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { generateNextSeo } from 'next-seo/pages';
import { getPostsByTag, getTagPages } from '../../../lib/blog';
import { findTagBySlug } from '../../../lib/blog-tags';
import PostList from '@/components/blog/PostList';
import { Container } from '@/components/home/primitives';
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
      <header className="border-b border-line">
        <Container className="pb-14 pt-28 sm:pb-20 sm:pt-36">
          <nav aria-label="Brotkrumen" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            <Link href="/" className="transition-colors hover:text-fg">
              Startseite
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="transition-colors hover:text-fg">
              Blog
            </Link>
          </nav>
          <h1 className="mt-6 text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-fg">{tag.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{tag.intro}</p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{posts.length} Artikel</p>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <PostList posts={posts} />

        {otherTopics.length > 0 && (
          <nav aria-label="Weitere Themen" className="mt-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Weitere Themen</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {otherTopics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/blog/tag/${topic.slug}`}
                    className="inline-block border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors duration-200 hover:border-accent hover:text-fg"
                  >
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
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
