"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export const MacbookScroll = ({
  title,
  src,
  showGradient,
}: {
  title: string;
  src: string;
  showGradient?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const imageRotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <div
      ref={containerRef}
      className="min-h-[80vh] py-20 flex items-center justify-center antialiased relative"
    >
      <div
        className="absolute inset-0"
        style={{
          background: showGradient
            ? "linear-gradient(to bottom right, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)"
            : "",
        }}
      />
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          style={{
            perspective: "1000px",
            rotateX: imageRotateX,
            scale: imageScale,
          }}
          className="max-w-5xl"
        >
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={src}
              alt={title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-left-top"
            />
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold text-neutral-200 mt-8">{title}</h2>
      </div>
    </div>
  );
};
