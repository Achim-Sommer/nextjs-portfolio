import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles-core";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { FaGamepad, FaServer, FaCode, FaShieldAlt, FaDiceD20, FaUsers, FaDownload, FaPlane, FaShip, FaTruck, FaCar, FaCarCrash, FaTshirt, FaStore, FaGasPump, FaWrench, FaCut, FaAmbulance, FaBus, FaTaxi, FaFish, FaDice, FaBuilding, FaMobileAlt, FaDog, FaKey } from "react-icons/fa";
import { GiPoliceOfficerHead, GiHandcuffs, GiPokerHand, GiBank, GiCardPlay, GiSteeringWheel } from "react-icons/gi";
import { SiDiscord } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const allFeatures = {
  shops: [
    { name: "Flugzeugshop", icon: <FaPlane className="h-6 w-6" /> },
    { name: "Bootshop", icon: <FaShip className="h-6 w-6" /> },
    { name: "Truckshop", icon: <FaTruck className="h-6 w-6" /> },
    { name: "Vehicleshop", icon: <FaCar className="h-6 w-6" /> },
    { name: "Waschanlage", icon: <FaCarCrash className="h-6 w-6" /> },
    { name: "Kleidungsshop", icon: <FaTshirt className="h-6 w-6" /> },
    { name: "Supermarket", icon: <FaStore className="h-6 w-6" /> },
    { name: "Tankstellen", icon: <FaGasPump className="h-6 w-6" /> },
    { name: "LScustom", icon: <FaWrench className="h-6 w-6" /> },
    { name: "Barbarshop", icon: <FaCut className="h-6 w-6" /> }
  ],
  jobs: [
    { name: "Polizei", icon: <GiPoliceOfficerHead className="h-6 w-6" /> },
    { name: "Rettungsdienst", icon: <FaAmbulance className="h-6 w-6" /> },
    { name: "Mechaniker", icon: <FaWrench className="h-6 w-6" /> },
    { name: "Fischer", icon: <FaFish className="h-6 w-6" /> },
    { name: "Busfahrer", icon: <FaBus className="h-6 w-6" /> },
    { name: "Taxifahrer", icon: <FaTaxi className="h-6 w-6" /> }
  ],
  heists: [
    { name: "Shop Überfälle", icon: <FaStore className="h-6 w-6" /> },
    { name: "Bank Überfälle", icon: <GiBank className="h-6 w-6" /> }
  ],
  casino: [
    { name: "Spielautomaten", icon: <FaDice className="h-6 w-6" /> },
    { name: "Multiplayer Blackjack", icon: <GiCardPlay className="h-6 w-6" /> },
    { name: "Roulette", icon: <GiPokerHand className="h-6 w-6" /> },
    { name: "Animierte Wände", icon: <FaBuilding className="h-6 w-6" /> }
  ],
  additional: [
    { name: "Neue Fahrschule", icon: <GiSteeringWheel className="h-6 w-6" /> },
    { name: "Jobcenter", icon: <FaBuilding className="h-6 w-6" /> },
    { name: "Polizei CAD/MTD", icon: <GiPoliceOfficerHead className="h-6 w-6" /> },
    { name: "GcPhone", icon: <FaMobileAlt className="h-6 w-6" /> },
    { name: "Haustiere", icon: <FaDog className="h-6 w-6" /> },
    { name: "Carlock", icon: <FaKey className="h-6 w-6" /> }
  ]
};

const versions = [
  { version: "Release 1.4.0", date: "09.07.2023", latest: true },
  { version: "Release 1.3.0", date: "07.07.2023" },
  { version: "Release 1.2.0", date: "03.07.2023" },
  { version: "Release 1.1.0", date: "30.06.2023" },
  { version: "Release 1.0.0", date: "17.06.2023" },
  { version: "Legacy Beta 4.0.0", date: "13.06.2023" },
  { version: "Legacy Beta 3.0.0", date: "08.06.2023" },
  { version: "Legacy Beta 2.0.0", date: "15.05.2023" },
  { version: "Legacy Beta 1.0.0", date: "07.05.2023" },
  { version: "Beta 4.0.0", date: "25.06.2022" },
  { version: "Beta 3.2.0", date: "03.07.2021" },
  { version: "Beta 3.1.0", date: "18.12.2021" },
  { version: "Beta 3.0.0", date: "16.10.2021" },
  { version: "Beta 2.0.0", date: "30.01.2021" },
  { version: "Beta 1.8.0", date: "13.10.2020" },
  { version: "Beta 1.6.0", date: "23.08.2020" },
  { version: "Beta 1.4.0", date: "01.08.2020" },
  { version: "Beta 1.2.0", date: "23.07.2020" },
  { version: "Beta 1.0.0", date: "13.07.2020" },
  { version: "Alpha 0.9.0", date: "05.07.2020" },
  { version: "Alpha 0.6.5", date: "30.06.2020" },
  { version: "Alpha 0.5.0", date: "28.06.2020" }
];

export default function FiveMTemplateServer() {
  return (
    <>
      <NextSeo
        title="FiveM Template Server | Achim Sommer"
        description="Professioneller FiveM Template Server mit ESX Legacy. Modularer Aufbau, deutsche Übersetzung und umfangreicher Support."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
        {/* Hero Section */}
        <div className="relative h-[60vh] md:h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="w-full absolute inset-0">
            <SparklesCore
              id="tsparticlesfull"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          
          <div className="relative z-20 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 mb-6 font-mono tracking-tight"
            >
              FiveM Template Server
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-3xl text-blue-300/80 max-w-3xl mx-auto font-mono"
            >
              Dein perfekter Start in die Welt von FiveM
            </motion.p>
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,128,255,0.5)]">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/YATdPnTEeNQ"
                title="FiveM Template Server Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Feature Sections */}
          {Object.entries(allFeatures).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8 font-mono tracking-tight">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,128,255,0.2)] backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 text-gray-300 group-hover:text-blue-400 transition-colors">
                      <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                        {item.icon}
                      </div>
                      <span className="font-mono">{item.name}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Version History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 rounded-2xl p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 font-mono tracking-tight">
              Entwicklung
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 font-mono">
                Kontinuierliche Entwicklung mit regelmäßigen Updates und neuen Features.
                Alle Updates sind für Käufer kostenlos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {versions.map((version, index) => (
                  <div
                    key={version.version}
                    className={cn(
                      "p-4 rounded-lg border transition-all duration-300",
                      version.latest 
                        ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_15px_rgba(0,128,255,0.2)]" 
                        : "border-zinc-800 bg-zinc-900/50 hover:border-blue-500/30 hover:shadow-[0_0_10px_rgba(0,128,255,0.1)]"
                    )}
                  >
                    <h3 className="text-white font-bold font-mono">{version.version}</h3>
                    <p className="text-gray-400 font-mono">{version.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
