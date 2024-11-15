"use client";
import { cn } from "@/utils/cn";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["40%", "0%", "-40%"]);

  return (
    <motion.span
      ref={ref}
      className={cn("relative inline-block", className)}
      style={{ opacity }}
    >
      {children}
      <motion.div
        style={{ y }}
        className="absolute -inset-x-2 -inset-y-1 bg-neutral-400/20 dark:bg-neutral-950/[0.2] -z-10 rounded-lg"
      ></motion.div>
    </motion.span>
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
            delay: 0.5,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-lg bg-gradient-to-r from-violet-500/50 to-pink-500/50"
        />
      </span>
    </div>
  );
};
