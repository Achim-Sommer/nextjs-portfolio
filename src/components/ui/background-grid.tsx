"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "@/styles/grid-pattern.css";

export const BackgroundGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.5 },
    });
  }, [controls]);

  return (
    <motion.div
      ref={gridRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={controls}
    >
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] mask-fade-out" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50" />
    </motion.div>
  );
};
