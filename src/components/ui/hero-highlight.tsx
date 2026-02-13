"use client";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import React from "react";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn("relative inline-block", className)}
    >
      {children}
      <div
        className="absolute -inset-x-2 -inset-y-1 bg-neutral-400/20 dark:bg-neutral-950/[0.2] -z-10 rounded-lg"
      ></div>
    </span>
  );
};

export const HeroHighlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative z-20", className)}>
      <span className="relative inline-block">
        {children}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            delay: 1.2,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-lg bg-gradient-to-r from-violet-500/50 to-pink-500/50"
        />
      </span>
    </div>
  );
};
