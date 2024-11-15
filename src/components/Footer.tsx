export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kontakt */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Kontakt</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:kontakt@achimsommer.com"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  kontakt@achimsommer.com
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/yourserver"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center"
                >
                  <i className="fab fa-discord mr-2"></i>
                  Discord Server
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
                  href="https://forum.achimsommer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Forum
                </a>
              </li>
              <li>
                <a
                  href="https://shop.achimsommer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Achim-Sommer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
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
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-red-500 transition-colors duration-300"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://twitch.tv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-purple-500 transition-colors duration-300"
              >
                <i className="fab fa-twitch"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-pink-500 transition-colors duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-500 transition-colors duration-300"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm">
            © {currentYear} Achim Sommer. Alle Rechte vorbehalten.
          </p>
          <div className="mt-2 space-x-4 text-sm">
            <a
              href="/impressum"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Impressum
            </a>
            <span>•</span>
            <a
              href="https://forum.achimsommer.com/home/datenschutzerklaerung/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Datenschutzerklärung
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
