import { GetServerSideProps } from 'next';
import { getAllPosts } from '../lib/blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://achimsommer.com';

function buildRss() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();

      return `
        <item>
          <title><![CDATA[${post.frontmatter.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description><![CDATA[${post.frontmatter.description}]]></description>
          <pubDate>${pubDate}</pubDate>
        </item>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Achim Sommer Blog</title>
      <link>${siteUrl}/blog</link>
      <description>Technische Tutorials, Guides und Best Practices von Achim Sommer.</description>
      <language>de-de</language>
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
  res.write(feed);
  res.end();

  return { props: {} };
};

export default Rss;
