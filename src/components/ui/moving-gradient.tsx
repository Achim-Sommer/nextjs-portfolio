'use client';
import { motion } from "framer-motion";
import React from "react";

export const MovingGradient = () => {
  return (
    <div className="absolute inset-0 z-0">
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundPosition: "0 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        style={{
          background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
          backgroundSize: "400% 400%",
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backdropFilter: "blur(100px)",
        }}
      />
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90" />
    </div>
  );
};
