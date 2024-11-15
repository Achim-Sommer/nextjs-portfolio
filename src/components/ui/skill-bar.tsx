'use client';
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export const SkillBar = ({
  skill,
  percentage,
}: {
  skill: string;
  percentage: number;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {skill}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {percentage}%
        </span>
      </div>
      <div className="h-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ originX: 0 }}
          variants={{
            hidden: { scaleX: 0 },
            visible: {
              scaleX: percentage / 100,
              transition: {
                duration: 1,
                ease: "easeOut",
              },
            },
          }}
          initial="hidden"
          animate={controls}
        />
      </div>
    </div>
  );
};
