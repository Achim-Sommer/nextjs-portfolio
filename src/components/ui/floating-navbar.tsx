'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    if (item.link.startsWith('#')) {
      const element = document.querySelector(item.link);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
      setActiveIndex(index);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 rounded-full overflow-hidden hidden sm:block", className)}
          >
            <motion.div
              layout
              className="w-full backdrop-blur-md bg-[#0f0f0f]/30 rounded-full h-16 flex items-center justify-around px-8 border border-[#1f1f1f]/40 shadow-lg shadow-black/[0.15]"
            >
              {navItems.map((item, index) => (
                item.link.startsWith('#') ? (
                  <button
                    key={`desktop-${item.name}-${index}`}
                    onClick={() => handleItemClick(item, index)}
                    className={cn(
                      "relative flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors",
                      activeIndex === index && "text-white"
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                ) : (
                  <Link
                    key={`desktop-${item.name}-${index}`}
                    href={item.link}
                    className="relative flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn("fixed top-4 right-4 z-50 sm:hidden")}
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md bg-[#0f0f0f]/30 border border-[#1f1f1f]/40 shadow-lg shadow-black/[0.15]"
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6 text-white" aria-hidden="true" />
              ) : (
                <HiMenu className="w-6 h-6 text-white" aria-hidden="true" />
              )}
            </button>
          </motion.div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-20 inset-x-4 z-50 sm:hidden"
                id="mobile-menu"
                role="navigation"
                aria-label="Mobile Navigation"
              >
                <motion.div
                  className="w-full backdrop-blur-md bg-[#0f0f0f]/95 rounded-2xl py-4 border border-[#1f1f1f]/40 shadow-lg shadow-black/[0.15]"
                >
                  {navItems.map((item, index) => (
                    <div key={`mobile-${item.name}-${index}`} className="px-4">
                      {item.link.startsWith('#') ? (
                        <button
                          onClick={() => handleItemClick(item, index)}
                          className={cn(
                            "w-full flex items-center gap-3 py-3 text-base font-medium text-white/90 hover:text-white transition-colors",
                            activeIndex === index && "text-white"
                          )}
                          aria-label={`Navigiere zu ${item.name}`}
                          aria-current={activeIndex === index ? "page" : undefined}
                        >
                          {item.icon && <span aria-hidden="true">{item.icon}</span>}
                          <span>{item.name}</span>
                        </button>
                      ) : (
                        <Link
                          href={item.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full flex items-center gap-3 py-3 text-base font-medium text-white/90 hover:text-white transition-colors"
                          aria-label={`Gehe zu ${item.name}`}
                        >
                          {item.icon && <span aria-hidden="true">{item.icon}</span>}
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};
