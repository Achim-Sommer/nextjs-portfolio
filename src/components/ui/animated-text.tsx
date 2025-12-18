'use client';
import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import React from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  gradient?: boolean;
}

export const AnimatedText = ({
  text,
  className,
  gradient = false,
}: AnimatedTextProps) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className={cn(
            "inline-block mr-2",
            gradient && "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
          )}
        >
          {word.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
};
