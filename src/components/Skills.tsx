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
  { 
    name: "TypeScript", 
    icon: <SiTypescript className="text-3xl text-blue-500" />, 
    color: "from-blue-500/20 via-blue-500/10 to-transparent"
  },
  { 
    name: "React", 
    icon: <FaReact className="text-3xl text-cyan-500" />, 
    color: "from-cyan-500/20 via-cyan-500/10 to-transparent"
  },
  { 
    name: "Next.js", 
    icon: <SiNextdotjs className="text-3xl text-white" />, 
    color: "from-white/20 via-white/10 to-transparent"
  },
  { 
    name: "Django", 
    icon: <SiDjango className="text-3xl text-green-500" />, 
    color: "from-green-500/20 via-green-500/10 to-transparent"
  },
  { 
    name: "Tailwind CSS", 
    icon: <SiTailwindcss className="text-3xl text-teal-500" />, 
    color: "from-teal-500/20 via-teal-500/10 to-transparent"
  },
  { 
    name: "Node.js", 
    icon: <FaNodeJs className="text-3xl text-green-500" />, 
    color: "from-green-500/20 via-green-500/10 to-transparent"
  },
  { 
    name: "Lua", 
    icon: <SiLua className="text-3xl text-blue-500" />, 
    color: "from-blue-500/20 via-blue-500/10 to-transparent"
  },
  { 
    name: "JavaScript", 
    icon: <SiJavascript className="text-3xl text-yellow-500" />, 
    color: "from-yellow-500/20 via-yellow-500/10 to-transparent"
  },
  { 
    name: "Git", 
    icon: <FaGitAlt className="text-3xl text-orange-500" />, 
    color: "from-orange-500/20 via-orange-500/10 to-transparent"
  },
  { 
    name: "HTML5", 
    icon: <FaHtml5 className="text-3xl text-orange-600" />, 
    color: "from-orange-600/20 via-orange-600/10 to-transparent"
  },
  { 
    name: "CSS3", 
    icon: <FaCss3Alt className="text-3xl text-blue-600" />, 
    color: "from-blue-600/20 via-blue-600/10 to-transparent"
  },
  { 
    name: "SQL", 
    icon: <SiPostgresql className="text-3xl text-blue-400" />, 
    color: "from-blue-400/20 via-blue-400/10 to-transparent"
  },
];

const backendSkills = [
  { 
    name: "Express", 
    icon: <SiExpress className="text-3xl text-white" />, 
    color: "from-white/20 via-white/10 to-transparent"
  },
  { 
    name: "PostgreSQL", 
    icon: <SiPostgresql className="text-3xl text-blue-400" />, 
    color: "from-blue-400/20 via-blue-400/10 to-transparent"
  },
  { 
    name: "MongoDB", 
    icon: <SiMongodb className="text-3xl text-green-500" />, 
    color: "from-green-500/20 via-green-500/10 to-transparent"
  },
  { 
    name: "Docker", 
    icon: <SiDocker className="text-3xl text-blue-500" />, 
    color: "from-blue-500/20 via-blue-500/10 to-transparent"
  },
  { 
    name: "Git", 
    icon: <FaGitAlt className="text-3xl text-orange-500" />, 
    color: "from-orange-500/20 via-orange-500/10 to-transparent"
  },
  { 
    name: "Linux", 
    icon: <FaLinux className="text-3xl text-yellow-500" />, 
    color: "from-yellow-500/20 via-yellow-500/10 to-transparent"
  },
  { 
    name: "Django", 
    icon: <SiDjango className="text-3xl text-green-500" />, 
    color: "from-green-500/20 via-green-500/10 to-transparent"
  },
  { 
    name: "MySQL", 
    icon: <SiMysql className="text-3xl text-blue-500" />, 
    color: "from-blue-500/20 via-blue-500/10 to-transparent"
  },
  { 
    name: "REST APIs", 
    icon: <SiNextdotjs className="text-3xl text-gray-500" />, 
    color: "from-gray-500/20 via-gray-500/10 to-transparent"
  },
  { 
    name: "Windows", 
    icon: <FaWindows className="text-3xl text-blue-500" />, 
    color: "from-blue-500/20 via-blue-500/10 to-transparent"
  },
  { 
    name: "MacOS", 
    icon: <FaApple className="text-3xl text-gray-500" />, 
    color: "from-gray-500/20 via-gray-500/10 to-transparent"
  },
];

export default function Skills() {
  return (
    <section id="skills-section" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 bg-slate-900/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
      
      {/* Header mit max-w-7xl für Text-Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
      </div>

      {/* Cards Container ohne max-width für volle Breite */}
      <div className="relative w-full">
        <div className="flex flex-col gap-8">
          <div 
            className="w-full relative" 
            style={{ position: 'relative' }}
          >
            <InfiniteMovingCards
              items={skillsData.map(skill => ({
                ...skill,
                icon: <div className="flex items-center">{skill.icon}</div>
              }))}
              direction="left"
              speed="slow"
              className="py-4"
              showName={true}
            />
          </div>
          
          <div 
            className="w-full relative" 
            style={{ position: 'relative' }}
          >
            <InfiniteMovingCards
              items={backendSkills.map(skill => ({
                ...skill,
                icon: <div className="flex items-center">{skill.icon}</div>
              }))}
              direction="right"
              speed="normal"
              className="py-4"
              showName={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
