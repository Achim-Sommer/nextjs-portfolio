import { cn } from "@/utils/cn";
import React, { useState } from "react";

// Deterministic seed-based random to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const count = number || 20;

  // Generate stable random values using a deterministic seed
  const [meteorStyles] = useState(() =>
    Array.from({ length: count }, (_, idx) => ({
      left: Math.floor(seededRandom(idx * 3 + 1) * 800 - 400) + "px",
      animationDelay: (seededRandom(idx * 3 + 2) * 0.6 + 0.2).toFixed(4) + "s",
      animationDuration: Math.floor(seededRandom(idx * 3 + 3) * 8 + 2) + "s",
    }))
  );

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: style.left,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        ></span>
      ))}
    </>
  );
};
