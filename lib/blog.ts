import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  readingTime: number;
  featured?: boolean;
};

export type BlogListItem = {
  slug: string;
  frontmatter: BlogFrontmatter;
};

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

function toReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): BlogListItem[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'));

  const posts = files.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    return {
      slug: filename.replace(/\.md$/, ''),
      frontmatter: {
        ...data,
        readingTime: data.readingTime ?? toReadingTime(content),
      } as BlogFrontmatter,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getLatestPosts(limit = 3): BlogListItem[] {
  return getAllPosts().slice(0, limit);
}

export function getRelatedPosts(tags: string[] = [], slug?: string, limit = 3): BlogListItem[] {
  const normalized = tags.map((tag) => tag.toLowerCase());
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .filter((post) =>
      normalized.length === 0
        ? true
        : (post.frontmatter.tags || []).some((tag) => normalized.includes(tag.toLowerCase()))
    )
    .slice(0, limit);
}
