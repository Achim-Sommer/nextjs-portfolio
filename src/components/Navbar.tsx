'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FloatingNav } from './ui/floating-navbar';
import { FiSun, FiMoon } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineTool, AiOutlineProject } from 'react-icons/ai';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navItems = [
    {
      name: 'Über Mich',
      link: '#about-me',
      icon: <AiOutlineUser className="w-4 h-4" />,
    },
    {
      name: 'Skills',
      link: '#skills-section',
      icon: <AiOutlineTool className="w-4 h-4" />,
    },
    {
      name: 'Projekte',
      link: '#github-section',
      icon: <AiOutlineProject className="w-4 h-4" />,
    },
    {
      name: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      link: '#',
      icon: theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />,
      onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
  ];

  return (
    <FloatingNav 
      navItems={navItems.map(item => ({
        ...item,
        link: item.onClick ? 'javascript:void(0)' : item.link,
      }))} 
      className="top-4"
    />
  );
}
