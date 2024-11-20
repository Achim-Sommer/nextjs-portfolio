import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ANIMATION_DURATION } from "@/config/stats.config";

export const useCounterAnimation = (endValue: number) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / ANIMATION_DURATION, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        const currentCount = Math.floor(easeOutQuart * endValue);
        
        setCount(currentCount);

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, endValue]);

  return { count, countRef };
};
