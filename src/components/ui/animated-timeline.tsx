'use client';
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/utils/cn";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon?: string;
  subscribers?: string;
  views?: string;
}

export const AnimatedTimeline = ({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {/* Animated Line */}
      <motion.div
        className="absolute left-[50%] top-0 h-full w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-blue-500/20"
        style={{
          scaleY: scrollYProgress,
          transformOrigin: "top",
        }}
      />

      {/* Timeline Items */}
      <div className="relative space-y-24 py-12">
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className={cn(
              "relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4",
              idx % 2 === 0 ? "md:text-right" : "md:text-left md:grid-flow-dense"
            )}
          >
            {/* Content */}
            <div
              className={cn(
                "relative z-10 col-span-1 space-y-3",
                idx % 2 === 0 ? "md:pr-12" : "md:pl-12 md:col-start-2"
              )}
            >
              {/* Date with Gradient */}
              <div className="inline-block">
                <div className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                  {item.date}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>

              {/* Stats Grid if available */}
              {(item.subscribers || item.views) && (
                <div className="grid grid-cols-2 gap-4 py-2">
                  {item.subscribers && (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Abonnenten</div>
                      <div className="text-lg font-semibold text-purple-400">{item.subscribers}</div>
                    </div>
                  )}
                  {item.views && (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Views</div>
                      <div className="text-lg font-semibold text-blue-400">{item.views}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-gray-400">{item.description}</p>
            </div>

            {/* Icon/Point */}
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center justify-center",
                idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
              )}
            >
              <div className="relative">
                {/* Background blur */}
                <div className="absolute inset-0 blur-xl opacity-50 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                
                {/* Icon container */}
                <div className="relative w-12 h-12 rounded-full bg-black border border-white/10 shadow-lg flex items-center justify-center">
                  <span className="text-2xl">{item.icon || "🎯"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
