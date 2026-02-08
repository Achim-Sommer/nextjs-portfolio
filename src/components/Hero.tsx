'use client';

import * as React from 'react';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback, useRef } from 'react';

// Inline Typewriter – kein separater Import, kein framer-motion
const InlineTypewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(i);
      if (i >= text.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [started, text]);

  return (
    <span ref={ref} className="inline-flex items-center">
      {text.split('').map((ch, idx) => (
        <span
          key={idx}
          className={`inline-block transition-opacity duration-75 ${idx < displayed ? 'opacity-100' : 'opacity-0'}`}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
      <span className="inline-block w-[2px] h-[1.1em] bg-white ml-0.5 animate-cursor-blink" />
    </span>
  );
};

// Lazy load Particles
const Particles = dynamic(() => import('./ui/particles'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />
});

const BinaryBackground = () => (
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

const LazyBinaryBackground = dynamic(() => Promise.resolve(BinaryBackground), {
  ssr: false,
  loading: () => null
});

// Optimierte Terminal-Komponente
const TerminalWindow = () => (
  <div className="hidden md:block absolute top-4 left-4 md:left-16 w-[calc(100%-2rem)] md:w-80 bg-black/30 backdrop-blur-sm rounded border border-blue-500/20 z-20">
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
      <div className="text-green-400/80">### About Me</div>
      <div className="text-green-400/80">• Dualer Student @ FOM Köln</div>
      <div className="text-green-400/80">• Full Stack Developer</div>
      <div className="text-green-400/80">• Tech Content Creator</div>
    </div>
  </div>
);

const LazyTerminal = dynamic(() => Promise.resolve(TerminalWindow), {
  ssr: true
});

// Line Numbers Komponente
const LineNumbers = () => (
  <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-blue-500/10 flex flex-col items-end pr-2 pt-4 text-xs text-blue-500/40 select-none hidden md:flex">
    {Array.from({ length: 100 }).map((_, i) => (
      <div key={i} className="leading-[1.65rem]">
        {(i + 1).toString().padStart(2, '0')}
      </div>
    ))}
  </div>
);

const LazyLineNumbers = dynamic(() => Promise.resolve(LineNumbers), {
  ssr: true
});

const Hero: React.FC = () => {
  return (
    <section id="top" className="relative min-h-screen bg-black overflow-hidden">
      <div 
        className="relative min-h-screen w-full bg-gradient-to-br from-black via-blue-950 to-black"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Hauptinhalt mit höchster Priorität */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <div className="inline-block">
              <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                {/* Conditional Rendering basierend auf Bildschirmgröße */}
                <span className="block sm:hidden text-white">
                  Hey, ich bin Achim
                </span>
                <span className="hidden sm:block text-white">
                  <InlineTypewriter text="Hey, ich bin Achim" />
                </span>
              </h1>
            </div>

            <HeroHighlight>
              <h2
                className="hero-title text-2xl px-4 md:text-4xl font-bold text-white leading-relaxed text-center mx-auto"
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)'
                }}
              >
                <Highlight>
                Wirtschaftsinformatik (B.Sc.)
                </Highlight>
              </h2>
            </HeroHighlight>

            <div className="flex flex-col items-center mt-8">
              <button
                onClick={() => {
                  const aboutSection = document.getElementById('about-me');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="cursor-pointer hover:opacity-75 transition-opacity motion-safe:animate-bounce"
                aria-label="Zum About Me Bereich scrollen"
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
              </button>
            </div>
          </div>
        </div>

        {/* Hintergrund-Effekte mit niedrigerer Priorität */}
        <div className="absolute inset-0 z-0">
          {/* Particles nur auf Desktop laden */}
          <div className="hidden md:block">
            <Particles className="absolute inset-0" />
          </div>
          {/* BinaryBackground nur auf Desktop laden */}
          <div className="hidden md:block">
            <LazyBinaryBackground />
          </div>
        </div>

        {/* Terminal und Line Numbers */}
        <LazyTerminal />
        <LazyLineNumbers />

        {/* Tech Grid Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,#1e3a8a20,transparent)]" />
          <div
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a8a' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.5
            }}
            className="absolute inset-0 backdrop-blur-[1px]"
          />
        </div>

        {/* Scanning Lines */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Horizontal Lines */}
          <div className="absolute h-[1px] w-full top-1/4 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan-x" />
          <div className="absolute h-[1px] w-full top-2/4 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan-x-reverse" />
          <div className="absolute h-[1px] w-full top-3/4 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan-x" />
          
          {/* Vertical Lines */}
          <div className="absolute w-[1px] h-full left-1/4 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan-y" />
          <div className="absolute w-[1px] h-full left-2/4 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan-y-reverse" />
          <div className="absolute w-[1px] h-full left-3/4 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan-y" />
        </div>

        {/* Code Comments */}
        <div className="absolute right-4 top-24 md:top-4 w-[calc(100%-2rem)] md:w-64 text-xs font-mono opacity-20 z-10 hidden md:block">
          <div className="text-blue-300/80">{'// portfolio.config.ts'}</div>
          <div className="text-green-500/80">{'/** '}
           * @author Achim Sommer
           * @version 1.0.0 
           {'*/'}</div>
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
          <div className="mt-2 text-blue-300/80">{'// TODO: Add more awesome features'}</div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-12 md:w-24 h-12 md:h-24 border-l-2 border-t-2 border-blue-500/30" />
        <div className="absolute top-0 right-0 w-12 md:w-24 h-12 md:h-24 border-r-2 border-t-2 border-blue-500/30" />
        <div className="absolute bottom-0 left-0 w-12 md:w-24 h-12 md:h-24 border-l-2 border-b-2 border-blue-500/30" />
        <div className="absolute bottom-0 right-0 w-12 md:w-24 h-12 md:h-24 border-r-2 border-b-2 border-blue-500/30" />

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
