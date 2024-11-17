'use client';

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  cardClassName = "",
  showName = false,
}: {
  items: {
    name: string;
    icon: React.ReactNode;
    color: string;
    description?: React.ReactNode;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  cardClassName?: string;
  showName?: boolean;
}) => {
  const [duplicatedItems] = useState(() => [...items, ...items]);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  const getSpeed = () => {
    switch (speed) {
      case "fast":
        return "20s";
      case "normal":
        return "30s";
      case "slow":
        return "40s";
      default:
        return "30s";
    }
  };

  const renderCard = (item: (typeof items)[0], index: number) => (
    <div
      key={item.name + index}
      className={cn("relative shrink-0 group", cardClassName)}
      style={{
        width: cardClassName ? "auto" : "200px",
        marginRight: "1rem",
      }}
    >
      <div className={cn(
        "relative h-full w-full rounded-2xl border border-slate-700/40 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-slate-600/50",
        "bg-gradient-to-br from-slate-800 to-slate-900/90"
      )}>
        <div className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity",
          item.color
        )} />
        <div className="relative z-10 flex justify-between items-center gap-4">
          {showName ? (
            <>
              <div className="text-4xl">{item.icon}</div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-slate-200">{item.name}</h3>
                {item.description && (
                  <div className="text-sm text-slate-300">{item.description}</div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                {item.description && (
                  <div className="text-sm text-slate-300">{item.description}</div>
                )}
              </div>
              <div className="text-4xl">{item.icon}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />

      <div 
        className="relative flex overflow-hidden" 
        style={{ 
          maskImage: 'none',
          WebkitMaskImage: 'none'
        }}
      >
        <div
          className={cn(
            "flex min-w-full shrink-0 gap-4 py-4 transition-transform duration-75",
            start && "animate-infinite-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{ 
            animationDirection: direction === 'right' ? 'reverse' : 'normal',
            animationDuration: getSpeed()
          }}
        >
          {duplicatedItems.map((item, idx) => renderCard(item, idx))}
        </div>
      </div>
    </div>
  );
};
