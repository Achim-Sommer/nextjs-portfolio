'use client';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export const MagneticButton = ({
  children,
  className = "",
  scale = 1.2,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const moveX = useTransform(xSpring, [0, 1], [0, 1]);
  const moveY = useTransform(ySpring, [0, 1], [0, 1]);

  const handleMouse = (event: React.MouseEvent) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = {
      x: event.clientX - centerX,
      y: event.clientY - centerY,
    };

    x.set(distance.x / 5);
    y.set(distance.y / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        x: moveX,
        y: moveY,
      }}
      whileHover={{ scale }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};
