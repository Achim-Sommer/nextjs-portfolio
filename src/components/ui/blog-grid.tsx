"use client";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "./blog-card";
import { BlogPost } from "@/types/blog";

interface BlogGridProps {
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 6;

export const BlogGrid = ({ posts }: BlogGridProps) => {
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const nextPosts = posts.slice(
      displayedPosts.length,
      displayedPosts.length + POSTS_PER_PAGE
    );
    setDisplayedPosts((prev) => [...prev, ...nextPosts]);
    setLoading(false);
  }, [displayedPosts.length, posts]);

  useEffect(() => {
    setDisplayedPosts(posts.slice(0, POSTS_PER_PAGE));
  }, [posts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000 &&
        !loading &&
        displayedPosts.length < posts.length
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedPosts.length, loadMorePosts, loading, posts.length]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-16">
        <AnimatePresence mode="popLayout">
          {displayedPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] rounded-xl bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      )}
    </>
  );
};
