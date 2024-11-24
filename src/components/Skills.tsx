'use client';

import { AnimatedText } from "./ui/animated-text";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
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

// Dynamically import FixedSizeGrid with no SSR
const FixedSizeGrid = dynamic(
  () => import('react-window').then((mod) => mod.FixedSizeGrid),
  { ssr: false }
);

interface Skill {
  name: string;
  icon: JSX.Element;
  color: string;
}

interface SkillCardProps {
  skill: Skill;
}

const skillsData: Skill[] = [
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

const backendSkills: Skill[] = [
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

const MemoizedSkillCard = memo(({ skill }: SkillCardProps) => (
  <motion.div
    className={`relative flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-r ${skill.color}`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    {skill.icon}
    <span className="mt-2 text-sm font-medium">{skill.name}</span>
  </motion.div>
));

MemoizedSkillCard.displayName = 'MemoizedSkillCard';

const SkillsGrid = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const itemSize = 120;
  
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth - 32;
      const columnCount = Math.max(1, Math.floor(width / itemSize));
      const rowCount = Math.ceil(skillsData.length / columnCount);
      setDimensions({
        width: columnCount * itemSize,
        height: rowCount * itemSize
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const columnCount = Math.max(1, Math.floor(dimensions.width / itemSize));
  const rowCount = Math.ceil(skillsData.length / columnCount);

  if (dimensions.width === 0) {
    return null;
  }

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= skillsData.length) return null;
    
    return (
      <div style={style}>
        <MemoizedSkillCard skill={skillsData[index]} />
      </div>
    );
  };

  return (
    <FixedSizeGrid
      columnCount={columnCount}
      columnWidth={itemSize}
      height={dimensions.height}
      rowCount={rowCount}
      rowHeight={itemSize}
      width={dimensions.width}
    >
      {Cell}
    </FixedSizeGrid>
  );
};

const SkillsComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-10 bg-black">
      <div className="container mx-auto px-4">
        <AnimatedText text="Meine Skills" className="text-4xl font-bold text-center mb-10" />
        <div className="w-full flex justify-center min-h-[300px]">
          {isMounted ? (
            <SkillsGrid />
          ) : (
            <div className="w-full max-w-4xl h-[300px] bg-gray-800 animate-pulse rounded-lg" />
          )}
        </div>
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(SkillsComponent), { ssr: false });
