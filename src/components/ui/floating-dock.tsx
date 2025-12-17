'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  mobileClassName?: string;
}

export const FloatingDock = ({
  items,
  mobileClassName = '',
}: FloatingDockProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.2;
    return 1;
  };

  return (
    <motion.div
      ref={dockRef}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 ${mobileClassName}`}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/20 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10"
      >
        <div className="flex items-end gap-2 h-16">
          {items.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex flex-col items-center justify-end"
              onMouseEnter={() => setHoveredIndex(index)}
              animate={{
                scale: getScale(index),
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }
              }}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -40 }}
                    exit={{ opacity: 0, y: 0 }}
                    className="absolute whitespace-nowrap rounded-md px-3 py-1 bg-gray-800 text-white text-sm"
                  >
                    {item.title}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-colors hover:bg-white/20"
              >
                {item.icon}
              </motion.div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
