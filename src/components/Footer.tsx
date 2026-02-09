import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaTwitch, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kontakt */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Kontakt</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:dev@achimsommer.com"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center cursor-pointer"
                >
                  <FaEnvelope className="mr-2" />
                  dev@achimsommer.com
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Achim-Sommer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center cursor-pointer"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Social Media</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/achim-sommer-b898a2185/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-500 transition-colors duration-300 cursor-pointer"
                aria-label="Besuche mein LinkedIn Profil"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitch.tv/achim1337"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-purple-500 transition-colors duration-300 cursor-pointer"
                aria-label="Folge mir auf Twitch"
              >
                <FaTwitch />
              </a>
              <a
                href="https://www.instagram.com/achim.sommer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-pink-500 transition-colors duration-300 cursor-pointer"
                aria-label="Folge mir auf Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@achimsommer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-red-500 transition-colors duration-300 cursor-pointer"
                aria-label="Abonniere meinen YouTube Kanal"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm">
            © {currentYear} Achim Sommer. Alle Rechte vorbehalten.
          </p>
          <div className="mt-2 space-x-4 text-sm">
            <Link
              href="/impressum"
              className="hover:text-blue-400 transition-colors duration-300 cursor-pointer"
            >
              Impressum
            </Link>
            <span>•</span>
            <Link
              href="/datenschutz"
              className="hover:text-blue-400 transition-colors duration-300 cursor-pointer"
            >
              Datenschutzerklärung
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
