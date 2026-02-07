'use client';
import React from 'react';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';
import { FaGamepad, FaLinux, FaWindows, FaServer, FaDatabase, FaGlobe, FaGlobeEurope, FaShieldAlt } from 'react-icons/fa';
import Image from 'next/image';

const hostingProducts = [
  {
    name: 'gameserver',
    icon: <div className="flex flex-col items-start gap-3">
      <p className="text-xl font-bold text-[#57BB54]">Gameserver</p>
      <div className="flex items-center gap-6">
        <FaGamepad className="text-4xl text-[#57BB54]" />
        <div>
          <p className="text-base font-medium">ab 2,76€/Monat</p>
          <p className="text-sm text-[#57BB54]">oder 45,00€ Lifetime</p>
        </div>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'linux-vserver',
    icon: <div className="flex flex-col items-start gap-3">
      <p className="text-xl font-bold text-[#57BB54]">Linux vServer</p>
      <div className="flex items-center gap-6">
        <FaLinux className="text-4xl text-[#57BB54]" />
        <div>
          <p className="text-base font-medium">ab 7,90€/Monat</p>
          <p className="text-sm text-[#57BB54]">oder 64,00€ Lifetime</p>
        </div>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'windows-vserver',
    icon: <div className="flex flex-col items-start gap-3">
      <p className="text-xl font-bold text-[#57BB54]">Windows vServer</p>
      <div className="flex items-center gap-6">
        <FaWindows className="text-4xl text-[#57BB54]" />
        <div>
          <p className="text-base font-medium">ab 9,90€/Monat</p>
          <p className="text-sm text-[#57BB54]">oder 99,00€ Lifetime</p>
        </div>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'linux-rootserver',
    icon: <div className="flex flex-col items-start gap-3">
      <p className="text-xl font-bold text-[#57BB54]">Linux Rootserver</p>
      <div className="flex items-center gap-6">
        <FaServer className="text-4xl text-[#57BB54]" />
        <div>
          <p className="text-base font-medium">ab 12,90€/Monat</p>
          <p className="text-sm text-[#57BB54]">oder 154,80€ Lifetime</p>
        </div>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'dedicated-server',
    icon: <div className="flex flex-col items-start gap-3">
      <p className="text-xl font-bold text-[#57BB54]">Dedicated Server</p>
      <div className="flex items-center gap-6">
        <FaDatabase className="text-4xl text-[#57BB54]" />
        <div>
          <p className="text-base font-medium">ab 41,53€/Monat</p>
          <p className="text-sm text-[#57BB54]">oder 498,32€ Lifetime</p>
        </div>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'webspace',
    icon: <div className="flex flex-col items-start gap-3">
      <p className="text-xl font-bold text-[#57BB54]">Webspace</p>
      <div className="flex items-center gap-6">
        <FaGlobe className="text-4xl text-[#57BB54]" />
        <div>
          <p className="text-base font-medium">ab 3,90€/Monat</p>
          <p className="text-sm text-[#57BB54]">oder 46,80€ Lifetime</p>
        </div>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'domains',
    icon: <div className="flex flex-col items-start gap-3">
      <p className="text-xl font-bold text-[#57BB54]">Domains</p>
      <div className="flex items-center gap-6">
        <FaGlobeEurope className="text-4xl text-[#57BB54]" />
        <div>
          <p className="text-base font-medium">ab 7,90€/Monat</p>
          <p className="text-sm text-[#57BB54]">Verschiedene TLDs</p>
        </div>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  },
  {
    name: 'plesk-lizenz',
    icon: <div className="flex flex-col items-start gap-3">
      <p className="text-xl font-bold text-[#57BB54]">Plesk Lizenz</p>
      <div className="flex items-center gap-6">
        <FaShieldAlt className="text-4xl text-[#57BB54]" />
        <div>
          <p className="text-base font-medium">ab 8,49€/Monat</p>
          <p className="text-sm text-[#57BB54]">Professionelles Hosting</p>
        </div>
      </div>
    </div>,
    color: 'from-[#57BB54]/20 via-[#57BB54]/10 to-transparent'
  }
];

export default function ZapHosting() {
  return (
    <section className="relative py-20 sm:py-32 bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900" />
      
      {/* Header Content mit max-w */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 mb-16">
        <div className="text-center">
          <div className="inline-block mb-4">
            <a 
              href="https://zap-hosting.com/achim" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block transform transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(87,187,84,0.3)]"
            >
              <Image
                src="/img/zap-hosting-logo.png"
                alt="ZAP-Hosting Logo"
                width={300}
                height={90}
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </a>
          </div>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Professionelles Hosting mit einzigartiger Lifetime-Option. 
            Spare langfristig mit dem Lifetime-Angeboten - einmalig zahlen, für immer nutzen!
          </p>
        </div>
      </div>

      {/* Cards Container ohne max-width für volle Breite */}
      <div className="relative w-full">
        <div 
          className="w-full relative" 
          style={{ position: 'relative' }}
        >
          <InfiniteMovingCards
            items={hostingProducts}
            speed="slow"
            direction="right"
            cardClassName="w-[500px] md:w-[700px]"
          />
        </div>
      </div>

      {/* Button Container mit max-w */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 mt-16">
        <div className="text-center">
          <a
            href="https://zap-hosting.com/achim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[#2F7A2C] hover:bg-[#266424] rounded-lg transition-colors duration-300"
            aria-label="Jetzt bei Zap-Hosting bestellen"  
          >
            Jetzt bei Zap-Hosting bestellen
          </a>
        </div>
      </div>
    </section>
  );
}
