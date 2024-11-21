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
  title?: string;
  description?: string;
  tags?: string[];
}

// Konfiguration für alle Seiten
const pages: PageConfig[] = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    path: '/services',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0], // Aktuelle Datum für die Services-Seite
  },
  {
    path: '/blog',
    priority: 0.9,
    changefreq: 'daily',
  },
  {
    path: '/about',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/projects',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    priority: 0.7,
    changefreq: 'monthly',
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

function generateSiteMap(pages: PageConfig[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
           xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
     ${pages
       .map(({ path, priority, changefreq, lastmod, title, description, tags }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${path}`}</loc>
           <lastmod>${lastmod || new Date().toISOString()}</lastmod>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
           ${title ? `<title>${title}</title>` : ''}
           ${description ? `<description>${description}</description>` : ''}
           ${tags ? `<tags>${tags.join(', ')}</tags>` : ''}
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Get all blog posts
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  const blogPosts = filenames.map(filename => {
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
      priority: data.featured ? 0.9 : 0.8, // Erhöhe die Priorität für normale Blog-Posts
      changefreq: data.featured ? 'daily' : 'weekly', // Häufigere Updates für featured Posts
      lastmod: lastModified,
      // Füge zusätzliche Metadaten hinzu
      title: data.title,
      description: data.description,
      tags: data.tags,
    } as PageConfig;
  });

  // Sortiere Blog-Posts nach Datum (neueste zuerst)
  blogPosts.sort((a: any, b: any) => {
    return new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime();
  });

  // Combine static pages with dynamic blog posts
  const allPages = [...pages, ...blogPosts];

  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(allPages);

  res.setHeader('Content-Type', 'text/xml');
  // Enable caching for 12 hours
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=43200, stale-while-revalidate=43200'
  );
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
