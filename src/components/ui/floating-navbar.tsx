'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
    onClick?: () => void;
  }[];
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

  const handleItemClick = (item: typeof navItems[0], index: number) => {
    if (item.onClick) {
      item.onClick();
      return;
    }

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
          className={cn(
            "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
            className
          )}
        >
          <div className="relative">
            <motion.div
              layout
              className="w-full backdrop-blur-sm bg-white/[0.8] dark:bg-gray-900/[0.8] rounded-full h-16 flex items-center justify-around px-8 border border-white/40 dark:border-gray-800/40 shadow-lg"
            >
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item, index)}
                  className={cn(
                    "relative flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors",
                    activeIndex === index && "text-black dark:text-white"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
