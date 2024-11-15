'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { motion } from 'framer-motion';

export function GlowingStarsBackgroundCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="z-10">{children}</div>
    </div>
  );
}
