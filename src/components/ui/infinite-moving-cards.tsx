'use client';

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    icon: string;
    color: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll-marquee",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[200px] max-w-full relative flex-shrink-0 cursor-pointer"
            key={item.name}
          >
            <div className={cn(
              "relative h-full w-full rounded-2xl border border-slate-700/40 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-slate-600/50 group",
              "bg-gradient-to-br from-slate-800 to-slate-900/90"
            )}>
              <div className={cn(
                "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity",
                item.color
              )} />
              <div className="absolute inset-px rounded-[15px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur" />
              
              <div className="relative flex flex-col items-center justify-center gap-3">
                <span className="text-4xl relative">
                  {item.icon}
                  <div className="absolute inset-0 blur-sm opacity-50">{item.icon}</div>
                </span>
                
                <div className="relative">
                  <p className="text-sm font-medium text-slate-200 text-center">
                    {item.name}
                  </p>
                  <div className="absolute inset-0 blur-sm opacity-50">
                    <p className="text-sm font-medium text-slate-200 text-center">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className={cn(
                "absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent",
                "group-hover:via-current group-hover:opacity-60"
              )} />
              <div className={cn(
                "absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent",
                "group-hover:via-current group-hover:opacity-60"
              )} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
