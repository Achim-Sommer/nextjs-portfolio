'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'glow';
}

export const Badge = ({ 
  children, 
  className,
  variant = 'default'
}: BadgeProps) => {
  const variants = {
    default: 'bg-blue-500/10 text-blue-500',
    outline: 'border border-blue-500/20 text-blue-500',
    glow: 'bg-blue-500/10 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );
};
