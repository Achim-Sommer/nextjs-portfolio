import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiFileText } from 'react-icons/fi';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import BlogSearch from '@/components/BlogSearch';
import BlogFilter from '@/components/BlogFilter';
import { BackgroundGrid } from "@/components/ui/background-grid";
import { BlogGrid } from "@/components/ui/blog-grid";
import "@/styles/grid-pattern.css";
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { useRouter } from 'next/router';
import { BlogPost } from '@/types/blog';
import { Meteors } from "@/components/ui/meteors";

interface Props {
  posts: BlogPost[];
}

export default function Blog({ posts }: Props) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://achimsommer.com';
  const currentUrl = `${siteUrl}${router.asPath}`;

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
          title: 'Blog - Tutorials & Guides zu Web Development und Server-Hosting',
          description:
            'Technische Tutorials, Guides und Best Practices zu Web Development, Server-Hosting, und Software Engineering von Full Stack Developer Achim Sommer.',
          canonical: currentUrl,
          openGraph: {
            type: 'website',
            url: currentUrl,
            title: 'Blog - Tutorials & Guides zu Web Development und Server-Hosting',
            description:
              'Technische Tutorials, Guides und Best Practices zu Web Development, Server-Hosting, und Software Engineering von Full Stack Developer Achim Sommer.',
            images: [
              {
                url: `${siteUrl}/api/og?title=${encodeURIComponent('Blog - Tutorials & Guides')}`,
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
              content:
                'Web Development, Server-Hosting, Tutorials, Programming, Software Engineering, Full Stack Development',
            },
            {
              name: 'robots',
              content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            },
          ],
        })}
      </Head>
      <div className="min-h-screen bg-gray-900 relative overflow-hidden">
        <BackgroundGrid />

        <div className="relative z-[1]">
          <div className="relative mb-16 px-8 pt-20">
            <div className="max-w-7xl mx-auto pb-10 border-b-2 border-white/10">
              <div className="flex flex-col gap-8 items-start">
                <div className="flex flex-col gap-6 items-start">
                  <h1 className="text-4xl md:text-5xl font-bold text-blue-400 font-mono tracking-tight">
                    Blog & Tutorials
                  </h1>
                  <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
                    Entdecke Artikel über Web Development, DevOps und Software Engineering
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl">
                  <div className="flex flex-col items-start">
                    <p className="text-blue-400 text-2xl font-bold font-mono">
                      {posts.length}
                    </p>
                    <p className="text-gray-500 text-sm">Artikel</p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-blue-400 text-2xl font-bold font-mono">
                      {Array.from(new Set(posts.flatMap(post => post.frontmatter.tags || []))).length}
                    </p>
                    <p className="text-gray-500 text-sm">Kategorien</p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-blue-400 text-2xl font-bold font-mono">
                      {posts.reduce((acc, post) => acc + (post.frontmatter.readingTime || 0), 0)}
                    </p>
                    <p className="text-gray-500 text-sm">Minuten Lesedauer</p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-blue-400 text-2xl font-bold font-mono">
                      {new Date().getFullYear()}
                    </p>
                    <p className="text-gray-500 text-sm">Aktiv seit</p>
                  </div>
                </div>

                <div className="w-full max-w-3xl">
                  <div className="flex flex-col gap-6 w-full">
                    <BlogSearch
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                    />
                    <BlogFilter
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8">
            <div className="max-w-7xl mx-auto">
              {featuredPost && (
                <div className="mb-16">
                  <Link href={`/blog/${featuredPost.slug}`} passHref>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gray-800 rounded-xl overflow-hidden relative group"
                    >
                      <div className="p-8">
                        <div className="flex flex-col gap-6 items-start">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-600 text-white text-sm font-mono px-3 py-1 rounded-full">Featured Post</span>
                            {featuredPost.frontmatter.tags?.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="bg-blue-900 text-blue-200 text-sm font-mono px-3 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <h2 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {featuredPost.frontmatter.title}
                          </h2>

                          <p className="text-gray-400 text-lg max-w-3xl">
                            {featuredPost.frontmatter.description}
                          </p>

                          <div className="flex items-center gap-6 text-gray-500">
                            <div className="flex items-center gap-2">
                              <FiCalendar className="text-blue-400" />
                              <span>
                                {new Date(featuredPost.frontmatter.date).toLocaleDateString('de-DE', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiClock className="text-blue-400" />
                              <span>{featuredPost.frontmatter.readingTime} min</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                      />

                      <Meteors number={20} className="opacity-0 group-hover:opacity-100" />
                    </motion.div>
                  </Link>
                </div>
              )}

              {filteredAndSortedPosts.length > 0 ? (
                <BlogGrid posts={filteredAndSortedPosts} />
              ) : (
                <div className="p-12 text-center border border-dashed border-blue-800 rounded-xl bg-gray-800">
                  <div className="flex flex-col gap-4 items-center">
                    <FiFileText className="text-blue-400 w-10 h-10" />
                    <p className="font-mono text-gray-400 text-lg">
                      Keine Artikel gefunden
                    </p>
                    <p className="text-gray-500">
                      Versuche es mit anderen Suchbegriffen oder Filtern
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="absolute top-0 left-0 right-0 h-full pointer-events-none opacity-50 z-0"
            style={{
              backgroundImage: 'linear-gradient(to bottom right, rgba(66, 153, 225, 0.05) 0%, transparent 50%, rgba(66, 153, 225, 0.05) 100%)',
            }}
          />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(process.cwd(), 'content/blog', filename),
      'utf-8'
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    const readingTime = Math.ceil(content.split(/\s+/).length / 200);

    return {
      slug: filename.replace('.md', ''),
      frontmatter: {
        ...frontmatter,
        readingTime,
      },
    } as BlogPost;
  });

  return {
    props: {
      posts: posts.sort((a, b) => {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
      }),
    },
  };
};
