'use client';
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  category: string;
  duration: string;
}

export const MasonryGrid = ({
  videos,
  className,
}: {
  videos: Video[];
  className?: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = ["all", ...Array.from(new Set(videos.map(video => video.category)))];

  const filteredVideos = selectedCategory === "all"
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className={cn("space-y-8", className)}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              "bg-white/5 hover:bg-white/10 border border-white/10",
              selectedCategory === category && "bg-white/20 border-white/20"
            )}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group relative aspect-video overflow-hidden rounded-xl bg-black/20"
          >
            {/* Thumbnail */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Title */}
                <h3 className="text-white font-semibold line-clamp-2 mb-2">
                  {video.title}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span>{video.views} Views</span>
                  <span>•</span>
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Video Link */}
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
            >
              <span className="sr-only">Watch {video.title}</span>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
