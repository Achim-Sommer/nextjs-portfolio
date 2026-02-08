'use client';

import { motion, Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import { stats, ANIMATION_DELAY } from "@/config/stats.config";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { ErrorBoundary } from "react-error-boundary";

// Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * ANIMATION_DELAY / 1000,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const iconVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// Fallback component for error boundary
const ErrorFallback = ({ error }: { error: unknown }) => (
  <div className="text-red-400 p-4 rounded-lg bg-red-900/20 border border-red-800/30">
    <h2 className="font-bold">Etwas ist schiefgelaufen:</h2>
    <pre className="text-sm">{error instanceof Error ? error.message : 'Unbekannter Fehler'}</pre>
  </div>
);

// Individual stat card component
const StatCard = ({ value, label, icon: Icon, gradient, accentColor, index }: typeof stats[0] & { index: number }) => {
  const { count, countRef } = useCounterAnimation(value);
  
  return (
    <motion.div
      ref={countRef}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      {/* Card Background */}
      <div className={cn(
        "absolute inset-0 rounded-2xl backdrop-blur-sm",
        "border border-slate-700/50 group-hover:border-slate-600/50",
        "transition-all duration-300",
        accentColor
      )} />
      
      {/* Accent line */}
      <div className={cn(
        "absolute h-1 w-full bottom-0 rounded-b-2xl opacity-80",
        "group-hover:opacity-100 transition-all duration-300",
        gradient
      )} />
      
      {/* Content */}
      <div className="relative rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div 
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            className="relative"
          >
            <div className={cn(
              "p-2 rounded-lg",
              "bg-slate-800/80 group-hover:bg-slate-700/80",
              "ring-1 ring-slate-700/50 group-hover:ring-slate-600/50",
              "transition-all duration-300"
            )}>
              <Icon className={cn(
                "text-2xl",
                "text-white",
                "transition-colors duration-300",
                gradient
              )} />
            </div>
          </motion.div>
          <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300">
            {label}
          </p>
        </div>
        
        {/* Counter */}
        <div className={cn(
          "font-mono font-bold text-3xl tracking-tight",
          "text-white",
          "transition-colors duration-300",
          gradient
        )}>
          {count.toLocaleString()}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-2">
          <div className={cn(
            "w-12 h-12 rounded-tr-2xl border-t-2 border-r-2",
            "opacity-10 group-hover:opacity-20",
            "transition-all duration-300",
            gradient.includes("rose") ? "border-rose-500" :
            gradient.includes("sky") ? "border-sky-500" :
            gradient.includes("violet") ? "border-violet-500" :
            gradient.includes("emerald") ? "border-emerald-500" :
            gradient.includes("amber") ? "border-amber-500" :
            gradient.includes("fuchsia") ? "border-fuchsia-500" :
            gradient.includes("cyan") ? "border-cyan-500" :
            "border-indigo-500"
          )} />
        </div>
        <div className="absolute bottom-0 left-0 p-2">
          <div className={cn(
            "w-12 h-12 rounded-bl-2xl border-b-2 border-l-2",
            "opacity-10 group-hover:opacity-20",
            "transition-all duration-300",
            gradient.includes("rose") ? "border-rose-500" :
            gradient.includes("sky") ? "border-sky-500" :
            gradient.includes("violet") ? "border-violet-500" :
            gradient.includes("emerald") ? "border-emerald-500" :
            gradient.includes("amber") ? "border-amber-500" :
            gradient.includes("fuchsia") ? "border-fuchsia-500" :
            gradient.includes("cyan") ? "border-cyan-500" :
            "border-indigo-500"
          )} />
        </div>
      </div>
    </motion.div>
  );
};

export default function Counter() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className="py-20 sm:py-32 relative overflow-hidden">
        {/* Background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        
        {/* Content */}
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} {...stat} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
