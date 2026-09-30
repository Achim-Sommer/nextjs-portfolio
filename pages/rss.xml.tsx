import { GetServerSideProps } from 'next';
import { getAllPosts } from '../lib/blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://achimsommer.com';

function buildRss() {
  const posts = getAllPosts();
  const lastBuildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();
      const escapedTitle = post.frontmatter.title.replace(/]]>/g, ']]&gt;');
      const categories = (post.frontmatter.tags || [])
        .map((tag: string) => `          <category><![CDATA[${tag}]]></category>`)
        .join('\n');

      return `
        <item>
          <title><![CDATA[${escapedTitle}]]></title>
          <author>dev@achimsommer.com (Achim Sommer)</author>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <description><![CDATA[${post.frontmatter.description}]]></description>
          <pubDate>${pubDate}</pubDate>
${categories}
        </item>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Achim Sommer Blog</title>
      <link>${siteUrl}/blog</link>
      <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
      <description>Anleitungen und Praxiswissen zu IT-Infrastruktur, Security, Microsoft 365, Linux und Webentwicklung von Achim Sommer.</description>
      <language>de-de</language>
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
      ${items}
    </channel>
  </rss>`;
}

function Rss() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = buildRss();
  res.setHeader('Content-Type', 'application/rss+xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(feed);
  res.end();

  return { props: {} };
};

export default Rss;
