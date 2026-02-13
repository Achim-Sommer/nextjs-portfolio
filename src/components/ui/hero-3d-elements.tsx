"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  FaCode,
  FaReact,
  FaWifi,
  FaVideo,
  FaShieldAlt,
  FaNetworkWired,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { MdRouter, MdCameraOutdoor } from "react-icons/md";
import { HiSignal } from "react-icons/hi2";

/* ─── Floating 3D Icon Panel ─── */
const FloatingIconPanel: React.FC<{
  icon: React.ReactNode;
  color: string;
  size: number;
  delay: number;
  duration: number;
  x: string;
  y: string;
  rotateStart?: number;
}> = ({ icon, color, size, delay, duration, x, y, rotateStart = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: delay * 0.2 }}
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{
          y: [-6, 8, -6],
          rotateY: [rotateStart, rotateStart + 15, rotateStart - 10, rotateStart],
          rotateX: [5, 12, 5],
        }}
        transition={{
          y: { duration, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: duration * 1.6, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: duration * 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative flex items-center justify-center"
        style={{
          width: size,
          height: size,
          perspective: "500px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Panel Background */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/[0.08]"
          style={{
            background: `linear-gradient(135deg, ${color}18, ${color}08)`,
            backdropFilter: "blur(8px)",
            boxShadow: `
              0 8px 32px ${color}15,
              0 0 60px ${color}05,
              inset 0 1px 0 rgba(255,255,255,0.06)
            `,
          }}
        />

        {/* Shine overlay */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, transparent 100%)`,
          }}
        />

        {/* Bottom edge (3D depth) */}
        <div
          className="absolute -bottom-1 left-1 right-1 h-2 rounded-b-2xl"
          style={{
            background: `linear-gradient(to bottom, ${color}12, ${color}06)`,
            filter: "blur(1px)",
          }}
        />

        {/* Right edge (3D depth) */}
        <div
          className="absolute top-1 -right-1 bottom-1 w-2 rounded-r-2xl"
          style={{
            background: `linear-gradient(to right, ${color}10, ${color}04)`,
            filter: "blur(1px)",
          }}
        />

        {/* Icon */}
        <div
          className="relative z-10"
          style={{
            color: `${color}`,
            fontSize: size * 0.4,
            filter: `drop-shadow(0 0 8px ${color}30)`,
          }}
        >
          {icon}
        </div>

        {/* Ambient glow */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}10, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ─── Small floating dot/particle ─── */
const FloatingParticle: React.FC<{
  color: string;
  size: number;
  delay: number;
  duration: number;
  x: string;
  y: string;
}> = ({ color, size, delay, duration, x, y }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0] }}
      transition={{ duration: duration, repeat: Infinity, delay }}
      className="absolute pointer-events-none rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}60, transparent)`,
        boxShadow: `0 0 ${size * 2}px ${color}20`,
      }}
    />
  );
};

/* ─── Grid Lines Background ─── */
const PerspectiveGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg) scale(2.5)",
          transformOrigin: "center top",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 70%)",
        }}
      />
    </div>
  );
};

/* ─── Main Hero 3D Elements Export ─── */
export const Hero3DElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <PerspectiveGrid />

      {/* ── Webentwicklung Icons (left side, emerald/green) ── */}
      <FloatingIconPanel
        icon={<SiNextdotjs />}
        color="#10b981"
        size={64}
        delay={1}
        duration={5}
        x="6%"
        y="12%"
        rotateStart={-10}
      />
      <FloatingIconPanel
        icon={<FaReact />}
        color="#06b6d4"
        size={52}
        delay={3}
        duration={5.5}
        x="3%"
        y="48%"
        rotateStart={15}
      />
      <FloatingIconPanel
        icon={<SiTypescript />}
        color="#3b82f6"
        size={44}
        delay={5}
        duration={6}
        x="12%"
        y="78%"
        rotateStart={-5}
      />

      {/* ── UniFi / Netzwerk Icons (right side, blue) ── */}
      <FloatingIconPanel
        icon={<MdRouter />}
        color="#3b82f6"
        size={68}
        delay={2}
        duration={5.2}
        x="85%"
        y="10%"
        rotateStart={10}
      />
      <FloatingIconPanel
        icon={<FaWifi />}
        color="#6366f1"
        size={48}
        delay={4}
        duration={4.8}
        x="90%"
        y="50%"
        rotateStart={-15}
      />
      <FloatingIconPanel
        icon={<FaNetworkWired />}
        color="#8b5cf6"
        size={42}
        delay={6}
        duration={5.8}
        x="83%"
        y="80%"
        rotateStart={8}
      />

      {/* ── Security & Protect Icons (scattered) ── */}
      <FloatingIconPanel
        icon={<FaVideo />}
        color="#f97316"
        size={50}
        delay={2.5}
        duration={5.4}
        x="78%"
        y="42%"
        rotateStart={-8}
      />
      <FloatingIconPanel
        icon={<FaShieldAlt />}
        color="#8b5cf6"
        size={46}
        delay={4.5}
        duration={6.2}
        x="16%"
        y="38%"
        rotateStart={12}
      />

      {/* ── Extra small icons (top area, subtle) ── */}
      <FloatingIconPanel
        icon={<FaCode />}
        color="#10b981"
        size={36}
        delay={3.5}
        duration={6.5}
        x="28%"
        y="5%"
        rotateStart={-12}
      />
      <FloatingIconPanel
        icon={<HiSignal />}
        color="#3b82f6"
        size={38}
        delay={5.5}
        duration={5}
        x="68%"
        y="3%"
        rotateStart={6}
      />
      <FloatingIconPanel
        icon={<SiTailwindcss />}
        color="#06b6d4"
        size={34}
        delay={7}
        duration={5.6}
        x="22%"
        y="65%"
        rotateStart={-6}
      />
      <FloatingIconPanel
        icon={<MdCameraOutdoor />}
        color="#f97316"
        size={40}
        delay={6.5}
        duration={5.3}
        x="62%"
        y="82%"
        rotateStart={10}
      />

      {/* ── Ambient particles ── */}
      <FloatingParticle color="#3b82f6" size={6} delay={0} duration={3} x="30%" y="20%" />
      <FloatingParticle color="#10b981" size={4} delay={1} duration={4} x="50%" y="10%" />
      <FloatingParticle color="#8b5cf6" size={5} delay={2} duration={3.5} x="75%" y="30%" />
      <FloatingParticle color="#f97316" size={4} delay={0.5} duration={4.5} x="40%" y="70%" />
      <FloatingParticle color="#06b6d4" size={5} delay={1.5} duration={3.2} x="55%" y="90%" />
      <FloatingParticle color="#3b82f6" size={3} delay={3} duration={3.8} x="20%" y="50%" />
      <FloatingParticle color="#10b981" size={4} delay={2.5} duration={4.2} x="80%" y="65%" />
    </div>
  );
};

/* ─── Stats Card with 3D Effect ─── */
export const Stat3DCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
  index: number;
}> = ({ icon, value, label, index }) => {
  const colors = [
    { border: "#3b82f6", glow: "rgba(59,130,246,0.08)" },
    { border: "#10b981", glow: "rgba(16,185,129,0.08)" },
    { border: "#f97316", glow: "rgba(249,115,22,0.08)" },
    { border: "#8b5cf6", glow: "rgba(139,92,246,0.08)" },
  ];
  const c = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="group relative"
      style={{ perspective: "600px" }}
    >
      <div
        className="flex flex-col items-center gap-2 rounded-2xl border border-gray-800/60 bg-gray-900/40 p-6 backdrop-blur-sm transition-all duration-300 group-hover:bg-gray-900/60"
        style={{
          boxShadow: `0 4px 24px ${c.glow}`,
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${c.border}60, transparent)`,
          }}
        />
        <span className="text-xl" style={{ color: c.border }}>{icon}</span>
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-sm text-gray-400 text-center">{label}</span>
      </div>
    </motion.div>
  );
};
