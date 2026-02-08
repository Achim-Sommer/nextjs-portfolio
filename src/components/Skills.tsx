'use client';

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaHtml5, 
  FaCss3Alt
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiDjango, 
  SiTailwindcss, 
  SiJavascript, 
  SiPostgresql, 
  SiMysql, 
  SiMongodb, 
  SiDocker,
  SiExpress
} from 'react-icons/si';

const InfiniteMovingCards = dynamic(() => import('./ui/infinite-moving-cards').then(mod => mod.InfiniteMovingCards), {
  ssr: false,
  loading: () => <div className="h-[200px] w-full bg-slate-900/50 rounded-xl animate-pulse" />
});

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
    name: "PostgreSQL", 
    icon: <SiPostgresql className="text-3xl text-blue-400" />, 
    color: "from-blue-400/20 via-blue-400/10 to-transparent"
  },
  { 
    name: "MySQL", 
    icon: <SiMysql className="text-3xl text-blue-500" />, 
    color: "from-blue-500/20 via-blue-500/10 to-transparent"
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
    name: "Express", 
    icon: <SiExpress className="text-3xl text-white" />, 
    color: "from-white/20 via-white/10 to-transparent"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-32 bg-black">
      {/* Header Content mit max-w */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
            Technologien & Skills
          </h2>
          <p className="text-lg text-gray-400">
            Die wichtigsten Technologien und Tools, mit denen ich arbeite
          </p>
        </motion.div>
      </div>

      {/* Cards Container ohne max-width für volle Breite */}
      <div className="relative w-full">
        <div className="w-full relative space-y-8">
          <InfiniteMovingCards
            items={skillsData}
            direction="left"
            speed="slow"
            className="py-4"
            showName={true}
            cardClassName="w-[300px] md:w-[400px]"
          />
          <InfiniteMovingCards
            items={skillsData.slice().reverse()}
            direction="right"
            speed="slow"
            className="py-4"
            showName={true}
            cardClassName="w-[300px] md:w-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
