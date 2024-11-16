'use client';
import React from 'react';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';
import { FaGamepad, FaLinux, FaWindows, FaServer, FaDatabase, FaGlobe, FaGlobeEurope, FaShieldAlt } from 'react-icons/fa';
import Image from 'next/image';

const hostingProducts = [
  {
    name: 'Gameserver',
    icon: <div className="flex items-center gap-4">
      <FaGamepad className="text-3xl text-[#57BB54]" />
      <div>
        <p className="text-sm font-medium">ab 2,76€/Monat</p>
        <p className="text-xs text-[#57BB54]">oder 45,00€ Lifetime</p>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'Linux vServer',
    icon: <div className="flex items-center gap-4">
      <FaLinux className="text-3xl text-[#57BB54]" />
      <div>
        <p className="text-sm font-medium">ab 7,90€/Monat</p>
        <p className="text-xs text-[#57BB54]">oder 79,00€ Lifetime</p>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'Windows vServer',
    icon: <div className="flex items-center gap-4">
      <FaWindows className="text-3xl text-[#57BB54]" />
      <div>
        <p className="text-sm font-medium">ab 9,90€/Monat</p>
        <p className="text-xs text-[#57BB54]">oder 99,00€ Lifetime</p>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'Linux Rootserver',
    icon: <div className="flex items-center gap-4">
      <FaServer className="text-3xl text-[#57BB54]" />
      <div>
        <p className="text-sm font-medium">ab 12,90€/Monat</p>
        <p className="text-xs text-[#57BB54]">oder 154,80€ Lifetime</p>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'Dedicated Server',
    icon: <div className="flex items-center gap-4">
      <FaDatabase className="text-3xl text-[#57BB54]" />
      <div>
        <p className="text-sm font-medium">ab 41,53€/Monat</p>
        <p className="text-xs text-[#57BB54]">oder 498,32€ Lifetime</p>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'Webspace',
    icon: <div className="flex items-center gap-4">
      <FaGlobe className="text-3xl text-[#57BB54]" />
      <div>
        <p className="text-sm font-medium">ab 3,90€/Monat</p>
        <p className="text-xs text-[#57BB54]">oder 46,80€ Lifetime</p>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'Domains',
    icon: <div className="flex items-center gap-4">
      <FaGlobeEurope className="text-3xl text-[#57BB54]" />
      <div>
        <p className="text-sm font-medium">ab 7,90€/Monat</p>
        <p className="text-xs text-[#57BB54]">Verschiedene TLDs</p>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'Plesk Lizenz',
    icon: <div className="flex items-center gap-4">
      <FaShieldAlt className="text-3xl text-[#57BB54]" />
      <div>
        <p className="text-sm font-medium">ab 8,49€/Monat</p>
        <p className="text-xs text-[#57BB54]">Professionelles Hosting</p>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  }
];

export default function ZapHosting() {
  return (
    <section className="relative py-4 bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900" />
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Header Section - Centered with max-width */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <div className="inline-block mb-3">
              <a href="https://zap-hosting.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-[300px] transform transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(87,187,84,0.3)]">
                <Image
                  src="/img/zap-hosting-logo.png"
                  alt="Zap-Hosting Logo"
                  width={300}
                  height={90}
                  className="w-full h-auto"
                  priority
                />
              </a>
            </div>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Professionelles Hosting mit einzigartiger Lifetime-Option. 
              Sparen Sie langfristig mit unseren Lifetime-Angeboten - einmalig zahlen, für immer nutzen!
            </p>
          </div>
        </div>

        {/* Products Showcase - Full Width */}
        <div className="w-full overflow-hidden my-4">
          <div className="relative w-full">
            <InfiniteMovingCards
              items={hostingProducts}
              direction="right"
              speed="slow"
            />
          </div>
        </div>

        {/* CTA Section - Centered with max-width */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mt-4">
            <a
              href="https://zap-hosting.com/achim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-1.5 border border-[#57BB54] text-base font-medium rounded-md text-white bg-[#57BB54] hover:bg-[#57BB54]/90 hover:border-[#57BB54]/90 transition-colors duration-300"
            >
              Jetzt bei Zap-Hosting bestellen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
