import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { FaWhatsapp, FaEnvelope, FaCode, FaServer, FaArrowRight, FaGamepad, FaWifi, FaHome, FaNetworkWired, FaVideo, FaQuestionCircle, FaComments } from "react-icons/fa";
import { RiSparklingFill } from "react-icons/ri";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    name: "Gaming Community Server",
    icon: <FaGamepad className="h-8 w-8 text-blue-400" />,
    color: "blue",
    description: "Achim hat unseren FiveM Server perfekt eingerichtet. Die Performance ist top und alles läuft stabil. Besonders die schnelle Kommunikation hat uns überzeugt.",
    author: "Maximilian"
  },
  {
    name: "Startup Büro",
    icon: <FaWifi className="h-8 w-8 text-green-400" />,
    color: "green",
    description: "Professionelle Planung und Installation unseres UniFi Netzwerks und Kamerasystems. Perfekte WLAN-Abdeckung und ein übersichtliches Monitoring-System.",
    author: "Sarah"
  },
  {
    name: "Smart Home Projekt",
    icon: <FaHome className="h-8 w-8 text-purple-400" />,
    color: "purple",
    description: "Von der Beratung bis zur Umsetzung alles top! Das UniFi System läuft einwandfrei, die Kameras liefern gestochen scharfe Bilder und die Zutrittskontrolle funktioniert zuverlässig.",
    author: "Thomas"
  },
  {
    name: "E-Commerce Website",
    icon: <FaCode className="h-8 w-8 text-yellow-400" />,
    color: "yellow",
    description: "Unsere neue Website ist nicht nur schnell und modern, sondern auch perfekt für Suchmaschinen optimiert. Die Zusammenarbeit war professionell und zielgerichtet.",
    author: "Michael"
  },
  {
    name: "Kleines Büro",
    icon: <FaNetworkWired className="h-8 w-8 text-pink-400" />,
    color: "pink",
    description: "Endlich ein stabiles und schnelles Netzwerk! Die VLANs für Gäste und interne Nutzung sind perfekt konfiguriert, und das Management-Interface ist sehr benutzerfreundlich.",
    author: "Julia"
  },
  {
    name: "Minecraft Community",
    icon: <FaServer className="h-8 w-8 text-indigo-400" />,
    color: "indigo",
    description: "Unser Minecraft-Netzwerk läuft dank Achim wie ein Uhrwerk. Die Performance ist ausgezeichnet und die Modifikationen funktionieren einwandfrei.",
    author: "Lena"
  },
  {
    name: "Einzelhandel",
    icon: <FaVideo className="h-8 w-8 text-orange-400" />,
    color: "orange",
    description: "Die Installation der UniFi Protect Kameras und Access Points war die richtige Entscheidung. Alles ist zentral steuerbar und die Bildqualität ist hervorragend.",
    author: "Hans"
  }
];

const serviceCategories = [
  {
    title: "Webentwicklung",
    description: "Professionelle Webentwicklung mit React, Next.js und modernen Webtechnologien. Von responsiven Business-Websites bis zu komplexen Web-Applikationen. Performance-optimiert, SEO-freundlich und barrierefrei nach WCAG-Standards. Inklusive SSL-Verschlüsselung und DSGVO-konformer Implementierung.",
    icon: <FaCode />,
    services: [
      {
        title: "Next.js Website & Blog Entwicklung",
        description: "Moderne, schnelle und SEO-optimierte Websites mit Next.js. Von persönlichen Blogs bis hin zu komplexen Web-Anwendungen.",
        details: [
          "Responsive Design",
          "Performance-Optimierung",
          "Content Management System",
          "Analytics Integration"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 199€",
        consultation: true
      },
      {
        title: "Portfolio & Business Websites",
        description: "Professionelle Webauftritte für Freelancer und Unternehmen mit modernem Design und optimaler Performance.",
        details: [
          "Individuelles Design",
          "SEO Optimierung",
          "Mobile-First Ansatz",
          "Content-Strategie"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 99€",
        consultation: true
      }
    ]
  },
  {
    title: "Server Administration",
    description: "Experte für Linux-Server Administration und DevOps. Spezialisiert auf Debian/Ubuntu Server-Systeme, Docker-Container und Kubernetes. Implementierung von CI/CD-Pipelines, Monitoring-Lösungen und Backup-Strategien. 24/7 Server-Monitoring und proaktive Wartung für maximale Uptime.",
    icon: <FaServer />,
    services: [
      {
        title: "Coolify Installation & Setup",
        description: "Komplette Installation und Konfiguration von Coolify für Self-Hosting. Dokumentiert in meinem Blog-Artikel.",
        details: [
          "Server Setup",
          "Domain Konfiguration",
          "SSL Setup",
          "Monitoring Einrichtung"
        ],
        link: "/blog/coolify-installation",
        icon: "",
        badge: "Ab 9€",
        consultation: true
      },
      {
        title: "LAMP Stack Installation",
        description: "Vollständige Einrichtung des LAMP Stacks (Linux, Apache, MySQL, PHP) auf Debian-Systemen.",
        details: [
          "Apache Konfiguration",
          "MySQL Installation",
          "PHP Setup",
          "Security Hardening"
        ],
        link: "/blog/debian-lamp-stack",
        icon: "",
        badge: "Ab 9€",
        consultation: true
      }
    ]
  },
  {
    title: "Gaming Server",
    description: "Professionelles Setup und Management von Gaming-Servern für Minecraft, FiveM und andere Spiele. Optimierte Server-Konfiguration für beste Performance, Anti-Cheat-Systeme und Mod-Support. Automatische Backups, DDoS-Schutz und 24/7 Verfügbarkeit. Individuelle Plugin-Entwicklung und Serveranpassungen.",
    icon: <FaGamepad />,
    services: [
      {
        title: "FiveM Server Entwicklung",
        description: "Professionelle Einrichtung und Anpassung von FiveM Servern. Inklusive Custom Scripts und Modifikationen.",
        details: [
          "Server Setup",
          "Mod Installation",
          "Server Wartung",
          "Performance Optimierung"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 99€",
        consultation: true
      },
      {
        title: "Minecraft Server & Netzwerke",
        description: "Komplette Einrichtung von Minecraft Servern oder ganzen Netzwerken mit Plugins, Mods und Anti-Cheat.",
        details: [
          "Server/Netzwerk Setup",
          "Plugin Konfiguration",
          "Mod Installation",
          "Anti-Cheat Setup"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 49€",
        consultation: true
      }
    ]
  },
  {
    title: "Ubiquiti Solutions",
    description: "Zertifizierte Ubiquiti UniFi & EdgeMax Netzwerklösungen für Unternehmen und Smart Homes. Planung und Installation von Access Points, Switches und Security Gateways. VLANs, Gäste-WLANs und Netzwerksegmentierung. Remote-Management und proaktives Monitoring für optimale Netzwerkleistung.",
    icon: <FaWifi />,
    services: [
      {
        title: "UniFi Netzwerk-Planung",
        description: "Umfassende Planung und Implementierung von UniFi Netzwerken für optimale Abdeckung und Performance.",
        details: [
          "Standortanalyse",
          "Hardware-Planung",
          "WLAN-Ausleuchtung",
          "Netzwerk-Design"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 149€",
        consultation: true
      },
      {
        title: "UniFi Protect Installation",
        description: "Professionelle Installation und Konfiguration von UniFi Protect Überwachungssystemen mit Cloud-Key oder UDM Pro.",
        details: [
          "Kamera-Platzierung",
          "PoE-Verkabelung",
          "UniFi OS Setup",
          "Mobile App-Einrichtung"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 199€",
        consultation: true
      },
      {
        title: "UniFi Access & Talk",
        description: "Integration von UniFi Access Zutrittskontrolle und UniFi Talk Telefonie in Ihr UniFi Netzwerk.",
        details: [
          "Access Hub Setup",
          "Talk Phone Config",
          "Auto-Unlock Setup",
          "Mobile Integration"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 249€",
        consultation: true
      },
      {
        title: "UniFi Wartung & Support",
        description: "Regelmäßige Wartung, Updates und Support für Ihr UniFi Ecosystem.",
        details: [
          "System-Updates",
          "Backup-Management",
          "Performance-Monitoring",
          "Remote-Support"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 79€",
        consultation: true
      }
    ]
  },
  {
    title: "Smart Home",
    description: "Maßgeschneiderte Smart Home Automatisierung mit Home Assistant und Matter-kompatiblen Geräten. Integration von Beleuchtung, Heizung, Sicherheit und Entertainment-Systemen. Energieeffizienz-Optimierung durch intelligente Steuerung. Lokale Datenhaltung und höchste Privatsphäre-Standards.",
    icon: <FaHome />,
    services: [
      {
        title: "Home Assistant Installation",
        description: "Professionelle Installation und Konfiguration von Home Assistant für Ihr Smart Home.",
        details: [
          "Hardware-Auswahl & Setup",
          "Geräte-Integration",
          "Automatisierungen",
          "Dashboards & Visualisierung"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 149€",
        consultation: true
      },
      {
        title: "Smart Home Beratung",
        description: "Individuelle Beratung und Planung für Ihr Smart Home Projekt mit Fokus auf Datenschutz und Energieeffizienz.",
        details: [
          "Bedarfsanalyse",
          "Geräteempfehlungen",
          "Sicherheitskonzept",
          "Energieoptimierung"
        ],
        link: "https://wa.me/4915678317784",
        icon: "",
        badge: "Ab 79€",
        consultation: true
      }
    ]
  }
];

const contactMethods = [
  {
    icon: <FaWhatsapp className="h-6 w-6 text-green-500" />,
    title: "WhatsApp Business",
    value: "+49 156 78317784",
    link: "https://wa.me/4915678317784",
    type: "whatsapp"
  },
  {
    icon: <FaEnvelope className="h-6 w-6 text-blue-500" />,
    title: "E-Mail",
    value: "dev@achimsommer.com",
    link: "mailto:dev@achimsommer.com",
    type: "email"
  },
];

interface CategoryRefs {
  [key: string]: HTMLDivElement | null;
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const categoryRefs = useRef<CategoryRefs>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const initialTabsPosition = useRef<number | null>(null);

  useEffect(() => {
    // Speichere die initiale Position der Tabs
    if (tabsRef.current && initialTabsPosition.current === null) {
      initialTabsPosition.current = tabsRef.current.offsetTop;
    }

    const handleScroll = () => {
      if (tabsRef.current && initialTabsPosition.current !== null) {
        const navbarHeight = 70;
        const scrollPosition = window.scrollY;
        
        // Tabs werden nur sticky, wenn wir unter der initialen Position sind
        setIsSticky(scrollPosition + navbarHeight >= initialTabsPosition.current);
      }

      // Finde die aktive Kategorie basierend auf Scroll-Position
      const scrollPosition = window.scrollY + 150;

      let currentCategory = "";
      Object.entries(categoryRefs.current).forEach(([category, ref]) => {
        if (ref && ref.offsetTop <= scrollPosition) {
          currentCategory = category;
        }
      });

      if (currentCategory !== activeCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const navbarHeight = 70;
      const tabsHeight = 60;
      const totalOffset = navbarHeight + tabsHeight;
      
      window.scrollTo({
        top: ref.current.offsetTop - totalOffset,
        behavior: 'smooth'
      });
    }
  };

  const scrollToCategory = (category: string) => {
    const ref = categoryRefs.current[category];
    if (ref) {
      const navbarHeight = 70;
      const tabsHeight = 60;
      const totalOffset = navbarHeight + tabsHeight;
      
      window.scrollTo({
        top: ref.offsetTop - totalOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <NextSeo
        title="IT Dienstleistungen & Webentwicklung | Achim Sommer - Experte für Next.js & Ubiquiti"
        description="Professionelle IT-Dienstleistungen in Aachen: Webentwicklung mit Next.js, React & TypeScript | Ubiquiti UniFi Netzwerke | Smart Home Automation | Gaming Server Setup | Kostenlose Erstberatung | Faire Preise | DSGVO-konforme Lösungen"
        canonical="https://achimsommer.com/services"
        openGraph={{
          url: 'https://achimsommer.com/services',
          title: 'IT Services & Dienstleistungen | Achim Sommer',
          description: 'Professionelle IT-Dienstleistungen von der Webentwicklung bis zu Ubiquiti UniFi Lösungen. Erfahren Sie mehr über meine Services!',
          images: [
            {
              url: 'https://achimsommer.com/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Achim Sommer IT Services',
            }
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'Webentwicklung, Next.js, React, Ubiquiti UniFi, Smart Home, Home Assistant, Gaming Server, FiveM Server, Minecraft Server, IT Dienstleistungen'
          },
          {
            name: 'author',
            content: 'Achim Sommer'
          }
        ]}
      />

      {/* Schema.org strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Achim Sommer IT Services",
            "image": "https://achimsommer.com/og-image.jpg",
            "description": "Professionelle IT-Dienstleistungen in Aachen: Webentwicklung mit Next.js, React & TypeScript | Ubiquiti UniFi Netzwerke | Smart Home Automation | Gaming Server Setup",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Adalbertsteinweg 156",
              "addressLocality": "Aachen",
              "postalCode": "52066",
              "addressCountry": "DE",
              "areaServed": ["Aachen", "Köln", "Düsseldorf", "NRW"]
            },
            "priceRange": "€9-€249",
            "telephone": "+49 156 78317784",
            "email": "dev@achimsommer.com",
            "url": "https://achimsommer.com/services",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://github.com/Achim-Sommer",
              "https://linkedin.com/achim-sommer-b898a2185",
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 50.775346,
                "longitude": 6.083887
              },
              "geoRadius": 50000
            },
            "offers": serviceCategories.map(category => ({
              "@type": "Offer",
              "name": category.title,
              "description": category.description,
              "priceSpecification": {
                "@type": "PriceSpecification",
                "priceCurrency": "EUR",
                "minPrice": category.services[0].badge.replace(/[^0-9]/g, '')
              }
            }))
          })
        }}
      />

      {/* Breadcrumb strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://achimsommer.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://achimsommer.com/services"
              }
            ]
          })
        }}
      />

      {/* FAQ strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Welche IT-Dienstleistungen bieten Sie an?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Wir bieten professionelle Webentwicklung mit Next.js, Ubiquiti UniFi Netzwerklösungen, Smart Home Automation mit Home Assistant sowie Gaming Server Setup und Wartung an."
                }
              },
              {
                "@type": "Question",
                "name": "Wie läuft eine UniFi Netzwerk-Planung ab?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die UniFi Netzwerk-Planung beginnt mit einer Bestandsaufnahme Ihrer Räumlichkeiten und Anforderungen. Darauf basierend erstellen wir ein maßgeschneidertes Konzept für optimale WLAN-Abdeckung und Netzwerkleistung."
                }
              },
              {
                "@type": "Question",
                "name": "Was kostet eine Smart Home Beratung?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Eine Smart Home Beratung kostet 79€ und beinhaltet eine ausführliche Analyse Ihrer Anforderungen, Empfehlungen für passende Smart Home Geräte und eine Einschätzung der Automatisierungsmöglichkeiten."
                }
              },
              {
                "@type": "Question",
                "name": "Bieten Sie auch Support nach der Installation an?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja, wir bieten kontinuierlichen Support und Wartung für alle unsere Dienstleistungen an. Für UniFi-Systeme gibt es beispielsweise einen speziellen Wartungs- und Support-Service für 79€."
                }
              }
            ]
          })
        }}
      />

      {/* Sichtbare Breadcrumb-Navigation */}
      <nav className="relative z-50 mx-auto max-w-7xl px-4 py-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-400">
          <li className="relative">
            <Link
              href="/"
              className="hover:text-white transition-colors duration-200 cursor-pointer relative block"
            >
              <span className="relative z-50">Home</span>
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-white">Services</li>
        </ol>
      </nav>

      <div className="relative min-h-screen bg-black">
        {/* Hero Section mit Sparkles */}
        <div className="relative">
          {/* Marketing Section with increased top padding on mobile */}
          <div className="relative mt-8 md:mt-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-4xl font-bold text-white md:text-6xl px-4 mb-8 pt-12 md:pt-16"
            >
              Meine Dienstleistungen
            </motion.h1>

            {/* Two-Column Layout with adjusted spacing */}
            <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Left Side: Animated Terminal */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full"
              >
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 h-full">
                  <div className="flex items-center space-x-2 p-3 border-b border-gray-800">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-gray-400 text-sm font-mono">terminal</span>
                  </div>
                  <div className="p-4 font-mono text-sm overflow-x-auto">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-gray-300"
                    >
                      <span className="text-green-400">$</span> whoami<br />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                      >
                        <span className="text-blue-400">→</span> Full-Stack Developer & Smart Systems Engineer<br />
                      </motion.span>
                      <br />
                      <span className="text-green-400">$</span> experience --details<br />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                      >
                        <span className="text-blue-400">→</span> 15+ Jahre Technik-Enthusiast<br />
                        <span className="text-blue-400">→</span> B.Sc. Wirtschaftsinformatik<br />
                        <span className="text-blue-400">→</span> Spezialisiert auf Web & IoT<br />
                      </motion.span>
                      <br />
                      <span className="text-green-400">$</span> location<br />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1.4 }}
                      >
                        <span className="text-blue-400">→</span> Aachen & Umgebung<br />
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Right Side: Animated Text */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full flex flex-col justify-center space-y-6 text-gray-300"
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-xl leading-relaxed"
                >
                  Als <span className="text-blue-400">erfahrener Entwickler</span> und Technologie-Enthusiast kreiere ich innovative digitale Lösungen, die Ihr Business auf das nächste Level heben. Erfahren Sie mehr über meine <Link href="/blog/seo-optimierung-nextjs-websites-best-practices-2025" className="text-blue-400 hover:underline">SEO-Optimierung</Link> oder <Link href="/blog/nextjs-vs-react-welches-framework-ist-2025-die-bessere-wahl" className="text-blue-400 hover:underline">warum Next.js die beste Wahl ist</Link>.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="text-lg leading-relaxed"
                >
                  Von leistungsstarken <span className="text-green-400">Webanwendungen</span> über hochverfügbare <span className="text-orange-400">UniFi-Netzwerke</span> bis hin zu intelligenten <span className="text-purple-400">Smart Home</span> Systemen - ich biete Ihnen maßgeschneiderte Technologielösungen aus einer Hand.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="flex flex-wrap gap-3"
                >
                  {['TypeScript', 'React', 'Next.js', 'UniFi', 'Home Assistant', 'IoT'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/50 rounded-full text-sm border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div 
          ref={tabsRef}
          className={`${
            isSticky ? 'fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg shadow-lg' : ''
          } transition-all duration-300`}
        >
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {serviceCategories.map((category) => (
                <button
                  key={category.title}
                  onClick={() => scrollToCategory(category.title)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeCategory === category.title
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Sections */}
        {serviceCategories.map((category) => (
          <div
            key={category.title}
            ref={(el: HTMLDivElement | null) => {
              categoryRefs.current[category.title] = el;
            }}
            className="py-16"
          >
            <div className="mx-auto max-w-7xl px-4">
              <h2 className="mb-8 text-3xl font-bold text-white">{category.title}</h2>
              <p className="mb-8 text-xl text-gray-400">{category.description}</p>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {category.services.map((service, serviceIdx) => (
                  <BackgroundGradient key={serviceIdx} className="rounded-[22px] p-4 sm:p-10 h-full">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                          <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-400 border border-blue-500/20 flex items-center gap-1">
                            <RiSparklingFill className="h-3.5 w-3.5" />
                            {service.badge}
                          </span>
                        </div>
                        <p className="line-clamp-3 text-gray-400">{service.description}</p>
                        <ul className="mt-4 space-y-2">
                          {service.details.map((detail, detailIdx) => (
                            <li key={detailIdx} className="text-gray-300">
                              • {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-6 flex flex-col gap-4">
                        {service.consultation && (
                          <div className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-green-500/10 px-4 py-2 text-green-500">
                            <RiSparklingFill className="h-5 w-5" />
                            ✨ Kostenlose Erstberatung inklusive
                          </div>
                        )}
                        {service.link.startsWith('http') ? (
                          <a
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-center font-medium text-white transition-all hover:bg-blue-600"
                          >
                            Jetzt anfragen
                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                          </a>
                        ) : (
                          <Link
                            href={service.link}
                            className="group flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-center font-medium text-white transition-all hover:bg-blue-600"
                          >
                            Mehr erfahren
                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </BackgroundGradient>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Testimonials Section */}
        <div ref={testimonialsRef} className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-white">
              Was meine Kunden sagen
            </h2>
            <div className="relative h-[240px] w-full overflow-hidden">
              <div className="animate-scroll flex gap-8">
                {[...testimonials, ...testimonials].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex h-[240px] w-[400px] flex-shrink-0 flex-col rounded-xl border border-slate-800 bg-black p-6 shadow-xl"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          {item.icon}
                          <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                        </div>
                        <p className="line-clamp-3 text-gray-400">{item.description}</p>
                      </div>
                      <div className="border-t border-slate-800 pt-4">
                        <p className="font-medium text-blue-400">- {item.author}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div ref={faqRef} className="py-16 bg-black/50">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-white">
              Häufig gestellte Fragen
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-black p-6">
                <h3 className="mb-4 text-xl font-semibold text-white">Wie läuft die kostenlose Erstberatung ab?</h3>
                <p className="text-gray-400">
                  In einem 30-minütigen Gespräch besprechen wir Ihre Anforderungen und ich erstelle ein 
                  unverbindliches Angebot. Die Beratung kann per WhatsApp oder Video-Call stattfinden.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-black p-6">
                <h3 className="mb-4 text-xl font-semibold text-white">Was sind die Zahlungsbedingungen?</h3>
                <p className="text-gray-400">
                  Die Zahlung erfolgt in zwei Teilen: 50% bei Projektstart und 50% nach Fertigstellung. 
                  Für größere Projekte sind auch individuelle Zahlungspläne möglich.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-black p-6">
                <h3 className="mb-4 text-xl font-semibold text-white">Wie lange dauert die Umsetzung?</h3>
                <p className="text-gray-400">
                  Die Projektdauer hängt von Umfang und Komplexität ab. Eine Website ist in 1-4 Wochen 
                  fertig, Server-Setups in unter einer Stunde bis hin zu 2 Tagen je nach Umfang.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-black p-6">
                <h3 className="mb-4 text-xl font-semibold text-white">Gibt es Support nach Projektabschluss?</h3>
                <p className="text-gray-400">
                  Ja, ich biete 30 Tage kostenlosen Support nach Projektabschluss. Danach können wir einen 
                  individuellen Support-Vertrag vereinbaren oder Sie buchen Support nach Bedarf.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Kontakt Section */}
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Kontakt
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {contactMethods.map((method, index) => (
              <Link
                key={index}
                href={method.link}
                target={method.type === "whatsapp" ? "_blank" : undefined}
                rel={method.type === "whatsapp" ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-xl border border-slate-800 bg-black p-6 transition-transform hover:scale-105"
              >
                {method.icon}
                <div>
                  <h3 className="text-xl font-semibold text-white">{method.title}</h3>
                  <p className="text-gray-400">{method.value}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-4 z-50">
          <button
            onClick={() => scrollToSection(faqRef)}
            className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
            aria-label="Scroll to FAQ"
          >
            <FaQuestionCircle className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => scrollToSection(testimonialsRef)}
            className="p-4 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors duration-300"
            aria-label="Scroll to Testimonials"
          >
            <FaComments className="w-6 h-6 text-white" />
          </button>
          <Link
            href={`https://wa.me/4915678317784`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-green-600 hover:bg-green-500 transition-colors duration-300"
            aria-label="Contact on WhatsApp"
          >
            <FaWhatsapp className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>
    </>
  );
}
