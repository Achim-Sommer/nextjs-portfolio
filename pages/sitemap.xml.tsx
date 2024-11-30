import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
    path: '/services',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/blog',
    priority: 0.9,
    changefreq: 'daily',
  },
  {
    path: '/fivem-template-server',
    priority: 0.9,
    changefreq: 'weekly',
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

// Funktion zum Laden der Blog-Posts
function getBlogPosts(): PageConfig[] {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    // Extrahiere das Datum aus dem Frontmatter oder verwende das Dateiänderungsdatum
    const stats = fs.statSync(filePath);
    const lastModified = data.date 
      ? new Date(data.date).toISOString()
      : stats.mtime.toISOString();

    return {
      path: `/blog/${filename.replace('.md', '')}`,
      priority: 0.8,
      changefreq: 'weekly',
      lastmod: lastModified,
    };
  });
}

function generateSiteMap(pages: PageConfig[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(({ path, priority, changefreq, lastmod }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${path}`}</loc>
           <lastmod>${lastmod || new Date().toISOString()}</lastmod>
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
  const blogPosts = getBlogPosts();
  const allPages = [...staticPages, ...blogPosts];

  // Generate the XML sitemap with all pages
  const sitemap = generateSiteMap(allPages);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
