import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import React, { useState } from "react";

export const AnimatedCard = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 group",
        className
      )}
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.02,
        },
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      <div className="relative z-50">{children}</div>
      <motion.div
        initial={{
          x: "-100%",
          y: "-100%",
        }}
        animate={{
          x: isHovered ? "0%" : "-100%",
          y: isHovered ? "0%" : "-100%",
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-10 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent dark:from-blue-400/20"
      />
    </motion.div>
  );
};
