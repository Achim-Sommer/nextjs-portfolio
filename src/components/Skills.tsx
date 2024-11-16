'use client';
import { AnimatedText } from "./ui/animated-text";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaHtml5, 
  FaCss3Alt, 
  FaLinux, 
  FaWindows, 
  FaApple 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiDjango, 
  SiTailwindcss, 
  SiLua, 
  SiJavascript, 
  SiPostgresql, 
  SiMysql, 
  SiMongodb, 
  SiDocker,
  SiExpress
} from 'react-icons/si';
import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  "TypeScript": SiTypescript,
  "React": FaReact,
  "Next.js": SiNextdotjs,
  "Django": SiDjango,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": FaNodeJs,
  "Lua": SiLua,
  "JavaScript": SiJavascript,
  "Git": FaGitAlt,
  "HTML5": FaHtml5,
  "CSS3": FaCss3Alt,
  "SQL": SiPostgresql,
  "Express": SiExpress,
  "PostgreSQL": SiPostgresql,
  "MySQL": SiMysql,
  "MongoDB": SiMongodb,
  "REST APIs": SiNextdotjs,
  "Docker": SiDocker,
  "Linux": FaLinux,
  "Windows": FaWindows,
  "MacOS": FaApple
};

const skillsData = [
  { name: "TypeScript", icon: SiTypescript, color: "from-blue-500 to-blue-600" },
  { name: "React", icon: FaReact, color: "from-cyan-500 to-cyan-600" },
  { name: "Next.js", icon: SiNextdotjs, color: "from-white to-gray-200" },
  { name: "Django", icon: SiDjango, color: "from-green-500 to-green-600" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "from-teal-500 to-teal-600" },
  { name: "Node.js", icon: FaNodeJs, color: "from-green-400 to-green-500" },
  { name: "Lua", icon: SiLua, color: "from-blue-400 to-blue-500" },
  { name: "JavaScript", icon: SiJavascript, color: "from-yellow-400 to-yellow-500" },
  { name: "Git", icon: FaGitAlt, color: "from-orange-500 to-orange-600" },
  { name: "HTML5", icon: FaHtml5, color: "from-red-500 to-red-600" },
  { name: "CSS3", icon: FaCss3Alt, color: "from-blue-600 to-blue-700" },
  { name: "SQL", icon: SiPostgresql, color: "from-purple-500 to-purple-600" },
];

const backendSkills = [
  { name: "Node.js", icon: FaNodeJs, color: "from-green-500 to-green-600" },
  { name: "Express", icon: SiExpress, color: "from-gray-400 to-gray-500" },
  { name: "Django", icon: SiDjango, color: "from-green-600 to-green-700" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "from-blue-400 to-blue-500" },
  { name: "MySQL", icon: SiMysql, color: "from-orange-400 to-orange-500" },
  { name: "MongoDB", icon: SiMongodb, color: "from-green-400 to-green-500" },
  { name: "REST APIs", icon: SiNextdotjs, color: "from-purple-400 to-purple-500" },
  { name: "Git", icon: FaGitAlt, color: "from-orange-500 to-orange-600" },
  { name: "Docker", icon: SiDocker, color: "from-blue-500 to-blue-600" },
  { name: "Linux", icon: FaLinux, color: "from-yellow-600 to-yellow-700" },
  { name: "Windows", icon: FaWindows, color: "from-blue-600 to-blue-700" },
  { name: "MacOS", icon: FaApple, color: "from-gray-600 to-gray-700" },
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
              items={skillsData.map(skill => ({
                ...skill,
                icon: <skill.icon className="text-4xl" />
              }))}
              direction="left"
              speed="slow"
              className="py-4"
            />
          </div>
          
          <div className="w-full overflow-hidden">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Backend & DevOps</h3>
            <InfiniteMovingCards
              items={backendSkills.map(skill => ({
                ...skill,
                icon: <skill.icon className="text-4xl" />
              }))}
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
