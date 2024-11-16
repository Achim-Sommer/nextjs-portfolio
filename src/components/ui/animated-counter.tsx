'use client';
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export const AnimatedCounter = ({
  value,
  direction = "up",
  className,
  duration = 2000, // Standarddauer von 2 Sekunden
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  duration?: number;
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
      
      // Dynamische Schrittweitenberechnung basierend auf der Zahl
      const calculateStepSize = (val: number) => {
        // Für sehr große Zahlen größere Schritte
        if (val > 1000000) return Math.ceil(val / 100);
        if (val > 100000) return Math.ceil(val / 200);
        if (val > 10000) return Math.ceil(val / 300);
        if (val > 1000) return Math.ceil(val / 400);
        return 1;
      };

      const stepSize = calculateStepSize(Math.abs(target));
      const totalSteps = Math.ceil(Math.abs(target - initial) / stepSize);
      const stepTime = duration / totalSteps;

      const counter = setInterval(() => {
        // Dynamische Schrittgröße
        startValue += increment * stepSize;

        // Sicherstellen, dass wir nicht über das Ziel hinausgehen
        if ((increment > 0 && startValue > target) || 
            (increment < 0 && startValue < target)) {
          startValue = target;
        }

        // Formatierung mit Tausendertrennzeichen
        element.textContent = startValue.toLocaleString();
        
        // Stoppen, wenn Ziel erreicht
        if (startValue === target) {
          clearInterval(counter);
        }
      }, stepTime);
      
      return () => clearInterval(counter);
    }
  }, [inView, initial, target, direction, duration]);

  return <span ref={ref} className={className}>{initial.toLocaleString()}</span>;
};
