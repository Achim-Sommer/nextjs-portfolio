"use client";
import { cn } from "@/utils/cn";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-75 group-hover:opacity-100 blur-xl transition duration-500",
          animate && "animate-gradient"
        )}
      />
      <div
        className={cn(
          "relative bg-black rounded-3xl p-4",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
