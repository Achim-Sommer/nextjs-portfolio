'use client';

import { useState, useEffect } from 'react';
import { FloatingNav } from './ui/floating-navbar';
import { AiOutlineUser, AiOutlineTool, AiOutlineProject, AiOutlineRead } from 'react-icons/ai';
import BlogNavbar from './BlogNavbar';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isBlogPage = pathname?.includes('/blog') ?? false;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isBlogPage) {
    return <BlogNavbar />;
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
      name: 'Blog',
      link: '/blog',
      icon: <AiOutlineRead className="w-4 h-4" />,
    },
  ];

  return (
    <FloatingNav 
      navItems={navItems} 
      className="top-4 bg-[#0f0f0f]/80 text-[#3b82f6] hover:text-[#6366f1]"
    />
  );
}
