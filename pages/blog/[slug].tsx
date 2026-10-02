import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getCompiledMDX } from '../../lib/mdx-cache';
import dynamic from 'next/dynamic';
import { getRelatedPosts, getTagLinks, toDateString, BlogListItem } from '../../lib/blog';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArticleShare } from '@/components/ui/article-share';
import { ogImageUrl } from '@/lib/og-image';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { jsonLd, personRef, SITE_URL, WEBSITE_ID } from '@/lib/schema';
import Figure from '@/components/mdx/Figure';
import MdxLink from '@/components/mdx/MdxLink';
import ReadingProgress from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/TableOfContents';
import { Container } from '@/components/home/primitives';

// Dynamische Imports für MDX-Komponenten
const CodeBlock = dynamic(() => import('@/components/CodeBlock'), {
  loading: () => <div className="my-7 h-24 border border-line bg-[#0d0d0c]" />
});
const BlogZapHosting = dynamic(() => import('@/components/BlogZapHosting'));
const FloatingZapAd = dynamic(() => import('@/components/FloatingZapAd'));
const Tip = dynamic(() => import('../../src/components/Tip'));
const ZapHostingCta = dynamic(() => import('@/components/ZapHostingCta'));
const RamRechner = dynamic(() => import('@/components/mdx/RamRechner'));
const RamTabelle = dynamic(() => import('@/components/mdx/RamTabelle'));
const BreakEvenChart = dynamic(() => import('@/components/mdx/BreakEvenChart'), {
  loading: () => <div className="my-10 h-[520px] border border-line bg-surface" />
});

interface FrontMatter {
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  tags: string[];
  readingTime?: number;
  featured?: boolean;
}

interface BlogPostProps {
  frontMatter: FrontMatter;
  mdxSource: MDXRemoteSerializeResult;
  slug: string;
  relatedPosts?: BlogListItem[];
  tagLinks: { name: string; href: string | null }[];
  /** Erstes Bild im Artikel (absolute URL) für die strukturierten Daten */
  leadImage: string | null;
  /** Vorschaubild aus dem Diagramm (scripts/og-from-diagrams.mjs), sonst das generierte Titelbild */
  diagramOg: string | null;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const components = {
  pre: (props: any) => {
    const codeString = props.children?.props?.children;
    if (typeof codeString === 'string') {
      const language = /language-(\w+)/.exec(props.children?.props?.className || '')?.[1];
      return <CodeBlock language={language}>{codeString}</CodeBlock>;
    }
    return <pre {...props} />;
  },
  a: MdxLink,
  Figure,
  Tip: Tip,
  ZapHostingCta: ZapHostingCta,
  RamRechner,
  RamTabelle,
  BreakEvenChart,
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

export default function BlogPost({ frontMatter, mdxSource, slug, relatedPosts, tagLinks, leadImage, diagramOg }: BlogPostProps) {
  const router = useRouter();
  const siteUrl = SITE_URL;
  // Kanonische URL ohne Query-Parameter (utm_* usw.)
  const currentUrl = `${siteUrl}/blog/${slug}`;
  const ogImage = diagramOg ?? ogImageUrl({ title: frontMatter.title, baseUrl: siteUrl });
  const modified = frontMatter.lastModified || frontMatter.date;
  const wasUpdated = modified !== frontMatter.date;

  if (router.isFallback) {
    return <div className="min-h-screen" />;
  }

  return (
    <>
      <Head>
        {generateNextSeo({
          title: frontMatter.title,
          description: frontMatter.description,
          canonical: currentUrl,
          robotsProps: {
            maxImagePreview: 'large',
            maxSnippet: -1,
            maxVideoPreview: -1,
          },
          openGraph: {
            type: 'article',
            article: {
              publishedTime: frontMatter.date,
              modifiedTime: modified,
              authors: [siteUrl],
              tags: frontMatter.tags,
              section: frontMatter.tags?.[0] ?? 'Technology',
            },
            url: currentUrl,
            title: frontMatter.title,
            description: frontMatter.description,
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: frontMatter.title,
                type: diagramOg ? 'image/jpeg' : 'image/png',
              },
            ],
            siteName: 'Achim Sommer Blog',
          },
          additionalMetaTags: [
            {
              name: 'author',
              content: 'Achim Sommer',
            },
            {
              name: 'keywords',
              content: frontMatter.tags.join(', '),
            },
          ],
          additionalLinkTags: [
            {
              rel: 'alternate',
              type: 'application/rss+xml',
              href: `${siteUrl}/rss.xml`,
            },
          ],
        })}
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${currentUrl}#article`,
            mainEntityOfPage: currentUrl,
            url: currentUrl,
            headline: frontMatter.title,
            description: frontMatter.description,
            image: leadImage ? [leadImage, ogImage] : [ogImage],
            datePublished: frontMatter.date,
            dateModified: modified,
            author: personRef,
            publisher: personRef,
            isPartOf: { '@id': WEBSITE_ID },
            inLanguage: 'de-DE',
            keywords: frontMatter.tags?.join(', '),
            isAccessibleForFree: true,
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
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
              { '@type': 'ListItem', position: 3, name: frontMatter.title, item: currentUrl },
            ],
          }),
        }}
      />
      <ReadingProgress targetId="article-content" />
      <article>
        <header className="border-b border-line">
          <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36">
            <nav aria-label="Brotkrumen" className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              <Link href="/" className="transition-colors hover:text-fg">Startseite</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="transition-colors hover:text-fg">Blog</Link>
              {tagLinks[0]?.href && (
                <>
                  <span aria-hidden="true">/</span>
                  <Link href={tagLinks[0].href} className="transition-colors hover:text-fg">{tagLinks[0].name}</Link>
                </>
              )}
            </nav>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.1rem,5vw,3.9rem)] font-medium leading-[1.05] tracking-[-0.035em] text-fg">
              {frontMatter.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{frontMatter.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              <span>
                von{' '}
                <Link href="/" rel="author" className="text-fg transition-colors hover:text-accent">
                  Achim Sommer
                </Link>
              </span>
              <time dateTime={frontMatter.date}>{formatDate(frontMatter.date)}</time>
              {wasUpdated && (
                <span>
                  aktualisiert <time dateTime={modified}>{formatDate(modified)}</time>
                </span>
              )}
              <span>{frontMatter.readingTime} Min. Lesezeit</span>
            </div>

            {tagLinks.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Themen">
                {tagLinks.map((tag) => (
                  <li key={tag.name}>
                    {tag.href ? (
                      <Link
                        href={tag.href}
                        className="inline-block border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition-colors duration-200 hover:border-accent hover:text-fg"
                      >
                        {tag.name}
                      </Link>
                    ) : (
                      <span className="inline-block border border-line px-2.5 py-1 font-mono text-[11px] text-faint">{tag.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </header>

        <Container className="py-14 sm:py-20">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
            <div className="min-w-0 max-w-[740px]">
              <div className="article" id="article-content">
                <MDXRemote {...mdxSource} components={components} />
              </div>

              {/* Pflichtangabe: Unter jedem Artikel steht Werbung mit Partnerlinks (ZAP-Hosting) */}
              <p className="mt-12 border-t border-line pt-5 text-sm text-faint">
                Dieser Artikel enthält Partnerlinks. Kaufst du darüber, erhalte ich eine Provision, für dich ändert
                sich am Preis nichts.
              </p>

              <div className="mt-8">
                <ArticleShare url={currentUrl} title={frontMatter.title} />
              </div>

              {/* Zap-Hosting Werbung */}
              <BlogZapHosting />
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>
          </div>
        </Container>

        {relatedPosts && relatedPosts.length > 0 && (
          <section className="border-t border-line">
            <Container className="py-16 sm:py-20">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Weiterlesen</h2>
              <ul className="mt-8 grid gap-px bg-line md:grid-cols-3">
                {relatedPosts.map((post) => (
                  <li key={post.slug} className="bg-canvas">
                    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-surface">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                        {formatDate(post.frontmatter.date)}
                      </span>
                      <span className="mt-3 text-lg font-medium leading-snug tracking-[-0.01em] text-fg transition-colors group-hover:text-accent">
                        {post.frontmatter.title}
                      </span>
                      <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{post.frontmatter.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}
      </article>
      <FloatingZapAd />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'));
  const paths = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      params: {
        slug: filename.replace('.md', '')
      }
    }));

  return {
    paths,
    // Unbekannte Slugs werden serverseitig geprüft: echte 404 statt Ladeanzeige
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps, IParams> = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true
    };
  }

  try {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const mdxSource = await getCompiledMDX(content);
    const relatedPosts = getRelatedPosts(frontMatter.tags || [], slug, 3);
    // Das Dateidatum taugt nicht als Änderungsdatum (jeder Deploy klont neu),
    // deshalb zählt nur lastModified aus dem Frontmatter
    const date = toDateString(frontMatter.date);
    const lastModified = toDateString(frontMatter.lastModified || frontMatter.date);
    const firstFigure = content.match(/<Figure[^>]*\ssrc="([^"]+)"/);

    return {
      props: {
        frontMatter: {
          title: frontMatter.title,
          description: frontMatter.description,
          tags: frontMatter.tags || [],
          featured: Boolean(frontMatter.featured),
          date,
          lastModified,
          readingTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
        } as FrontMatter,
        mdxSource,
        slug,
        relatedPosts,
        tagLinks: getTagLinks(frontMatter.tags || []),
        leadImage: firstFigure ? `${SITE_URL}${firstFigure[1]}` : null,
        diagramOg: fs.existsSync(path.join(process.cwd(), 'public/img/og', `${slug}.jpg`))
          ? `${SITE_URL}/img/og/${slug}.jpg`
          : null,
      },
      revalidate: 3600 // Revalidiere jede Stunde
    };
  } catch {
    return {
      notFound: true
    };
  }
};
