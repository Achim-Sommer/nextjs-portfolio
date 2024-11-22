'use client';

import { cn } from "@/utils/cn";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import dynamic from 'next/dynamic';
import React, { useRef, useState } from "react";

export const Card3D = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const damping = 20;
  const springConfig = { damping, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    mouseX.set(mouseXFromCenter / width);
    mouseY.set(mouseYFromCenter / height);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovering(false);
  };

  const onMouseEnter = () => {
    setHovering(true);
  };

  const Image = dynamic(() => import('next/image'), {
    loading: () => <div className="h-full w-full bg-gray-200/30 animate-pulse rounded" />,
  });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={cn("relative perspective-1200", containerClassName)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "w-full h-full transition-transform",
          className
        )}
      >
        {children}
        {hovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="absolute -inset-2 -z-10 rounded-xl bg-gradient-to-br from-blue-500/25 to-purple-500/25 blur-xl"
          />
        )}
      </motion.div>
    </div>
  );
};
