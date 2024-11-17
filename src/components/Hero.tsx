'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import dynamic from 'next/dynamic';
import Particles from './ui/particles';

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
          {Math.random() > 0.5 ? '1' : '0'}
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
    <section id="top" className="relative min-h-screen bg-black overflow-hidden">
      <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-blue-950 to-black animate-gradient-xy">
        <Particles className="absolute inset-0" />
        
        {/* Background Effects */}
        <ClientBinaryBackground />

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

        {/* Line Numbers - Only in Hero section */}
        <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-blue-500/10 flex flex-col items-end pr-2 pt-4 text-xs text-blue-500/40 select-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="leading-[1.65rem]">
              {(i + 1).toString().padStart(2, '0')}
            </div>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="absolute top-4 left-16 w-80 bg-black/30 backdrop-blur-sm rounded border border-blue-500/20">
          <div className="h-6 bg-blue-950/30 border-b border-blue-500/20 flex items-center px-3">
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <div className="flex-1 text-center text-xs text-blue-300/50">terminal</div>
          </div>
          <div className="p-3 text-xs font-mono">
            <div className="flex items-center text-blue-300/80">
              <span className="text-green-400/80">➜</span>
              <span className="text-blue-400/80 ml-2">~/portfolio</span>
              <span className="text-blue-300/60 ml-2">git:(</span>
              <span className="text-blue-400/80">main</span>
              <span className="text-blue-300/60">)</span>
            </div>
            <div className="mt-2">
              <span className="text-blue-300/80">$</span>
              <span className="text-blue-300/80 ml-2">whoami</span>
            </div>
            <div className="text-green-400/80">achim.sommer</div>
            <div className="mt-2">
              <span className="text-blue-300/80">$</span>
              <span className="text-blue-300/80 ml-2">cat about.md</span>
            </div>
            <div className="text-blue-300/80 mt-1">
              <span className="text-yellow-500/80">### About Me</span>
              <div className="pl-2 mt-1">
                <div>• Dualer Student @ FOM Köln</div>
                <div>• Full Stack Developer</div>
                <div>• Tech Content Creator</div>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-blue-300/80">$</span>
              <span className="text-blue-300/80 ml-2">ls -la skills/</span>
            </div>
            <div className="text-blue-300/80 grid grid-cols-2 gap-x-4 pl-2 mt-1">
              <div>
                <span className="text-blue-400/80">drwxr-xr-x</span>
                <span className="ml-2">typescript</span>
              </div>
              <div>
                <span className="text-blue-400/80">drwxr-xr-x</span>
                <span className="ml-2">react</span>
              </div>
              <div>
                <span className="text-blue-400/80">drwxr-xr-x</span>
                <span className="ml-2">nextjs</span>
              </div>
              <div>
                <span className="text-blue-400/80">drwxr-xr-x</span>
                <span className="ml-2">tailwind</span>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-blue-300/80">$</span>
              <span className="ml-2 w-2 h-4 bg-blue-500/50 animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Code Comments */}
        <div className="absolute right-4 top-4 w-64 text-xs font-mono opacity-20">
          <div className="text-blue-300/80">// portfolio.config.ts</div>
          <div className="text-green-500/80">/** 
           * @author Achim Sommer
           * @version 1.0.0 
           */</div>
          <div className="mt-2 text-blue-500">interface Developer {'{'}</div>
          <div className="pl-4">
            <div className="text-purple-500">name: string;</div>
            <div className="text-purple-500">role: string;</div>
            <div className="text-purple-500">skills: string[];</div>
            <div className="text-purple-500">location: string;</div>
          </div>
          <div className="text-blue-500">{'}'}</div>
          <div className="mt-2">
            <div className="text-blue-500">const developer: Developer = {'{'}</div>
            <div className="pl-4">
              <div className="text-orange-400">name: <span className="text-green-400">"Achim Sommer"</span>,</div>
              <div className="text-orange-400">role: <span className="text-green-400">"Full Stack Developer"</span>,</div>
              <div className="text-orange-400">skills: [</div>
              <div className="pl-4">
                <div className="text-green-400">"TypeScript",</div>
                <div className="text-green-400">"React",</div>
                <div className="text-green-400">"Next.js",</div>
                <div className="text-green-400">"Node.js"</div>
              </div>
              <div className="text-orange-400">],</div>
              <div className="text-orange-400">location: <span className="text-green-400">"Köln, DE"</span></div>
            </div>
            <div className="text-blue-500">{'}'}</div>
          </div>
          <div className="mt-2 text-blue-300/80">// TODO: Add more awesome features</div>
        </div>

        {/* Main Content */}
        <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-block">
              <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                <TypewriterEffectSmooth
                  words={[
                    { text: "Hey", className: "text-white" },
                    { text: "ich", className: "text-white" },
                    { text: "bin", className: "text-white" },
                    { text: "Achim", className: "text-white" }
                  ]}
                  cursorClassName="h-[36px] w-[4px] md:h-[48px] lg:h-[56px] translate-x-8"
                  className="min-h-[60px] md:min-h-[72px] lg:min-h-[84px]"
                />
              </h1>
            </div>

            <HeroHighlight>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-2xl px-4 md:text-4xl font-bold text-white leading-relaxed text-center mx-auto"
              >
                <Highlight>
                  Dualer Student, Full Stack Developer und YouTuber
                </Highlight>
              </motion.h2>
            </HeroHighlight>

            <div className="flex flex-col items-center mt-8">
              <motion.button
                onClick={() => {
                  const aboutSection = document.getElementById('about-me');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: [0, 10, 0],
                  transition: {
                    y: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
                className="cursor-pointer hover:opacity-75 transition-opacity"
              >
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
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
      </div>
    </section>
  );
};

export default Hero;
