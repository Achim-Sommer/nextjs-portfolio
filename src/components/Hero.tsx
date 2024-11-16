'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import Particles from './ui/particles';
import dynamic from 'next/dynamic';

const BinaryBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-xs text-blue-500 animate-float whitespace-nowrap"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          {Array.from({ length: 20 }).map(() => Math.round(Math.random())).join('')}
        </div>
      ))}
    </div>
  );
};

const ClientBinaryBackground = dynamic(() => Promise.resolve(BinaryBackground), {
  ssr: false
});

const Hero: React.FC = () => {
  const [hasAnimated, setHasAnimated] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !hasAnimated) {
      const animated = sessionStorage.getItem('hasAnimated');
      if (animated !== 'true') {
        sessionStorage.setItem('hasAnimated', 'true');
        setHasAnimated(true);
      }
    }
  }, [hasAnimated]);

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-blue-950 to-black animate-gradient-xy overflow-hidden">
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 h-full w-12 border-r border-blue-500/10 flex flex-col items-end pr-2 pt-4 text-xs text-blue-500/40 select-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="leading-6">
              {(i + 1).toString().padStart(2, '0')}
            </div>
          ))}
        </div>

        {/* Code Comments */}
        <div className="absolute right-4 top-4 w-64 text-xs font-mono opacity-20">
          <div className="text-green-500">// TODO: Optimize performance</div>
          <div className="text-blue-500">interface Developer {'{'}</div>
          <div className="text-purple-500 pl-4">name: string;</div>
          <div className="text-purple-500 pl-4">skills: string[];</div>
          <div className="text-blue-500">{'}'}</div>
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-blue-950/30 border-t border-blue-500/20 flex items-center px-4 text-xs text-blue-400/60 justify-between">
          <div className="flex items-center space-x-4">
            <span>Ready</span>
            <span>UTF-8</span>
            <span>TypeScript React</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Ln 1, Col 1</span>
            <span>Spaces: 2</span>
            <span>Portfolio</span>
          </div>
        </div>

        {/* Tech Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,#1e3a8a20,transparent)]" />
          <div
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a8a' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.5
            }}
            className="absolute inset-0 backdrop-blur-[1px]"
          />
        </div>

        {/* Scanning Lines Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Horizontal Scanning Lines */}
          <div className="absolute h-[1px] w-full top-1/4 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan-x" />
          <div className="absolute h-[1px] w-full top-2/4 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan-x-reverse" />
          <div className="absolute h-[1px] w-full top-3/4 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan-x" />

          {/* Vertical Scanning Lines */}
          <div className="absolute w-[1px] h-full left-1/4 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan-y" />
          <div className="absolute w-[1px] h-full left-2/4 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan-y-reverse" />
          <div className="absolute w-[1px] h-full left-3/4 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan-y" />
        </div>

        {/* Corner Circuit Decorations */}
        <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-blue-500/30" />
        <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-blue-500/30" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-blue-500/30" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-blue-500/30" />

        {/* Terminal Window */}
        <div className="absolute top-4 left-16 w-72 bg-black/30 backdrop-blur-sm rounded border border-blue-500/20">
          <div className="h-6 bg-blue-950/30 border-b border-blue-500/20 flex items-center px-3">
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
          </div>
          <div className="p-3 text-xs text-blue-300/80 font-mono">
            <div>$ whoami</div>
            <div className="text-green-400/80">achim.sommer</div>
            <div>$ ls -la skills/</div>
            <div className="text-blue-400/80">
              drwxr-xr-x typescript<br />
              drwxr-xr-x react<br />
              drwxr-xr-x nextjs<br />
              drwxr-xr-x tailwind
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <TypewriterEffectSmooth 
              words={[
                { text: "Hi,", className: "text-blue-500" },
                { text: "I'm", className: "text-blue-500" },
                { text: "Achim", className: "text-blue-500" },
                { text: "Sommer", className: "text-blue-500" }
              ]} 
            />
            <HeroHighlight>
              <Highlight>Full Stack Developer</Highlight>
              <Highlight>UI/UX Designer</Highlight>
              <Highlight>Tech Enthusiast</Highlight>
            </HeroHighlight>
          </motion.div>
        </div>

        {/* Background Effects */}
        <Particles className="absolute inset-0" />
        <ClientBinaryBackground />
      </div>
    </div>
  );
};

export default Hero;
