'use client';
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const Sparkles = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [showSparkles, setShowSparkles] = useState(true);

  useEffect(() => {
    const generateSparkle = () => {
      const sparkle = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
      };
      return sparkle;
    };

    const addSparkle = () => {
      if (!showSparkles) return;
      const sparkle = generateSparkle();
      setSparkles((prev) => [...prev, sparkle]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
      }, 300);
    };

    const interval = setInterval(addSparkle, 100);
    return () => clearInterval(interval);
  }, [showSparkles]);

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setShowSparkles(true)}
      onMouseLeave={() => setShowSparkles(false)}
      {...props}
    >
      {children}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="pointer-events-none absolute inline-flex h-1.5 w-1.5 animate-sparkle"
            style={{
              left: sparkle.x + "%",
              top: sparkle.y + "%",
              scale: sparkle.size,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: sparkle.size }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                fill="currentColor"
                className="text-blue-500/50"
              />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
