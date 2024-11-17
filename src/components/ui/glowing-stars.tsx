'use client';

import { cn } from '@/lib/utils'
import React from 'react'

interface GlowingStarsProps {
  children: React.ReactNode
  containerClassName?: string
}

export const GlowingStars: React.FC<GlowingStarsProps> = ({
  children,
  containerClassName,
}) => {
  const [stars] = React.useState(() => {
    return Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2,
      alpha: Math.random(),
    }))
  })

  return (
    <div className={cn('relative', containerClassName)}>
      {children}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute animate-pulse rounded-full bg-white"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.alpha,
          }}
        />
      ))}
    </div>
  )
}
