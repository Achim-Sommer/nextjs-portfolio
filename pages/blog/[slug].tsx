import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getCompiledMDX } from '../../lib/mdx-cache';
import dynamic from 'next/dynamic';
import { getRelatedPosts, BlogListItem } from '../../lib/blog';
import { FiClock, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArticleShare } from '@/components/ui/article-share';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { ArticleJsonLd } from 'next-seo';
import { TableOfContents } from '@/components/TableOfContents';

// Dynamische Imports für MDX-Komponenten
const CodeBlock = dynamic(() => import('@/components/CodeBlock'), {
  loading: () => <div className="p-4 bg-gray-800 rounded-md"><span className="text-gray-400">Loading code...</span></div>
});
const BlogZapHosting = dynamic(() => import('@/components/BlogZapHosting'));
const FloatingZapAd = dynamic(() => import('@/components/FloatingZapAd'));
const Tip = dynamic(() => import('../../src/components/Tip'));
const ServerComparisonTable = dynamic(() => import('@/components/mdx/tables').then(mod => mod.ServerComparisonTable));
const PriceComparison = dynamic(() => import('@/components/PriceComparison/PriceComparison'));
const ZapHostingCta = dynamic(() => import('@/components/ZapHostingCta'));

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
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const components = {
  pre: (props: any) => {
    const codeString = props.children?.props?.children;
    if (typeof codeString === 'string') {
      return <CodeBlock>{codeString}</CodeBlock>;
    }
    return <pre {...props} />;
  },
  Tip: Tip,
  ServerComparisonTable: ServerComparisonTable,
  PriceComparison: PriceComparison,
  ZapHostingCta: ZapHostingCta
};

export default function BlogPost({ frontMatter, mdxSource, slug, relatedPosts }: BlogPostProps) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://achimsommer.com';
  const currentUrl = `${siteUrl}${router.asPath}`;

  if (router.isFallback) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <>
      <Head>
        {generateNextSeo({
          title: frontMatter.title,
          description: frontMatter.description,
          canonical: currentUrl,
          openGraph: {
            type: 'article',
            article: {
              publishedTime: frontMatter.date,
              modifiedTime: frontMatter.lastModified || frontMatter.date,
              authors: ['Achim Sommer'],
              tags: frontMatter.tags,
              section: frontMatter.tags?.[0] ?? 'Technology',
            },
            url: currentUrl,
            title: frontMatter.title,
            description: frontMatter.description,
            images: [
              {
                url: `${siteUrl}/api/og?title=${encodeURIComponent(frontMatter.title)}&cache=1`,
                width: 1200,
                height: 630,
                alt: frontMatter.title,
                type: 'image/png',
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
            {
              property: 'article:author',
              content: 'https://achimsommer.com',
            },
            {
              name: 'robots',
              content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
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
      <ArticleJsonLd
        type="BlogPosting"
        url={currentUrl}
        headline={frontMatter.title}
        image={[`${siteUrl}/api/og?title=${encodeURIComponent(frontMatter.title)}&cache=1`]}
        datePublished={frontMatter.date}
        dateModified={frontMatter.lastModified || frontMatter.date}
        author={{
          name: 'Achim Sommer',
          url: 'https://achimsommer.com',
        }}
        description={frontMatter.description}
        isAccessibleForFree={true}
        publisher={{
          name: 'Achim Sommer',
          url: 'https://achimsommer.com',
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Startseite",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}/blog`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": frontMatter.title,
                "item": currentUrl
              }
            ]
          })
        }}
      />
      <div 
        className="min-h-screen bg-gray-900 relative pt-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(66, 153, 225, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-4 md:px-6 lg:px-8">
          <div className="relative flex flex-col md:flex-row gap-8">
            {/* TableOfContents nur auf Desktop anzeigen */}
            <div className="hidden md:block">
              <TableOfContents />
            </div>
            <div className="flex-1 w-full md:w-auto">
              <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden relative z-[1] mx-[-1rem] sm:mx-[-1rem] md:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+2rem)] md:w-full">
                {/* File tab */}
                <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-900 px-3 sm:px-4 py-2">
                  <span className="text-gray-100 text-xs sm:text-sm font-mono">{slug}.md</span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 md:p-8" id="article-content">
                  <div className="flex flex-col gap-6">
                    {/* Header section */}
                    <div className="border-b border-gray-700 pb-6">
                      <h1 className="text-2xl sm:text-4xl font-bold text-blue-300 font-mono mb-4">
                        {frontMatter.title}
                      </h1>
                      
                      <p className="text-gray-100 text-lg mb-4 pl-4 border-l-2 border-blue-500">
                        {frontMatter.description}
                      </p>

                      <div className="flex gap-6 text-gray-100 text-sm font-mono">
                        <span className="inline-flex items-center gap-1.5">
                          <FiCalendar className="text-blue-400" />
                          {new Date(frontMatter.date).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FiClock className="text-blue-400" />
                          {frontMatter.readingTime} min read
                        </span>
                      </div>

                      {/* Top Share Button */}
                      <div className="py-6">
                        <ArticleShare url={currentUrl} title={frontMatter.title} variant="top" />
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="prose prose-dark max-w-none
                      [&_h1]:text-blue-200 [&_h1]:font-mono [&_h1]:mt-6 [&_h1]:mb-4 [&_h1]:flex [&_h1]:items-center [&_h1]:gap-2 [&_h1]:before:content-[''] [&_h1]:before:block [&_h1]:before:w-[3px] [&_h1]:before:h-[1em] [&_h1]:before:bg-blue-500 [&_h1]:before:rounded-sm
                      [&_h2]:text-blue-200 [&_h2]:font-mono [&_h2]:mt-6 [&_h2]:mb-4 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2 [&_h2]:before:content-[''] [&_h2]:before:block [&_h2]:before:w-[3px] [&_h2]:before:h-[1em] [&_h2]:before:bg-blue-500 [&_h2]:before:rounded-sm
                      [&_h3]:text-blue-200 [&_h3]:font-mono [&_h3]:mt-6 [&_h3]:mb-4 [&_h3]:flex [&_h3]:items-center [&_h3]:gap-2 [&_h3]:before:content-[''] [&_h3]:before:block [&_h3]:before:w-[3px] [&_h3]:before:h-[1em] [&_h3]:before:bg-blue-500 [&_h3]:before:rounded-sm
                      [&_h4]:text-blue-200 [&_h4]:font-mono [&_h4]:mt-6 [&_h4]:mb-4
                      [&_p]:text-gray-50 [&_p]:mb-4 [&_p]:leading-[1.8] [&_p]:text-[1.1rem]
                      [&_strong]:text-blue-100 [&_strong]:font-bold
                      [&_a]:text-blue-200 [&_a]:no-underline [&_a]:border-b [&_a]:border-dashed [&_a]:border-blue-500 [&_a]:transition-all hover:[&_a]:text-blue-100 hover:[&_a]:border-solid
                      [&_ul]:text-gray-50 [&_ul]:pl-4 [&_ul]:mb-4 [&_ul]:text-[1.1rem]
                      [&_ol]:text-gray-50 [&_ol]:pl-4 [&_ol]:mb-4 [&_ol]:text-[1.1rem]
                      [&_li]:mb-2 [&_li]:pl-2 [&_li]:marker:text-blue-300
                      [&_pre]:relative [&_pre]:bg-gray-800 [&_pre]:text-gray-50 [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:border [&_pre]:border-gray-700 [&_pre]:shadow-lg
                      [&_code]:bg-gray-800 [&_code]:text-blue-200 [&_code]:p-1 [&_code]:rounded-sm [&_code]:text-[0.9em] [&_code]:font-mono
                      [&_blockquote]:border-l-4 [&_blockquote]:border-blue-400 [&_blockquote]:pl-4 [&_blockquote]:ml-0 [&_blockquote]:text-blue-100 [&_blockquote]:italic [&_blockquote]:bg-white/5 [&_blockquote]:py-2 [&_blockquote]:pr-2 [&_blockquote]:rounded-r-md
                      [&_hr]:border-gray-600 [&_hr]:my-6
                      [&_table]:text-gray-50 [&_table]:w-full [&_table]:mb-4 [&_table]:border-separate [&_table]:border-spacing-0 [&_table]:border [&_table]:border-gray-700 [&_table]:rounded-md [&_table]:overflow-hidden [&_table]:text-[1.1rem]
                      [&_th]:border-gray-700 [&_th]:p-2 [&_th]:border-b [&_th]:border-r [&_th]:bg-gray-800 [&_th]:font-bold [&_th]:text-blue-200 [&_th]:text-left
                      [&_td]:border-gray-700 [&_td]:p-2 [&_td]:border-b [&_td]:border-r
                      [&_img]:max-w-full [&_img]:h-auto [&_img]:mb-4 [&_img]:rounded-md [&_img]:border [&_img]:border-gray-700 [&_img]:shadow-lg
                    ">
                      <MDXRemote {...mdxSource} components={components} />
                    </div>

                    {/* Bottom Share Button */}
                    <div className="pt-6">
                      <ArticleShare url={currentUrl} title={frontMatter.title} variant="bottom" />
                    </div>

                    {/* Zap-Hosting Werbung */}
                    <BlogZapHosting />

                    {relatedPosts && relatedPosts.length > 0 && (
                      <div className="pt-8">
                        <h3 className="text-lg font-bold text-blue-300 font-mono mb-4">
                          Ähnliche Artikel
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {relatedPosts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`}>
                              <div
                                role="article"
                                className="bg-gray-800 border border-gray-700 rounded-md p-4 transition-all duration-200 hover:border-blue-500 hover:-translate-y-0.5"
                              >
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {post.frontmatter.tags?.slice(0, 2).map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 rounded-full bg-blue-900 text-blue-200 text-xs font-mono"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <p className="font-bold text-blue-300 mb-1 line-clamp-2">
                                  {post.frontmatter.title}
                                </p>
                                <p className="text-sm text-gray-100 line-clamp-2">
                                  {post.frontmatter.description}
                                </p>
                                <p className="mt-3 text-xs text-gray-100">
                                  {new Date(post.frontmatter.date).toLocaleDateString('de-DE', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                  {' • '}
                                  {post.frontmatter.readingTime} min
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center gap-4 border-t border-gray-700 bg-gray-900 px-3 sm:px-4 py-1 text-xs text-gray-100 font-mono">
                  <span>markdown</span>
                  <span>UTF-8</span>
                  <span>Ln {mdxSource.compiledSource.split('\n').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    fallback: true // Enable ISR
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
    const fileStat = fs.statSync(filePath);
    const lastModified = fileStat.mtime.toISOString();
    const { data: frontMatter, content } = matter(fileContents);
    
    const mdxSource = await getCompiledMDX(content);
    const relatedPosts = getRelatedPosts(frontMatter.tags || [], slug, 3);

    return {
      props: {
        frontMatter: {
          ...frontMatter,
          readingTime: Math.ceil(content.split(' ').length / 200),
          lastModified: frontMatter.lastModified || lastModified,
        } as FrontMatter,
        mdxSource,
        slug,
        relatedPosts
      },
      revalidate: 3600 // Revalidiere jede Stunde
    };
  } catch {
    return {
      notFound: true
    };
  }
};
