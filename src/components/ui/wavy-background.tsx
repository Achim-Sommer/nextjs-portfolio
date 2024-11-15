'use client';
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import React from "react";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  blur = 100,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  blur?: number;
}) => {
  const path = "M0 0L50 10C100 20 150 20 200 10C250 0 300 0 350 10C400 20 450 20 500 10L500 0L0 0Z";

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div className="absolute inset-0 z-0">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            animate={{
              y: ["0%", "-100%"],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: (i + 8) * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(to bottom, transparent, ${color})`,
              transform: `translateY(${i * 10}%)`,
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blur}px)`,
          }}
        />
      </div>
      <div className={cn("relative z-10", className)}>{children}</div>
      <svg
        className="absolute bottom-0 left-0 right-0 opacity-20 dark:opacity-10"
        viewBox="0 0 500 25"
        style={{ width: "200%", transform: "translateX(-25%)" }}
      >
        <motion.path
          d={path}
          fill="currentColor"
          animate={{
            x: ["-25%", "-50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
};
