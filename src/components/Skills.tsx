'use client';
import { AnimatedText } from "./ui/animated-text";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const skillsData = [
  { name: "TypeScript", icon: "⚡", color: "from-blue-500 to-blue-600" },
  { name: "React", icon: "⚛️", color: "from-cyan-500 to-cyan-600" },
  { name: "Next.js", icon: "🔲", color: "from-white to-gray-200" },
  { name: "Django", icon: "🐍", color: "from-green-500 to-green-600" },
  { name: "Tailwind CSS", icon: "🎨", color: "from-teal-500 to-teal-600" },
  { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-500" },
  { name: "Lua", icon: "🌙", color: "from-blue-400 to-blue-500" },
  { name: "JavaScript", icon: "💛", color: "from-yellow-400 to-yellow-500" },
  { name: "Git", icon: "🔄", color: "from-orange-500 to-orange-600" },
  { name: "HTML5", icon: "🌐", color: "from-red-500 to-red-600" },
  { name: "CSS3", icon: "🎯", color: "from-blue-600 to-blue-700" },
  { name: "SQL", icon: "📊", color: "from-purple-500 to-purple-600" },
];

const backendSkills = [
  { name: "Node.js", icon: "🚀", color: "from-green-500 to-green-600" },
  { name: "Express", icon: "⚡", color: "from-gray-400 to-gray-500" },
  { name: "Django", icon: "🎯", color: "from-green-600 to-green-700" },
  { name: "PostgreSQL", icon: "🐘", color: "from-blue-400 to-blue-500" },
  { name: "MySQL", icon: "💾", color: "from-orange-400 to-orange-500" },
  { name: "MongoDB", icon: "🍃", color: "from-green-400 to-green-500" },
  { name: "REST APIs", icon: "🔌", color: "from-purple-400 to-purple-500" },
  { name: "Git", icon: "📚", color: "from-orange-500 to-orange-600" },
  { name: "Docker", icon: "🐳", color: "from-blue-500 to-blue-600" },
  { name: "Linux", icon: "🐧", color: "from-yellow-600 to-yellow-700" },
  { name: "Windows", icon: "🪟", color: "from-blue-600 to-blue-700" },
  { name: "MacOS", icon: "🍎", color: "from-gray-600 to-gray-700" },
];

export default function Skills() {
  return (
    <section id="skills-section" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 bg-slate-900/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
      
      <div className="relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-7xl px-4 sm:px-6"
          >
            <AnimatedText
              text="Technologien & Skills"
              className="text-4xl font-bold mb-4"
              gradient
            />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Die wichtigsten Technologien und Tools, mit denen ich arbeite
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-24">
          <div className="w-full overflow-hidden">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Frontend & Full-Stack</h3>
            <InfiniteMovingCards
              items={skillsData}
              direction="left"
              speed="slow"
              className="py-4"
            />
          </div>
          
          <div className="w-full overflow-hidden">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Backend & DevOps</h3>
            <InfiniteMovingCards
              items={backendSkills}
              direction="right"
              speed="normal"
              className="py-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
