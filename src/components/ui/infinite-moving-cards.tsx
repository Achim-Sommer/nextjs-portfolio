'use client';

import { cn } from "@/utils/cn";
import React, { useState } from "react";
import dynamic from 'next/dynamic';

const Image = dynamic(() => import('next/image'), {
  loading: () => <div className="h-full w-full bg-gray-200/30 animate-pulse rounded" />,
});

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
  const [duplicatedItems] = useState(() => [...items, ...items, ...items]);

  const renderCard = (item: (typeof items)[0], index: number) => (
    <div
      key={item.name + index}
      className={cn("relative shrink-0 group", cardClassName)}
      style={{
        width: cardClassName ? "auto" : "250px",
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

      <div className="relative flex overflow-hidden">
        <div
          className={cn(
            "flex gap-4 py-4",
            direction === "left" ? "animate-scroll" : "animate-scroll-reverse",
            pauseOnHover && "hover-pause"
          )}
        >
          {duplicatedItems.map((item, idx) => renderCard(item, idx))}
        </div>
      </div>
    </div>
  );
};
