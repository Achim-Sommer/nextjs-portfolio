import { GetServerSideProps } from 'next';
import { getAllPosts, getPostsByTag, getTagPages } from '../lib/blog';
import { GAMES } from '../src/data/server-ram';

const EXTERNAL_DATA_URL = 'https://achimsommer.com';

interface PageConfig {
  path: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
}

// Konfiguration für alle statischen Seiten
const staticPages: PageConfig[] = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    path: '/blog',
    priority: 0.9,
    changefreq: 'daily',
  },
  {
    path: '/fivem-template-server',
    priority: 0.8,
    changefreq: 'yearly',
  },
  {
    path: '/palworld',
    priority: 0.9,
    changefreq: 'weekly',
  },
  {
    path: '/server-ram-rechner',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/kontakt',
    priority: 0.6,
    changefreq: 'yearly',
  },
  {
    path: '/impressum',
    priority: 0.3,
    changefreq: 'yearly',
  },
  {
    path: '/datenschutz',
    priority: 0.3,
    changefreq: 'yearly',
  },
];

/** Neuestes Änderungsdatum einer Artikelliste */
function newest(dates: string[]): string | undefined {
  return dates.sort().at(-1);
}

// Blog-Artikel und Themenseiten; lastmod kommt aus dem Frontmatter (lastModified)
function getBlogPages(): PageConfig[] {
  const posts = getAllPosts();
  const articles: PageConfig[] = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: post.frontmatter.lastModified || post.frontmatter.date,
  }));
  const tags: PageConfig[] = getTagPages().map((tag) => ({
    path: `/blog/tag/${tag.slug}`,
    priority: 0.5,
    changefreq: 'weekly',
    lastmod: newest(getPostsByTag(tag.name).map((p) => p.frontmatter.lastModified || p.frontmatter.date)),
  }));
  const blogIndex = staticPages.find((page) => page.path === '/blog');
  if (blogIndex) blogIndex.lastmod = newest(articles.map((a) => a.lastmod || ''));
  return [...articles, ...tags];
}

function generateSiteMap(pages: PageConfig[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(({ path, priority, changefreq, lastmod }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${path}`}</loc>
           ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Kombiniere statische Seiten mit Blog-Posts
  const blogPages = getBlogPages();
  // Unterseiten des RAM-Rechners pro Spiel
  const ramPages: PageConfig[] = GAMES.map((g) => ({ path: `/server-ram-rechner/${g.id}`, priority: 0.7, changefreq: 'monthly' }));
  const allPages = [...staticPages, ...ramPages, ...blogPages];

  // Generate the XML sitemap with all pages
  const sitemap = generateSiteMap(allPages);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
