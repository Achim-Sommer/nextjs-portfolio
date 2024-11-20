import { GetServerSideProps } from 'next';

const EXTERNAL_DATA_URL = 'https://achimsommer.com';

interface PageConfig {
  path: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

// Konfiguration für alle Seiten
const pages: PageConfig[] = [
  {
    path: '/',
    priority: 1.0,
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
  {
    path: '/about',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    path: '/projects',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    priority: 0.5,
    changefreq: 'monthly',
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
       .map((page) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${page.path}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>${page.changefreq}</changefreq>
           <priority>${page.priority}</priority>
           ${page.path === '/' ? `
           <image:image>
             <image:loc>${EXTERNAL_DATA_URL}/api/og</image:loc>
             <image:title>Achim Sommer - Full Stack Developer Portfolio</image:title>
             <image:caption>Portfolio von Achim Sommer - Full Stack Developer und FiveM Entwickler</image:caption>
           </image:image>` : ''}
       </url>`
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps wird die Hauptarbeit machen
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // Generiere die XML Sitemap
    const sitemap = generateSiteMap(pages);

    // Cache-Control Header setzen für bessere Performance
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=600'
    );
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.statusCode = 500;
    res.end();
    return {
      props: {},
    };
  }
};

export default SiteMap;
