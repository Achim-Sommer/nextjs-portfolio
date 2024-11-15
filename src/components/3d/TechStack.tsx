'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Technology {
  name: string;
  icon: string;
  color: string;
}

const technologies: Technology[] = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', icon: '📘', color: '#3178C6' },
  { name: 'Next.js', icon: '▲', color: '#000000' },
  { name: 'Node.js', icon: '🟢', color: '#339933' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'JavaScript', icon: '💛', color: '#F7DF1E' },
  { name: 'HTML5', icon: '🌐', color: '#E34F26' },
  { name: 'CSS3', icon: '🎨', color: '#1572B6' },
  { name: 'Git', icon: '📦', color: '#F05032' },
  { name: 'Docker', icon: '🐳', color: '#2496ED' },
];

export default function TechStack() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      
      {technologies.map((tech, index) => {
        const x = Math.sin(index * (Math.PI * 2 / technologies.length)) * 200;
        const y = Math.cos(index * (Math.PI * 2 / technologies.length)) * 200;
        
        return (
          <motion.div
            key={tech.name}
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md"
            style={{
              boxShadow: `0 0 20px ${tech.color}33`,
              border: `1px solid ${tech.color}66`,
            }}
            animate={{
              x: x + (mousePosition.x - window.innerWidth / 2) * 0.05,
              y: y + (mousePosition.y - window.innerHeight / 2) * 0.05,
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <div className="text-center">
              <div className="text-2xl">{tech.icon}</div>
              <div className="mt-1 text-xs font-medium text-white/80">{tech.name}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
