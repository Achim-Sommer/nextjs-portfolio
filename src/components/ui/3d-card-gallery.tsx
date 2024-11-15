'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const ThreeDCardGallery = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item.link}
          key={item.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="relative h-full w-full rounded-xl p-6 border border-transparent dark:border-white/[0.2]"
            style={{
              transformStyle: "preserve-3d",
              transform: hoveredIndex === idx
                ? "rotateY(-5deg) rotateX(5deg)"
                : "rotateY(0deg) rotateX(0deg)",
              transition: "all 0.3s ease-out",
            }}
          >
            <div className="relative h-60 w-full overflow-hidden rounded-xl">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <div className="relative mt-4">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-xs text-white bg-white/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
              style={{
                transform: "translateZ(-10px)",
              }}
            />
          </motion.div>
        </a>
      ))}
    </div>
  );
};
