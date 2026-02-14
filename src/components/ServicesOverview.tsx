'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCode, FaArrowRight } from 'react-icons/fa';
import { MdRouter } from 'react-icons/md';
import { FaVideo, FaShieldAlt } from 'react-icons/fa';
import { Iso3DIcon } from './ui/iso-3d-icon';

const services = [
  {
    title: 'Webentwicklung',
    description:
      'Moderne Websites & Web-Apps mit Next.js, React & TypeScript – performance-optimiert und SEO-freundlich.',
    features: ['Next.js & React', 'SEO-optimiert', 'DSGVO-konform'],
    icon: <FaCode className="h-8 w-8" />,
    color: 'emerald' as const,
    accent: {
      border: 'border-emerald-500/20',
      hoverBorder: 'hover:border-emerald-400/40',
      hoverShadow: 'hover:shadow-emerald-500/15',
      text: 'text-emerald-400',
      dot: 'bg-emerald-400',
      gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
      hoverTitle: 'group-hover:text-emerald-400',
    },
    anchor: 'webentwicklung',
  },
  {
    title: 'UniFi Netzwerklösungen',
    description:
      'Enterprise-Grade Netzwerke mit Ubiquiti – von der Planung über Access Points bis zu Gateways & Switches.',
    features: ['WLAN-Heatmaps', 'VLAN-Segmentierung', 'PoE-Switching'],
    icon: <MdRouter className="h-8 w-8" />,
    color: 'blue' as const,
    accent: {
      border: 'border-blue-500/20',
      hoverBorder: 'hover:border-blue-400/40',
      hoverShadow: 'hover:shadow-blue-500/15',
      text: 'text-blue-400',
      dot: 'bg-blue-400',
      gradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
      hoverTitle: 'group-hover:text-blue-400',
    },
    anchor: 'unifi-netzwerk',
  },
  {
    title: 'UniFi Protect & Sicherheit',
    description:
      'Professionelle Videoüberwachung mit 4K-Kameras, KI-Erkennung und lokaler Speicherung – DSGVO-konform.',
    features: ['4K mit KI-Erkennung', 'Zutrittskontrolle', 'Lokale Speicherung'],
    icon: <FaVideo className="h-8 w-8" />,
    color: 'orange' as const,
    accent: {
      border: 'border-orange-500/20',
      hoverBorder: 'hover:border-orange-400/40',
      hoverShadow: 'hover:shadow-orange-500/15',
      text: 'text-orange-400',
      dot: 'bg-orange-400',
      gradient: 'from-orange-500/15 via-orange-500/5 to-transparent',
      hoverTitle: 'group-hover:text-orange-400',
    },
    anchor: 'unifi-protect',
  },
  {
    title: 'Wartung & Managed Services',
    description:
      'Regelmäßige Wartung, Firmware-Updates, Monitoring und schneller Remote-Support für Ihr UniFi Netzwerk.',
    features: ['24/7 Monitoring', 'Remote-Support', 'Firmware-Updates'],
    icon: <FaShieldAlt className="h-8 w-8" />,
    color: 'violet' as const,
    accent: {
      border: 'border-violet-500/20',
      hoverBorder: 'hover:border-violet-400/40',
      hoverShadow: 'hover:shadow-violet-500/15',
      text: 'text-violet-400',
      dot: 'bg-violet-400',
      gradient: 'from-violet-500/15 via-violet-500/5 to-transparent',
      hoverTitle: 'group-hover:text-violet-400',
    },
    anchor: 'unifi-wartung',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function ServicesOverview() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Multi-color background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-blue-400">
              Leistungen
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Meine Services
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 lg:gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.anchor} variants={cardVariants}>
              <Link
                href={`/services#${service.anchor}`}
                className={`group relative flex flex-col h-full rounded-2xl border ${service.accent.border} bg-gray-950/60 backdrop-blur-sm p-6 sm:p-7 lg:p-6 pt-8 sm:pt-9 lg:pt-8 transition-all duration-400 ${service.accent.hoverBorder} ${service.accent.hoverShadow} hover:bg-gray-900/50 hover:shadow-2xl hover:-translate-y-1`}
              >
                {/* Top gradient overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${service.accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* 3D Icon with hover scale */}
                <div className="relative mb-6 self-start transition-transform duration-300 group-hover:scale-110">
                  <Iso3DIcon
                    icon={service.icon}
                    color={service.color}
                    size="md"
                  />
                </div>

                {/* Title – fixed hover color with explicit Tailwind classes */}
                <h3 className={`relative text-lg font-semibold text-white mb-2.5 ${service.accent.hoverTitle} transition-colors duration-300`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm text-gray-400 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Key Features */}
                <ul className="relative space-y-1.5 mb-auto">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className={`w-1 h-1 rounded-full ${service.accent.dot} shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Arrow link */}
                <div className={`relative mt-5 flex items-center text-sm ${service.accent.text} opacity-60 group-hover:opacity-100 transition-opacity`}>
                  <span className="mr-2 font-medium">Mehr erfahren</span>
                  <FaArrowRight className="w-3 h-3 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>

                {/* Bottom color accent line */}
                <div
                  className={`absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${service.accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-14"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
          >
            Alle Services ansehen
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
