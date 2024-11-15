'use client';
import { useMotionValue, motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const Spotlight = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomOffset] = useState({
    x: Math.random() * 400 - 200,
    y: Math.random() * 400 - 200,
  });

  const springConfig = { damping: 30, stiffness: 200 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX - window.innerWidth / 2 + randomOffset.x);
      mouseY.set(clientY - window.innerHeight / 2 + randomOffset.y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [randomOffset.x, randomOffset.y]);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 opacity-0 mix-blend-soft-light bg-gradient-to-r from-blue-500 to-purple-500"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(120,119,198,0.15), transparent 80%)`,
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-0 mix-blend-soft-light bg-gradient-to-r from-blue-500 to-purple-500"
        style={{
          background: `radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(60,120,198,0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};
