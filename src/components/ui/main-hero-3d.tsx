"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaDatabase,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiVercel,
} from "react-icons/si";
import { HiCommandLine, HiCpuChip } from "react-icons/hi2";
import { VscCode } from "react-icons/vsc";

/* ─── Floating 3D Icon Panel ─── */
const Float3DIcon: React.FC<{
  icon: React.ReactNode;
  color: string;
  size: number;
  delay: number;
  duration: number;
  x: string;
  y: string;
  rotateStart?: number;
  label?: string;
}> = ({ icon, color, size, delay, duration, x, y, rotateStart = 0, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: delay * 0.25, ease: "easeOut" }}
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{
          y: [-5, 7, -5],
          rotateY: [rotateStart, rotateStart + 12, rotateStart - 8, rotateStart],
          rotateX: [3, 10, 3],
        }}
        transition={{
          y: { duration, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: duration * 1.8, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: duration * 2.2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative flex flex-col items-center gap-1.5"
        style={{
          perspective: "500px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main panel */}
        <div
          className="relative flex items-center justify-center rounded-xl border border-white/[0.06]"
          style={{
            width: size,
            height: size,
            background: `linear-gradient(145deg, ${color}15, ${color}06)`,
            backdropFilter: "blur(12px)",
            boxShadow: `
              0 8px 32px ${color}12,
              0 0 80px ${color}04,
              inset 0 1px 0 rgba(255,255,255,0.05)
            `,
          }}
        >
          {/* Top highlight */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              background: `linear-gradient(145deg, rgba(255,255,255,0.06) 0%, transparent 40%)`,
            }}
          />

          {/* 3D depth edges */}
          <div
            className="absolute -bottom-[3px] left-[3px] right-[3px] h-[5px] rounded-b-xl"
            style={{
              background: `linear-gradient(to bottom, ${color}10, ${color}04)`,
              filter: "blur(0.5px)",
            }}
          />
          <div
            className="absolute top-[3px] -right-[3px] bottom-[3px] w-[5px] rounded-r-xl"
            style={{
              background: `linear-gradient(to right, ${color}08, ${color}03)`,
              filter: "blur(0.5px)",
            }}
          />

          {/* Icon */}
          <div
            className="relative z-10"
            style={{
              color: color,
              fontSize: size * 0.4,
              filter: `drop-shadow(0 0 6px ${color}25)`,
              opacity: 0.85,
            }}
          >
            {icon}
          </div>
        </div>

        {/* Label */}
        {label && (
          <span
            className="text-[9px] font-medium tracking-wide uppercase opacity-40"
            style={{ color }}
          >
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ─── Floating connection dot ─── */
const GlowDot: React.FC<{
  color: string;
  size: number;
  delay: number;
  duration: number;
  x: string;
  y: string;
}> = ({ color, size, delay, duration, x, y }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.5, 0] }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute pointer-events-none rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color}50, transparent)`,
      boxShadow: `0 0 ${size * 3}px ${color}15`,
    }}
  />
);

/* ─── Main Export ─── */
export const MainHero3DElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* ── Left column: Frontend/Framework icons ── */}
      <Float3DIcon
        icon={<FaReact />}
        color="#61dafb"
        size={58}
        delay={1}
        duration={5.2}
        x="4%"
        y="10%"
        rotateStart={-8}
        label="React"
      />
      <Float3DIcon
        icon={<SiNextdotjs />}
        color="#ffffff"
        size={50}
        delay={3}
        duration={5.8}
        x="7%"
        y="42%"
        rotateStart={12}
        label="Next.js"
      />
      <Float3DIcon
        icon={<SiTypescript />}
        color="#3178c6"
        size={44}
        delay={5}
        duration={6.2}
        x="3%"
        y="72%"
        rotateStart={-5}
        label="TypeScript"
      />

      {/* ── Right column: Backend/DevOps icons ── */}
      <Float3DIcon
        icon={<FaNodeJs />}
        color="#68a063"
        size={54}
        delay={2}
        duration={5.5}
        x="88%"
        y="8%"
        rotateStart={10}
        label="Node.js"
      />
      <Float3DIcon
        icon={<FaDocker />}
        color="#2496ed"
        size={46}
        delay={4}
        duration={5}
        x="90%"
        y="45%"
        rotateStart={-12}
        label="Docker"
      />
      <Float3DIcon
        icon={<FaDatabase />}
        color="#f29111"
        size={42}
        delay={6}
        duration={6}
        x="86%"
        y="75%"
        rotateStart={6}
        label="Database"
      />

      {/* ── Scattered middle-ish (not blocking center text) ── */}
      <Float3DIcon
        icon={<SiTailwindcss />}
        color="#38bdf8"
        size={40}
        delay={2.5}
        duration={5.4}
        x="18%"
        y="25%"
        rotateStart={-6}
      />
      <Float3DIcon
        icon={<FaGitAlt />}
        color="#f05032"
        size={38}
        delay={4.5}
        duration={6.4}
        x="78%"
        y="28%"
        rotateStart={8}
      />
      <Float3DIcon
        icon={<VscCode />}
        color="#007acc"
        size={48}
        delay={3.5}
        duration={5.6}
        x="15%"
        y="58%"
        rotateStart={-10}
        label="VS Code"
      />
      <Float3DIcon
        icon={<SiVercel />}
        color="#ffffff"
        size={36}
        delay={5.5}
        duration={5.3}
        x="80%"
        y="60%"
        rotateStart={14}
      />
      <Float3DIcon
        icon={<HiCommandLine />}
        color="#a855f7"
        size={34}
        delay={7}
        duration={6.8}
        x="22%"
        y="82%"
        rotateStart={-4}
      />
      <Float3DIcon
        icon={<SiPrisma />}
        color="#2d3748"
        size={36}
        delay={6.5}
        duration={5.1}
        x="75%"
        y="85%"
        rotateStart={9}
      />
      <Float3DIcon
        icon={<HiCpuChip />}
        color="#6366f1"
        size={32}
        delay={8}
        duration={6.5}
        x="30%"
        y="6%"
        rotateStart={-7}
      />

      {/* ── Ambient glow dots ── */}
      <GlowDot color="#61dafb" size={5} delay={0} duration={3.5} x="12%" y="35%" />
      <GlowDot color="#3178c6" size={4} delay={1.2} duration={4} x="45%" y="8%" />
      <GlowDot color="#68a063" size={5} delay={0.8} duration={3.8} x="82%" y="38%" />
      <GlowDot color="#f05032" size={4} delay={2} duration={4.2} x="55%" y="88%" />
      <GlowDot color="#a855f7" size={3} delay={1.5} duration={3.2} x="38%" y="65%" />
      <GlowDot color="#2496ed" size={4} delay={0.5} duration={3.6} x="65%" y="15%" />
      <GlowDot color="#38bdf8" size={3} delay={3} duration={4.5} x="50%" y="50%" />
      <GlowDot color="#f29111" size={4} delay={2.5} duration={3.4} x="25%" y="92%" />
    </div>
  );
};
