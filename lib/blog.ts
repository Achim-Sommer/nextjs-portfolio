import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BLOG_TAGS, MIN_POSTS_PER_TAG, findTagByName, type BlogTag } from './blog-tags';

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  /** Letzte inhaltliche Änderung (YYYY-MM-DD), gepflegt im Frontmatter */
  lastModified?: string;
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
        date: toDateString(data.date),
        lastModified: toDateString(data.lastModified || data.date),
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
  const shared = (post: BlogListItem) =>
    (post.frontmatter.tags || []).filter((tag) => normalized.includes(tag.toLowerCase())).length;

  // Meiste gemeinsame Themen zuerst, bei Gleichstand der neuere Artikel
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => ({ post, score: shared(post) }))
    .filter(({ score }) => normalized.length === 0 || score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

/** Frontmatter-Daten von gray-matter können Date-Objekte sein: immer als YYYY-MM-DD liefern */
export function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '');
}

export function getPostsByTag(tagName: string): BlogListItem[] {
  const needle = tagName.toLowerCase();
  return getAllPosts().filter((post) =>
    (post.frontmatter.tags || []).some((tag) => tag.toLowerCase() === needle)
  );
}

/** Themen mit genug Artikeln für eine eigene Tag-Seite, inkl. Anzahl */
export function getTagPages(): (BlogTag & { count: number })[] {
  return BLOG_TAGS.map((tag) => ({ ...tag, count: getPostsByTag(tag.name).length })).filter(
    (tag) => tag.count >= MIN_POSTS_PER_TAG
  );
}

/** Tags eines Artikels, jeweils mit Link, falls es eine Tag-Seite gibt */
export function getTagLinks(tags: string[] = []): { name: string; href: string | null }[] {
  const pages = new Set(getTagPages().map((tag) => tag.slug));
  return tags.map((name) => {
    const tag = findTagByName(name);
    return { name, href: tag && pages.has(tag.slug) ? `/blog/tag/${tag.slug}` : null };
  });
}
