'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaComments, FaGithub, FaLinkedin } from 'react-icons/fa';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const dockItems: DockItem[] = [
  {
    icon: <FaShoppingCart className="w-6 h-6" />,
    label: 'Shop',
    href: 'https://shop.achimsommer.com'
  },
  {
    icon: <FaComments className="w-6 h-6" />,
    label: 'Forum',
    href: 'https://forum.achimsommer.com'
  },
  {
    icon: <FaGithub className="w-6 h-6" />,
    label: 'GitHub',
    href: 'https://github.com/Achim-Sommer'
  },
  {
    icon: <FaLinkedin className="w-6 h-6" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/achim-sommer-b898a2185/'
  }
];

export default function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.2;
    return 1;
  };

  return (
    <div 
      className={`${
        isFooterVisible 
          ? 'absolute bottom-full' 
          : 'fixed bottom-8'
      } left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300`}
    >
      <motion.div
        ref={dockRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/50 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10"
      >
        <div className="flex items-center gap-8">
          {dockItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                scale: getScale(index),
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }
              }}
            >
              <motion.div
                className="text-white/75 hover:text-white transition-colors"
              >
                {item.icon}
              </motion.div>
              
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? -25 : 10,
                }}
                className="absolute -top-6 text-white text-xs whitespace-nowrap bg-black/75 backdrop-blur-sm px-1.5 py-0.5 rounded-md"
              >
                {item.label}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
