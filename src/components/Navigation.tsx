'use client';

import { useState } from 'react';
import { FloatingNav } from './ui/floating-navbar';
import { AiOutlineUser, AiOutlineTool, AiOutlineProject, AiOutlineCustomerService } from 'react-icons/ai';

export default function Navigation() {
  const [mounted, setMounted] = useState(false);

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
      name: 'Services',
      link: '/services',
      icon: <AiOutlineCustomerService className="w-4 h-4" />,
    },
  ];

  return (
    <FloatingNav 
      navItems={navItems} 
      className="top-4"
    />
  );
}
