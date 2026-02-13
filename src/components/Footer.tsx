'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaTwitch, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';

const socialLinks = [
  { href: 'https://www.linkedin.com/in/achim-sommer-b898a2185/', icon: FaLinkedin, label: 'LinkedIn', hoverColor: 'hover:text-blue-500 hover:shadow-blue-500/20' },
  { href: 'https://github.com/Achim-Sommer', icon: FaGithub, label: 'GitHub', hoverColor: 'hover:text-white hover:shadow-white/20' },
  { href: 'https://twitch.tv/achim1337', icon: FaTwitch, label: 'Twitch', hoverColor: 'hover:text-purple-500 hover:shadow-purple-500/20' },
  { href: 'https://www.instagram.com/achim.sommer/', icon: FaInstagram, label: 'Instagram', hoverColor: 'hover:text-pink-500 hover:shadow-pink-500/20' },
  { href: 'https://www.youtube.com/@achimsommer', icon: FaYoutube, label: 'YouTube', hoverColor: 'hover:text-red-500 hover:shadow-red-500/20' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-gray-400 overflow-hidden">
      {/* Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Dezenter Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Oberer Bereich: Name + Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Achim Sommer</h3>
          <p className="text-sm text-gray-500 mb-8 max-w-md">
            Full Stack Developer · Aachen, Deutschland
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-xl
                  bg-white/[0.04] border border-white/[0.06]
                  text-gray-500 transition-all duration-300
                  hover:bg-white/[0.08] hover:border-white/[0.12]
                  hover:shadow-lg hover:-translate-y-0.5
                  ${social.hoverColor}
                `}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Mittlerer Bereich: Links in einer Zeile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12 text-sm"
        >
          <a
            href="mailto:dev@achimsommer.com"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300"
          >
            <FaEnvelope className="w-3.5 h-3.5" />
            dev@achimsommer.com
          </a>
          <span className="hidden sm:inline text-gray-700">·</span>
          <Link href="/impressum" className="hover:text-blue-400 transition-colors duration-300">
            Impressum
          </Link>
          <span className="hidden sm:inline text-gray-700">·</span>
          <Link href="/datenschutz" className="hover:text-blue-400 transition-colors duration-300">
            Datenschutzerklärung
          </Link>
        </motion.div>

        {/* Unterer Bereich: Copyright */}
        <div className="border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-gray-600">
            © {currentYear} Achim Sommer. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
