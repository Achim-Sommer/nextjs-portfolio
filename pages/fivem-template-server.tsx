import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles-core";
import { cn } from "@/utils/cn";
import { FaGamepad, FaWhatsapp, FaServer, FaCode, FaUsers, FaDownload, FaPlane, FaShip, FaTruck, FaCar, FaCarCrash, FaTshirt, FaStore, FaGasPump, FaWrench, FaCut, FaAmbulance, FaBus, FaTaxi, FaFish, FaDice, FaBuilding, FaMobileAlt, FaDog, FaKey, FaLanguage, FaHeadset, FaGithub } from "react-icons/fa";
import { GiPoliceOfficerHead, GiPokerHand, GiBank, GiCardPlay, GiSteeringWheel } from "react-icons/gi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from 'react-dom';

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
];

const premiumFeatures = [
  { name: "PoliceCad", link: "https://achim.tebex.io/package/5097370", description: "Professionelles Polizei-Verwaltungssystem" },
  { name: "Helicopter Camera", link: "https://achim.tebex.io/package/5156431", description: "Realistische Helikopter-Kamera" },
  { name: "Luckywheel", link: "https://achim.tebex.io/package/5214747", description: "Casino Glücksrad-System" },
  { name: "ESX Drugs", link: "https://achim.tebex.io/package/5118373", description: "Erweitertes Drogensystem" },
  { name: "MainMenu", link: "https://achim.tebex.io/package/5153446", description: "Anpassbares Hauptmenü" },
  { name: "Roulette Like GTA:O", link: "https://achim.tebex.io/package/5240886", description: "GTA-Style Casino Roulette" },
  { name: "Doge Store", link: "https://achim.tebex.io/package/5113761", description: "Erweitertes Shop-System" },
];

export default function FiveMTemplateServer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <>
      <NextSeo
        title="FiveM Template Server Kostenlos | Free ESX Legacy Template für GTA RP"
        description="FiveM Template Server kostenlos downloaden - Das beste kostenlose ESX Legacy Template für deinen GTA Roleplay Server. Inklusive Jobs, Shops, Casino & mehr. Jetzt kostenlos herunterladen!"
        canonical="https://achimsommer.com/fivem-template-server"
        openGraph={{
          title: 'FiveM Template Server Kostenlos | Free ESX Legacy Template',
          description: 'FiveM Template Server kostenlos downloaden - Das beste kostenlose ESX Legacy Template für deinen GTA Roleplay Server. Inklusive Jobs, Shops, Casino & mehr.',
          images: [
            {
              url: 'https://achimsommer.com/images/fivem-template-preview.jpg',
              width: 1200,
              height: 630,
              alt: 'FiveM Template Server Kostenlos - Bestes ESX Legacy Template',
            }
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'fivem template server, fivem template server kostenlos, fivem template server free, esx legacy template, gta roleplay server, fivem server setup, fivem server template kostenlos'
          }
        ]}
      />
      {/* Floating WhatsApp Button */}
      {mounted && createPortal(
        <div className="fixed bottom-4 right-4 z-[9999] drop-shadow-2xl">
          <Link
            href={`https://wa.me/4915678317784`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-green-600 hover:bg-green-500 transition-colors duration-300 shadow-lg block"
            aria-label="Contact on WhatsApp"
          >
            <FaWhatsapp className="w-6 h-6 text-white" />
          </Link>
        </div>,
        document.body
      )}

      <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,87,34,0.15),rgba(76,175,80,0.15),rgba(255,255,255,0))]">
        {/* Hero Section */}
        <div className="relative h-[60vh] md:h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a] z-10" />
          
          {/* Gaming Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,.3)_1px,transparent_1px)] bg-[size:35px_35px] z-0"></div>
          
          {/* Animated Spotlight Effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 animate-spotlight bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
          </div>

          <div className="w-full absolute inset-0">
            <SparklesCore
              id="tsparticlesfull"
              background="transparent"
              minSize={0.8}
              maxSize={1.6}
              particleDensity={70}
              className="w-full h-full"
              particleColor="#ff9800"
            />
          </div>
          
          <div className="relative z-20 text-center px-4">
            {/* Level Bar Decoration */}
            <div className="w-32 h-2 mx-auto mb-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#ff5722] via-[#4caf50] to-[#2196f3] mb-6 font-mono tracking-tight gta-text-shadow"
            >
              FiveM Template Server Kostenlos - Bestes ESX Legacy Template
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-3xl text-emerald-300/90 max-w-3xl mx-auto font-mono gta-text-glow mb-8"
            >
              Kostenloser FiveM Template Server mit ESX Legacy Framework - Perfekter Start für deinen GTA Roleplay Server
            </motion.p>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center gap-8 mb-8 text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <FaUsers className="text-purple-400 h-5 w-5" />
                <span className="text-purple-200">100+ Server</span>
              </div>
              <div className="flex items-center gap-2">
                <FaDownload className="text-green-400 h-5 w-5" />
                <span className="text-green-200">1000+ Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCode className="text-blue-400 h-5 w-5" />
                <span className="text-blue-200">ESX Legacy</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <button onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }} className="gta-button">
                <FaGamepad className="w-5 h-5 mr-2" />
                Features erkunden
              </button>
              <a href="https://achim.tebex.io/category/esx-legacy-template" target="_blank" rel="noopener noreferrer" className="gta-button-primary">
                <FaStore className="w-5 h-5 mr-2" />
                Zum Shop
              </a>
            </motion.div>
          </div>
        </div>

        {/* Server Preview Video */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-zinc-800/50 gaming-card group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 animate-gradient-x"></div>
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/YATdPnTEeNQ?rel=0"
                title="FiveM Template Server Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>

        {/* Feature Categories Navigation */}
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-sm border-b border-zinc-800 mb-12">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
              {Object.keys(allFeatures).map((category) => (
                <a
                  key={category}
                  href={`#${category}`}
                  className="text-sm font-mono text-gray-400 hover:text-white transition-colors whitespace-nowrap hover:text-glow"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Info Section */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff5722]/5 via-[#4caf50]/5 to-[#2196f3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff5722] via-[#4caf50] to-[#2196f3] bg-clip-text text-transparent mb-6 font-mono tracking-tight gta-text-shadow">
              FiveM Template Server Kostenlos - Das beste ESX Legacy Template
            </h2>
            <div className="space-y-4 relative z-10">
              <p className="text-gray-300 leading-relaxed">
                Der kostenlose FiveM Template Server ist das beste ESX Legacy Template für deinen GTA Roleplay Server. Egal ob Anfänger oder Fortgeschrittener - mit diesem kostenlosen Template erstellst du schnell und einfach deinen eigenen Server. Das modulare System ermöglicht es dir, den Server genau nach deinen Vorstellungen anzupassen.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <FaCode className="text-[#4caf50]" /> Modularer Aufbau
                  </h3>
                  <p className="text-gray-400">
                    Füge hinzu, entferne oder ändere Komponenten ganz nach deinen Bedürfnissen. Perfekt für jeden Servertyp - von Hardcore bis Casual RP.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <FaLanguage className="text-[#2196f3]" /> Mehrsprachig
                  </h3>
                  <p className="text-gray-400">
                    Größtenteils auf Deutsch übersetzt und einfach in jede gewünschte Sprache anpassbar.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <FaServer className="text-[#ff5722]" /> Neueste ESX Version
                  </h3>
                  <p className="text-gray-400">
                    Basiert auf der aktuellsten ESX Legacy Version für beste Performance und Sicherheit.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <FaHeadset className="text-[#9c27b0]" /> Support
                  </h3>
                  <p className="text-gray-400">
                    Professioneller Support bei Fragen oder Problemen für alle Premium-Nutzer.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
        {/* Main Content */}
        <div id="features" className="max-w-7xl mx-auto px-4 py-12">
          {/* Feature Sections */}
          {Object.entries(allFeatures).map(([category, items], index) => (
            <motion.div
              key={category}
              id={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff5722] via-[#4caf50] to-[#2196f3] bg-clip-text text-transparent font-mono tracking-tight gta-text-shadow">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
              </div>
              
              {/* Special handling for Casino category to include video */}
              {category === 'casino' && (
                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-2xl overflow-hidden border border-zinc-800/50 gaming-card group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 animate-gradient-x"></div>
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/EvTT7BPJJwk?rel=0"
                        title="Casino Roulette Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </motion.div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="group relative p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-[#ff5722]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,87,34,0.2)] backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 text-gray-300 group-hover:text-[#ff5722] transition-colors">
                      <div className="text-[#ff5722] group-hover:text-[#ff9800] transition-colors">
                        {item.icon}
                      </div>
                      <span className="font-mono">{item.name}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff5722]/10 to-[#ffc107]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Shop CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 rounded-2xl bg-gradient-to-r from-[#ff5722]/10 via-[#4caf50]/10 to-[#2196f3]/10 p-[1px] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,87,34,0.1),rgba(76,175,80,0.1),rgba(255,255,255,0.1))]"></div>
            <div className="relative rounded-2xl bg-zinc-900/90 p-8 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff5722] via-[#4caf50] to-[#2196f3]"></div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff5722] via-[#4caf50] to-[#2196f3] bg-clip-text text-transparent font-mono tracking-tight gta-text-shadow">
                    Weiterentwicklung & Support
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Erhalte Zugriff auf alle Premium-Features, regelmäßige Updates und professionellen Support. Entwickle deinen Server mit uns weiter!
                  </p>
                  <ul className="space-y-3">
                    {[
                      { icon: <FaHeadset className="text-[#4caf50]" />, text: "Professioneller Support" },
                      { icon: <FaDownload className="text-[#2196f3]" />, text: "Regelmäßige Updates" },
                      { icon: <FaCode className="text-[#ff5722]" />, text: "Premium-Features" },
                      { icon: <FaUsers className="text-[#9c27b0]" />, text: "Community-Zugang" }
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-300">
                        {item.icon}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://achim.tebex.io/category/esx-legacy-template"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#4caf50] hover:bg-[#43a047] text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-[#4caf50]/20 hover:shadow-[#4caf50]/30"
                    >
                      <FaStore className="w-5 h-5" />
                      Zum Shop
                    </a>
                    <span className="text-gray-400 text-sm">Starte ab €16.65</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4caf50]/20 to-transparent rounded-lg filter blur-xl"></div>
                  <div className="relative space-y-4">
                    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-3 text-[#4caf50] mb-2">
                        <FaServer className="w-5 h-5" />
                        <span className="font-mono font-bold">Lifetime Updates</span>
                      </div>
                      <p className="text-gray-400 text-sm">Alle zukünftigen Updates ohne zusätzliche Kosten</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-3 text-[#2196f3] mb-2">
                        <FaHeadset className="w-5 h-5" />
                        <span className="font-mono font-bold">Premium Support</span>
                      </div>
                      <p className="text-gray-400 text-sm">Direkter Support bei Fragen und Problemen</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-3 text-[#ff5722] mb-2">
                        <FaGamepad className="w-5 h-5" />
                        <span className="font-mono font-bold">Premium Features</span>
                      </div>
                      <p className="text-gray-400 text-sm">Zugriff auf alle Premium-Erweiterungen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Version History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff5722] via-[#4caf50] to-[#2196f3] bg-clip-text text-transparent mb-6 font-mono tracking-tight gta-text-shadow">
              Entwicklung
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 font-mono">
                Kontinuierliche Entwicklung mit regelmäßigen Updates und neuen Features.
                Alle Updates sind für Käufer kostenlos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {versions.map((version, index) => (
                  <motion.div
                    key={version.version}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className={cn(
                      "p-4 rounded-lg border transition-all duration-300",
                      version.latest 
                        ? "border-[#ff5722]/50 bg-[#ff5722]/10 shadow-[0_0_20px_rgba(255,87,34,0.2)]" 
                        : "border-zinc-800 bg-zinc-900/50 hover:border-[#ff5722]/30 hover:shadow-[0_0_15px_rgba(255,87,34,0.1)]"
                    )}
                  >
                    <h3 className="text-white font-bold font-mono">{version.version}</h3>
                    <p className="text-gray-400 font-mono">{version.date}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* GitHub Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 rounded-2xl p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <a
                href="https://github.com/Achim-Sommer/FiveM-ESX-Template-Server"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors text-white font-mono text-sm"
              >
                <FaGithub className="w-5 h-5" />
                GitHub Repository
              </a>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff5722] via-[#4caf50] to-[#2196f3] bg-clip-text text-transparent mb-6 font-mono tracking-tight gta-text-shadow">
              Kostenloser FiveM Template Server - Open Source Version
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 rounded-lg border border-yellow-600/30 bg-yellow-600/10">
                <p className="text-yellow-200 font-mono text-sm">
                  ⚠️ Die kostenlose Open Source Version enthält keinen Support und ausgewählte Premium-Features. Perfekt für alle, die einen kostenlosen FiveM Server erstellen wollen.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {premiumFeatures.map((feature, index) => (
                  <motion.a
                    key={feature.name}
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg border border-zinc-800 hover:border-[#4caf50]/30 bg-zinc-900/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(76,175,80,0.1)] group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4caf50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-white font-bold font-mono group-hover:text-[#4caf50] transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">{feature.description}</p>
                    <div className="mt-4 text-[#4caf50] text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      Mehr erfahren →
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 rounded-2xl p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff5722] via-[#4caf50] to-[#2196f3] bg-clip-text text-transparent mb-6 font-mono tracking-tight gta-text-shadow">
              Häufige Fragen (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-white font-bold">Ist der FiveM Template Server wirklich kostenlos?</h3>
                <p className="text-gray-400">Ja, die Open Source Version des FiveM Template Servers ist komplett kostenlos und kann ohne Einschränkungen genutzt werden.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-bold">Was ist der Unterschied zwischen der kostenlosen und Premium Version?</h3>
                <p className="text-gray-400">Die kostenlose Version enthält alle grundlegenden Features, während die Premium Version zusätzliche Erweiterungen und professionellen Support bietet.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-bold">Kann ich den Server für kommerzielle Zwecke nutzen?</h3>
                <p className="text-gray-400">Ja, der FiveM Template Server kann sowohl für private als auch kommerzielle Projekte genutzt werden.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-bold">Wie oft wird der Template Server aktualisiert?</h3>
                <p className="text-gray-400">Der Server erhält regelmäßige Updates, sowohl für die kostenlose als auch die Premium Version.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
