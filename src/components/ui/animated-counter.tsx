'use client';
import { useEffect, useRef } from "react";
import { useInView, motion } from "framer-motion";

export const AnimatedCounter = ({
  value,
  direction = "up",
  className,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const initial = direction === "down" ? value : 0;
  const target = direction === "down" ? 0 : value;

  useEffect(() => {
    if (!ref.current) return;
    
    if (inView) {
      const element = ref.current;
      let startValue = initial;
      const increment = direction === "down" ? -1 : 1;
      const stepTime = Math.abs(Math.floor(2000 / (target - initial)));
      
      const counter = setInterval(() => {
        startValue += increment;
        element.textContent = startValue.toString();
        
        if ((direction === "down" && startValue <= target) || 
            (direction === "up" && startValue >= target)) {
          element.textContent = target.toString();
          clearInterval(counter);
        }
      }, stepTime);
      
      return () => clearInterval(counter);
    }
  }, [inView, initial, target, direction]);

  return <span ref={ref} className={className}>{initial}</span>;
};
