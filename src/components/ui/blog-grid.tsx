import { BlogCard } from "./blog-card";
import { BlogPost } from "@/types/blog";

interface BlogGridProps {
  posts: BlogPost[];
}

/**
 * Alle Artikel stehen direkt im HTML: früher kamen sie erst per useEffect und
 * Endlos-Scroll dazu, dadurch fand Google auf der Übersicht keine Artikel-Links.
 */
export const BlogGrid = ({ posts }: BlogGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-16">
    {posts.map((post) => (
      <div key={post.slug}>
        <BlogCard post={post} />
      </div>
    ))}
  </div>
);
