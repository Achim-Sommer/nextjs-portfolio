"use client";

import { motion } from "framer-motion";
import React from "react";

interface Iso3DIconProps {
  icon: React.ReactNode;
  color: "emerald" | "blue" | "orange" | "violet";
  size?: "sm" | "md" | "lg";
}

const colorStyles = {
  emerald: {
    face: "from-emerald-500 to-emerald-600",
    side: "from-emerald-600 to-emerald-700",
    top: "from-emerald-400 to-emerald-500",
    glow: "shadow-emerald-500/30",
    ring: "ring-emerald-400/20",
    bg: "bg-emerald-500/5",
  },
  blue: {
    face: "from-blue-500 to-blue-600",
    side: "from-blue-600 to-blue-700",
    top: "from-blue-400 to-blue-500",
    glow: "shadow-blue-500/30",
    ring: "ring-blue-400/20",
    bg: "bg-blue-500/5",
  },
  orange: {
    face: "from-orange-500 to-orange-600",
    side: "from-orange-600 to-orange-700",
    top: "from-orange-400 to-orange-500",
    glow: "shadow-orange-500/30",
    ring: "ring-orange-400/20",
    bg: "bg-orange-500/5",
  },
  violet: {
    face: "from-violet-500 to-violet-600",
    side: "from-violet-600 to-violet-700",
    top: "from-violet-400 to-violet-500",
    glow: "shadow-violet-500/30",
    ring: "ring-violet-400/20",
    bg: "bg-violet-500/5",
  },
};

const sizes = {
  sm: { outer: "w-16 h-16", icon: "text-xl" },
  md: { outer: "w-20 h-20", icon: "text-2xl" },
  lg: { outer: "w-24 h-24", icon: "text-3xl" },
};

export const Iso3DIcon: React.FC<Iso3DIconProps> = ({
  icon,
  color,
  size = "lg",
}) => {
  const c = colorStyles[color];
  const s = sizes[size];

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-4, 4, -4] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >
      {/* Ambient glow */}
      <div
        className={`absolute inset-0 ${s.outer} rounded-2xl bg-gradient-to-br ${c.face} opacity-20 blur-2xl scale-150`}
      />

      {/* 3D cube container */}
      <div
        className={`relative ${s.outer}`}
        style={{
          perspective: "600px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Main face */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.face} shadow-2xl ${c.glow} ring-1 ${c.ring} flex items-center justify-center text-white ${s.icon}`}
          style={{
            transform: "rotateX(10deg) rotateY(-10deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Inner highlight */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-white/0 via-white/10 to-white/20 pointer-events-none" />

          {/* Icon */}
          <div className="relative z-10 drop-shadow-lg">{icon}</div>
        </div>

        {/* Bottom edge (depth) */}
        <div
          className={`absolute bottom-0 left-1 right-0 h-3 rounded-b-2xl bg-gradient-to-b ${c.side} opacity-80`}
          style={{
            transform: "rotateX(10deg) rotateY(-10deg) translateY(6px) translateZ(-2px)",
            transformOrigin: "top center",
          }}
        />

        {/* Right edge (depth) */}
        <div
          className={`absolute top-1 right-0 bottom-0 w-3 rounded-r-2xl bg-gradient-to-r ${c.side} opacity-60`}
          style={{
            transform: "rotateX(10deg) rotateY(-10deg) translateX(4px) translateZ(-2px)",
            transformOrigin: "center left",
          }}
        />
      </div>

      {/* Floor shadow */}
      <motion.div
        animate={{ scale: [0.9, 1, 0.9], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-gradient-to-r ${c.face} blur-md`}
      />
    </motion.div>
  );
};
