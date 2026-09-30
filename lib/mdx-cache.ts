import { LRUCache } from 'lru-cache';
import { serialize } from 'next-mdx-remote/serialize';
import { createHash } from 'crypto';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

const mdxCache = new LRUCache<string, any>({
  max: 50, // Maximale Anzahl gecachter Einträge
  ttl: 1000 * 60 * 60 // Cache für 1 Stunde (TTL in Millisekunden)
});

export async function getCompiledMDX(source: string) {
  const cacheKey = createHash('md5').update(source).digest('hex');
  
  if (mdxCache.has(cacheKey)) {
    return mdxCache.get(cacheKey);
  }
  
  const compiled = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
      remarkPlugins: [remarkGfm],
      // Überschriften bekommen schon im HTML eine id: Sprungmarken funktionieren ohne JavaScript
      rehypePlugins: [rehypeSlug]
    }
  });
  
  mdxCache.set(cacheKey, compiled);
  return compiled;
}
