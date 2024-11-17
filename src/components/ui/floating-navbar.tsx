'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleItemClick = (item: NavItem, index: number) => {
    const element = document.querySelector(item.link);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setActiveIndex(index);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 rounded-full overflow-hidden", className)}
        >
            <motion.div
              layout
              className="w-full backdrop-blur-md bg-[#0f0f0f]/30 rounded-full h-16 flex items-center justify-around px-8 border border-[#1f1f1f]/40 shadow-lg shadow-black/[0.15]"
            >
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item, index)}
                  className={cn(
                    "relative flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors",
                    activeIndex === index && "text-white"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
