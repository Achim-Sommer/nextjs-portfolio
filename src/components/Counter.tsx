'use client';
import { motion } from "framer-motion";
import { AnimatedCounter } from "./ui/animated-counter";
import { cn } from "@/utils/cn";
import { 
  FaYoutube, 
  FaVideo, 
  FaCommentAlt, 
  FaInstagram, 
  FaGlobeEurope, 
  FaDiscord, 
  FaClock, 
  FaUsers 
} from "react-icons/fa";

const stats = [
  {
    value: 8444,
    label: "YouTube Abonnenten",
    icon: FaUsers,
    gradient: "from-red-500 via-red-400 to-red-500"
  },
  {
    value: 3500000,
    label: "YouTube Views",
    icon: FaYoutube,
    gradient: "from-blue-500 via-blue-400 to-blue-500"
  },
  {
    value: 420,
    label: "Videos",
    icon: FaVideo,
    gradient: "from-purple-500 via-purple-400 to-purple-500"
  },
  {
    value: 88000,
    label: "YouTube Kommentare",
    icon: FaCommentAlt,
    gradient: "from-green-500 via-green-400 to-green-500"
  },
  {
    value: 198500,
    label: "Watch Time (Stunden)",
    icon: FaClock,
    gradient: "from-yellow-500 via-yellow-400 to-yellow-500"
  },
  {
    value: 1850,
    label: "Instagram Follower",
    icon: FaInstagram,
    gradient: "from-pink-500 via-pink-400 to-pink-500"
  },
  {
    value: 8200,
    label: "Forum Mitglieder",
    icon: FaGlobeEurope,
    gradient: "from-indigo-500 via-indigo-400 to-indigo-500"
  },
  {
    value: 3700,
    label: "Discord Mitglieder",
    icon: FaDiscord,
    gradient: "from-violet-500 via-violet-400 to-violet-500"
  }
];

export default function Counter() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      
      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Card Background */}
                <div className="absolute inset-0 rounded-2xl bg-white/[0.02] backdrop-blur-sm" />
                <div className={cn(
                  "absolute inset-px rounded-[15px] bg-gradient-to-b",
                  "from-white/10 to-white/5"
                )} />
                
                {/* Card Content */}
                <div className="relative rounded-2xl p-8">
                  {/* Icon with glow */}
                  <div className="mb-4 inline-block relative">
                    <stat.icon className="text-4xl relative z-10" />
                    <div className="absolute inset-0 blur-sm opacity-50">
                      <stat.icon className="text-4xl" />
                    </div>
                  </div>
                  
                  {/* Counter */}
                  <div className={cn(
                    "font-bold text-4xl bg-gradient-to-r bg-clip-text text-transparent",
                    stat.gradient
                  )}>
                    <AnimatedCounter 
                      value={stat.value} 
                      duration={2000} 
                    />
                  </div>
                  
                  {/* Label */}
                  <p className="mt-2 text-base text-gray-400">{stat.label}</p>
                  
                  {/* Hover Effects */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
