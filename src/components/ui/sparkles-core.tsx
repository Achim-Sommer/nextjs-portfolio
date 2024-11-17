"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}: {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; duration: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const particleCount = particleDensity || 50;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * ((maxSize || 2) - (minSize || 1)) + (minSize || 1),
        duration: Math.random() * 2 + 1,
      });
    }

    setParticles(newParticles);
  }, [maxSize, minSize, particleDensity]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        background: background || "transparent",
      }}
    >
      {particles.map((particle, i) => (
        <motion.div
          key={`${id}-${i}`}
          animate={{
            scale: [1, 0, 1],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            backgroundColor: particleColor || "#fff",
          }}
        />
      ))}
    </div>
  );
};
