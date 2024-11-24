'use client';

import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  
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
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => renderCard(item, idx))}
      </div>
    </div>
  );
};
