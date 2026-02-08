"use client";
import { motion } from "framer-motion";
import Link from "next/link";
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
    <div className="relative">
      <div className="absolute top-14 right-4 z-20">
        <ModernShare url={postUrl} title={post.frontmatter.title} />
      </div>
      <Link href={`/blog/${post.slug}`}>
        <HoverEffect>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50"
          >
            <MacWindow />
            <div className="p-4">
              <div className="flex flex-col gap-4 h-full min-h-[200px]">
                <div className="flex-1">
                  <p className="mb-2 text-xl font-bold text-gray-100 line-clamp-2 min-h-[3.5rem]">
                    {post.frontmatter.title}
                  </p>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {post.frontmatter.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex gap-2 flex-wrap flex-1">
                      {post.frontmatter.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-900/30 px-2 py-1 text-xs text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 whitespace-nowrap">
                      {post.frontmatter.readingTime} min read
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </HoverEffect>
      </Link>
    </div>
  );
};
