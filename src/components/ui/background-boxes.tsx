"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export const BoxesCore = ({ className, ...props }: { className?: string }) => {
  const [rotate, setRotate] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full bg-slate-950/50 [perspective:1000px] opacity-50",
        className
      )}
      {...props}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(25deg) rotateY(0deg)",
        }}
      >
        <div
          className={cn(
            "flex -ml-32 -mb-32 [transform-style:preserve-3d]",
            rotate ? "[animation:spin_20s_linear_infinite]" : "",
          )}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="ml-32 mb-32 flex [transform-style:preserve-3d]">
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="ml-32 mb-32"
                  style={{
                    transform: `translateZ(${((i * 4 + j) * 37 % 400) + 200}px)`,
                  }}
                >
                  <div
                    className={cn(
                      "h-32 w-32 rounded-xl border border-white/10",
                      "bg-neutral-950 shadow-2xl shadow-neutral-950",
                      "backdrop-blur-md",
                      rotate ? "animate-pulse" : "",
                    )}
                  ></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BackgroundBoxes = React.memo(BoxesCore);
