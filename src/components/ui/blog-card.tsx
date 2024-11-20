"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Box, HStack, Flex, Text } from "@chakra-ui/react";
import { HoverEffect } from "./hover-effect";
import { ModernShare } from "./modern-share";
import { MacWindow } from "./mac-window";
import { useRouter } from "next/router";

interface BlogCardProps {
  post: {
    slug: string;
    frontmatter: {
      title: string;
      date: string;
      description: string;
      tags?: string[];
      readingTime: number;
      featured?: boolean;
    };
  };
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const router = useRouter();
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}${router.basePath}/blog/${post.slug}`;

  return (
    <Box position="relative">
      <Box position="absolute" top={14} right={4} zIndex={20}>
        <ModernShare url={postUrl} title={post.frontmatter.title} />
      </Box>
      <Link href={`/blog/${post.slug}`}>
        <HoverEffect>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50"
          >
            <MacWindow />
            <Box p={4}>
              <Flex direction="column" gap={4} height="full" minH="200px">
                <Box flex="1">
                  <Text 
                    className="mb-2 text-xl font-bold text-gray-100"
                    noOfLines={2}
                    minH="3.5rem"
                  >
                    {post.frontmatter.title}
                  </Text>
                  <Text 
                    className="text-sm text-gray-400"
                    noOfLines={2}
                  >
                    {post.frontmatter.description}
                  </Text>
                </Box>
                <Box mt="auto">
                  <Flex 
                    wrap="wrap" 
                    gap={2} 
                    alignItems="center" 
                    justifyContent="space-between"
                  >
                    <Flex gap={2} flexWrap="wrap" flex="1">
                      {post.frontmatter.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-900/30 px-2 py-1 text-xs text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </Flex>
                    <Text className="text-sm text-gray-500 whitespace-nowrap">
                      {post.frontmatter.readingTime} min read
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </motion.div>
        </HoverEffect>
      </Link>
    </Box>
  );
};
