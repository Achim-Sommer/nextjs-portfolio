"use client";
import { useEffect, useState } from "react";
import { SimpleGrid, Skeleton, Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "./blog-card";
import { BlogPost } from "@/types/blog";

interface BlogGridProps {
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 6;

export const BlogGrid = ({ posts }: BlogGridProps) => {
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
  }, [displayedPosts.length, loading, posts.length]);

  const loadMorePosts = async () => {
    setLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const nextPosts = posts.slice(
      displayedPosts.length,
      displayedPosts.length + POSTS_PER_PAGE
    );
    setDisplayedPosts((prev) => [...prev, ...nextPosts]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full" mb={16}>
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
      </SimpleGrid>

      {loading && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full" mt={8}>
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              height="300px"
              borderRadius="xl"
              startColor="gray.800"
              endColor="gray.700"
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
