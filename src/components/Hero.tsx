'use client';
import { motion } from 'framer-motion';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import Particles from './ui/particles';
import { GlowingStarsBackgroundCard } from './ui/glowing-stars';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [hasAnimated, setHasAnimated] = useState(() => {
    if (typeof window !== 'undefined') {
      const animated = sessionStorage.getItem('hasAnimated');
      return animated === 'true';
    }
    return false;
  });
  
  useEffect(() => {
    if (!hasAnimated) {
      sessionStorage.setItem('hasAnimated', 'true');
      setHasAnimated(true);
    }
  }, []);

  return (
    <GlowingStarsBackgroundCard>
      <div className="relative min-h-screen w-full">
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center">
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
                    {
                      text: "Hi",
                      className: "text-white"
                    },
                    {
                      text: "ich",
                      className: "text-white"
                    },
                    {
                      text: "bin",
                      className: "text-white"
                    },
                    {
                      text: "Achim",
                      className: "text-white"
                    }
                  ]}
                  cursorClassName="h-[36px] w-[4px] md:h-[48px] lg:h-[56px]"
                  className="min-h-[60px] md:min-h-[72px] lg:min-h-[84px]"
                />
              </h1>
            </div>
            
            <HeroHighlight>
            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="text-2xl px-4 md:text-4xl font-bold text-white leading-relaxed text-center mx-auto"
            >
                <Highlight>
                  Dualer Student, Full Stack Developer und YouTuber
                </Highlight>
              </motion.h2>
            </HeroHighlight>
          </motion.div>
          
          <div className="flex flex-col items-center mt-8">
            <motion.div 
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
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                });
              }}
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </GlowingStarsBackgroundCard>
  );
}
