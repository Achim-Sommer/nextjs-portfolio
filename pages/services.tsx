import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { motion } from "framer-motion";
import { Iso3DIcon } from "@/components/ui/iso-3d-icon";
import { Hero3DElements, Stat3DCard } from "@/components/ui/hero-3d-elements";
import {
  FaWhatsapp, FaEnvelope, FaCode, FaArrowRight,
  FaVideo, FaQuestionCircle, FaShieldAlt, FaChartLine,
  FaCheckCircle, FaStar
} from "react-icons/fa";
import { RiSparklingFill } from "react-icons/ri";
import { MdRouter } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

/* ───────────────────────────── Service-Kategorien ───────────────────────────── */
const serviceCategories = [
  {
    id: "webentwicklung",
    title: "Webentwicklung",
    subtitle: "Moderne Websites & Web-Apps mit Next.js, React & TypeScript",
    description:
      "Professionelle Webentwicklung mit React, Next.js und TypeScript. Von responsiven Business-Websites bis zu komplexen Web-Applikationen – performance-optimiert, SEO-freundlich und DSGVO-konform. Jede Website wird individuell gestaltet und für Core Web Vitals optimiert.",
    icon: <FaCode className="h-10 w-10" />,
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    accentColor: "emerald",
    services: [
      {
        title: "Next.js Website & Blog Entwicklung",
        description:
          "Moderne, blitzschnelle und SEO-optimierte Websites mit Next.js 14+ und App Router. Server-Side Rendering, Static Generation und Incremental Revalidation für beste Performance.",
        details: [
          "Responsive & Mobile-First Design",
          "Performance-Optimierung (Core Web Vitals 100/100)",
          "Headless CMS Integration (Sanity, Strapi, Contentful)",
          "Analytics & Conversion Tracking",
          "Barrierefreiheit nach WCAG 2.1"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 199€",
        consultation: true
      },
      {
        title: "Portfolio & Business Websites",
        description:
          "Professionelle Webauftritte für Freelancer, Startups und KMU. Individuelles Design, optimale User Experience und messbare Ergebnisse durch datengetriebene SEO-Strategie.",
        details: [
          "Individuelles UI/UX Design",
          "On-Page & Technical SEO",
          "Mobile-First Ansatz",
          "Content-Strategie & Copywriting",
          "SSL & DSGVO-konforme Implementierung"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 99€",
        consultation: true
      },
      {
        title: "Web-App & SaaS Entwicklung",
        description:
          "Komplexe Web-Applikationen und SaaS-Produkte mit modernem Tech-Stack. Von der Architektur-Planung bis zum Go-Live – inklusive CI/CD und Monitoring.",
        details: [
          "Full-Stack TypeScript & React",
          "RESTful APIs & GraphQL",
          "Authentifizierung & Autorisierung",
          "Cloud-Deployment (Vercel, AWS, Hetzner)",
          "Automatisierte Tests & CI/CD"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Auf Anfrage",
        consultation: true
      }
    ]
  },
  {
    id: "unifi-netzwerk",
    title: "UniFi Netzwerklösungen",
    subtitle: "Enterprise-Grade Netzwerke für Unternehmen & Zuhause",
    description:
      "Professionelle Ubiquiti UniFi Netzwerkinfrastruktur – von der Planung bis zur Installation. Access Points, Switches, Gateways und Security Appliances aus einer Hand. Perfekt abgestimmte Netzwerke mit VLANs, Gäste-WLANs, Threat Management und zentralem Cloud-Management.",
    icon: <MdRouter className="h-10 w-10" />,
    gradient: "from-blue-500/20 via-sky-500/10 to-transparent",
    accentColor: "blue",
    services: [
      {
        title: "UniFi Netzwerk-Planung & Design",
        description:
          "Ganzheitliche Netzwerkplanung mit professioneller Standortanalyse, Heatmap-Erstellung und Hardware-Empfehlung. Für Büros, Praxen, Gastronomie, Hotels und Privathaushalte.",
        details: [
          "Professionelle WLAN-Heatmap & Standortanalyse",
          "Hardware-Dimensionierung & Budgetplanung",
          "VLAN-Konzept & Netzwerksegmentierung",
          "Bandbreiten-Planung & QoS-Konfiguration",
          "Dokumentation & Netzwerkdiagramme"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 149€",
        consultation: true
      },
      {
        title: "UniFi Access Points & WLAN",
        description:
          "Installation und Konfiguration von UniFi WiFi 6 / WiFi 6E / WiFi 7 Access Points für lückenlose WLAN-Abdeckung. Optimale Kanalplanung und Band-Steering für maximale Performance.",
        details: [
          "WiFi 6E & WiFi 7 (U7 Pro, U6 Enterprise)",
          "Seamless Roaming & Band-Steering",
          "Gäste-Portal mit Captive Portal",
          "Hotspot-Manager für Gastronomie",
          "WLAN-Optimierung & Kanalplanung"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 129€",
        consultation: true
      },
      {
        title: "UniFi Gateways & Firewalls",
        description:
          "UniFi Dream Machine (UDM), UDM Pro, UDM SE oder Cloud Gateway Ultra – leistungsstarke Gateways mit integrierter Firewall, IDS/IPS und VPN für maximale Sicherheit.",
        details: [
          "UDM Pro / UDM SE / Cloud Gateway Setup",
          "Firewall-Regeln & Traffic Rules",
          "IDS/IPS Threat Management",
          "Site-to-Site & Client VPN (WireGuard, L2TP)",
          "Traffic-Analyse & Deep Packet Inspection"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 199€",
        consultation: true
      },
      {
        title: "UniFi Switching & PoE",
        description:
          "Managed Switches mit PoE/PoE+ für saubere Netzwerkinfrastruktur. Professionelle Verkabelung, VLAN-Trunks und Link Aggregation für Hochverfügbarkeit.",
        details: [
          "Managed PoE++ Switches (USW Pro, Enterprise)",
          "VLAN-Konfiguration & Trunking",
          "Link Aggregation (LAG)",
          "PoE-Budget-Planung",
          "Spanning Tree & Loop Prevention"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 99€",
        consultation: true
      }
    ]
  },
  {
    id: "unifi-protect",
    title: "UniFi Protect & Sicherheit",
    subtitle: "Professionelle Videoüberwachung mit Ubiquiti",
    description:
      "UniFi Protect Überwachungssysteme mit 4K-Kameras, KI-basierter Erkennung und lokalem Speicher – ohne monatliche Cloud-Gebühren. DSGVO-konform mit lokaler Datenhaltung und granularer Zugriffskontrolle.",
    icon: <FaVideo className="h-10 w-10" />,
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    accentColor: "orange",
    services: [
      {
        title: "UniFi Protect Kamerasystem",
        description:
          "Installation von UniFi Protect mit G5 Pro, G5 Bullet, G5 Turret und AI-Kameras. Lokale Aufzeichnung auf NVR oder UDM Pro – keine Cloud-Abhängigkeit.",
        details: [
          "4K-Kameras mit Nachtsicht & IR",
          "KI-Erkennung (Personen, Fahrzeuge, Pakete)",
          "Lokale Aufzeichnung (NVR / UDM Pro)",
          "DSGVO-konforme Videoüberwachung",
          "Mobile App & Echtzeit-Benachrichtigungen"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 249€",
        consultation: true
      },
      {
        title: "UniFi Access Zutrittskontrolle",
        description:
          "Smarte Zutrittskontrolle mit UniFi Access. NFC-Karten, PIN-Codes und Smartphone-Zugang für Büros, Praxen und Mehrfamilienhäuser.",
        details: [
          "Access Hub & Reader Installation",
          "NFC-Karten & Mobile Unlock",
          "Zeitgesteuerte Zugangsregeln",
          "Besuchermanagement",
          "Integration mit UniFi Protect"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 299€",
        consultation: true
      },
      {
        title: "UniFi Talk VoIP-Telefonie",
        description:
          "Cloud-basierte VoIP-Telefonanlage direkt im UniFi OS. Nahtlose Integration in Ihr bestehendes UniFi Ecosystem mit Touch-Telefonen und Flex Phones.",
        details: [
          "UniFi Talk Phone-Konfiguration",
          "SIP-Trunk Anbindung",
          "Rufgruppen & Warteschleifen",
          "Auto-Attendant / IVR",
          "Mobile App Integration"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 199€",
        consultation: true
      }
    ]
  },
  {
    id: "unifi-wartung",
    title: "UniFi Wartung & Managed Services",
    subtitle: "Proaktiver Support für Ihr Ubiquiti Netzwerk",
    description:
      "Regelmäßige Wartung, Firmware-Updates, Performance-Monitoring und schneller Remote-Support. Damit Ihr UniFi Netzwerk immer zuverlässig und sicher läuft – auch ohne eigene IT-Abteilung.",
    icon: <FaShieldAlt className="h-10 w-10" />,
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accentColor: "violet",
    services: [
      {
        title: "UniFi Wartungsvertrag",
        description:
          "Regelmäßige Firmware-Updates, Sicherheits-Patches und proaktives Monitoring Ihrer gesamten UniFi Infrastruktur. Inklusive monatlichem Health-Report.",
        details: [
          "Monatliche Firmware-Updates",
          "24/7 Uptime-Monitoring",
          "Proaktive Fehlererkennung",
          "Monatlicher Health-Report",
          "Priorisierter Support"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 79€/mtl.",
        consultation: true
      },
      {
        title: "Remote-Management & Support",
        description:
          "Schnelle Hilfe bei Netzwerkproblemen per Remote-Zugriff. VLAN-Änderungen, neue SSIDs, Firewall-Anpassungen oder Troubleshooting – alles ohne Vor-Ort-Termin.",
        details: [
          "Cloud Console Fernverwaltung",
          "Konfigurationsänderungen on-demand",
          "Troubleshooting & Fehleranalyse",
          "Performance-Optimierung",
          "Notfall-Support per WhatsApp"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 49€/h",
        consultation: true
      },
      {
        title: "Netzwerk-Audit & Migration",
        description:
          "Analyse Ihres bestehenden Netzwerks und professionelle Migration zu UniFi. Detaillierter Bericht mit Handlungsempfehlungen und Migrationsplan.",
        details: [
          "Ist-Analyse & Schwachstellen-Scan",
          "Migrationsstrategie & Zeitplan",
          "Zero-Downtime Migration",
          "Konfigurationstransfer",
          "Schulung für Ihr Team"
        ],
        link: "https://wa.me/4915678317784",
        badge: "Ab 249€",
        consultation: true
      }
    ]
  }
];

/* ───────────────────────────── Statistiken ───────────────────────────── */
const stats = [
  { label: "Projekte abgeschlossen", value: "50+", icon: <FaCheckCircle /> },
  { label: "UniFi Geräte installiert", value: "200+", icon: <MdRouter /> },
  { label: "Zufriedene Kunden", value: "30+", icon: <FaStar /> },
  { label: "Jahre Erfahrung", value: "7+", icon: <FaChartLine /> }
];

/* ───────────────────────────── Kontaktmethoden ───────────────────────────── */
const contactMethods = [
  {
    icon: <FaWhatsapp className="h-7 w-7 text-green-500" />,
    title: "WhatsApp Business",
    value: "+49 156 78317784",
    link: "https://wa.me/4915678317784",
    type: "whatsapp",
    cta: "Jetzt schreiben"
  },
  {
    icon: <FaEnvelope className="h-7 w-7 text-blue-500" />,
    title: "E-Mail",
    value: "dev@achimsommer.com",
    link: "mailto:dev@achimsommer.com",
    type: "email",
    cta: "E-Mail senden"
  }
];

/* ───────────────────────────── FAQ ───────────────────────────── */
const faqItems = [
  {
    question: "Wie läuft die kostenlose Erstberatung ab?",
    answer:
      "In einem 30-minütigen Gespräch besprechen wir Ihre Anforderungen. Ich erstelle ein unverbindliches Angebot mit Zeitschätzung und transparenten Kosten. Die Beratung kann per WhatsApp, Telefon oder Video-Call stattfinden."
  },
  {
    question: "Welche UniFi Produkte empfehlen Sie?",
    answer:
      "Das hängt von der Größe und den Anforderungen ab. Für kleinere Installationen empfehle ich das Cloud Gateway Ultra mit U6+ Access Points. Für Unternehmen die UDM Pro / UDM SE mit WiFi 6E oder WiFi 7 APs und Managed PoE-Switches."
  },
  {
    question: "Übernehmen Sie auch die Verkabelung vor Ort?",
    answer:
      "Ja, auf Wunsch übernehme ich die komplette Verkabelung inklusive Patchpanels, Keystone-Jacks und strukturierter Kabelführung. Im Raum Aachen, Köln und Düsseldorf komme ich persönlich vorbei."
  },
  {
    question: "Was sind die Zahlungsbedingungen?",
    answer:
      "50 % bei Projektstart, 50 % nach Fertigstellung. Für größere Projekte sind individuelle Zahlungspläne möglich. Alle Preise enthalten die gesetzliche MwSt."
  },
  {
    question: "Kann ich mein bestehendes Netzwerk auf UniFi umstellen?",
    answer:
      "Absolut. Ich erstelle eine Ist-Analyse Ihres Netzwerks und plane eine Zero-Downtime Migration. Bestehende VLANs, Firewall-Regeln und Dienste werden nahtlos übernommen."
  },
  {
    question: "Bieten Sie Wartung und Support nach der Installation an?",
    answer:
      "Ja! 30 Tage kostenloser Support nach Projektabschluss sind inklusive. Danach biete ich monatliche Wartungsverträge ab 79 €/Monat oder On-Demand Support ab 49 €/Stunde an."
  }
];

/* ───────────────────────────── Hilfsfunktionen ───────────────────────────── */
interface CategoryRefs {
  [key: string]: HTMLDivElement | null;
}

const accentMap: Record<string, { bg: string; text: string; border: string; badgeBg: string; hoverBorder: string; hoverShadow: string }> = {
  emerald: {
    bg: "bg-emerald-500",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    badgeBg: "bg-emerald-500/10",
    hoverBorder: "hover:border-emerald-500/30",
    hoverShadow: "hover:shadow-emerald-500/5"
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-400",
    border: "border-blue-500/30",
    badgeBg: "bg-blue-500/10",
    hoverBorder: "hover:border-blue-500/30",
    hoverShadow: "hover:shadow-blue-500/5"
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-400",
    border: "border-orange-500/30",
    badgeBg: "bg-orange-500/10",
    hoverBorder: "hover:border-orange-500/30",
    hoverShadow: "hover:shadow-orange-500/5"
  },
  violet: {
    bg: "bg-violet-500",
    text: "text-violet-400",
    border: "border-violet-500/30",
    badgeBg: "bg-violet-500/10",
    hoverBorder: "hover:border-violet-500/30",
    hoverShadow: "hover:shadow-violet-500/5"
  }
};

/* ───────────────────────────── Page Component ───────────────────────────── */
export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const categoryRefs = useRef<CategoryRefs>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const initialTabsPosition = useRef<number | null>(null);

  useEffect(() => {
    if (tabsRef.current && initialTabsPosition.current === null) {
      initialTabsPosition.current = tabsRef.current.offsetTop;
    }

    const handleScroll = () => {
      if (tabsRef.current && initialTabsPosition.current !== null) {
        const navbarHeight = 70;
        setIsSticky(window.scrollY + navbarHeight >= initialTabsPosition.current);
      }

      const scrollPosition = window.scrollY + 200;
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 130,
        behavior: "smooth"
      });
    }
  };

  const scrollToCategory = (category: string) => {
    const ref = categoryRefs.current[category];
    if (ref) {
      window.scrollTo({
        top: ref.offsetTop - 130,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* ──── SEO Head ──── */}
      <Head>
        {generateNextSeo({
          title:
            "Webentwicklung & Ubiquiti UniFi Netzwerklösungen | Achim Sommer – Aachen",
          description:
            "Professionelle Webentwicklung mit Next.js & React sowie Ubiquiti UniFi Netzwerkplanung, Installation & Wartung in Aachen, Köln und NRW. WiFi 6E/7 Access Points, UniFi Protect Kameras, Gateways & Managed Services. Kostenlose Erstberatung!",
          canonical: "https://achimsommer.com/services",
          openGraph: {
            url: "https://achimsommer.com/services",
            title:
              "IT Services – Webentwicklung & Ubiquiti UniFi Netzwerke | Achim Sommer",
            description:
              "Moderne Webentwicklung mit Next.js und professionelle UniFi Netzwerklösungen – Planung, Installation, Überwachung und Wartung aus einer Hand.",
            images: [
              {
                url: "https://achimsommer.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Achim Sommer – Webentwicklung & UniFi Netzwerklösungen"
              }
            ]
          },
          additionalMetaTags: [
            {
              name: "keywords",
              content:
                "Webentwicklung Next.js, React Entwickler, UniFi Netzwerk, Ubiquiti Installation, UniFi Protect Kameras, UniFi Access Points WiFi 7, Netzwerkplanung Aachen, IT Dienstleistungen NRW, WLAN Planung Unternehmen, UniFi Dream Machine Pro, Managed Network Services"
            },
            { name: "author", content: "Achim Sommer" },
            { name: "robots", content: "index, follow" }
          ]
        })}
      </Head>

      {/* ──── Schema.org: ProfessionalService ──── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Achim Sommer – Webentwicklung & UniFi Netzwerklösungen",
            image: "https://achimsommer.com/og-image.jpg",
            description:
              "Professionelle Webentwicklung mit Next.js und Ubiquiti UniFi Netzwerklösungen in Aachen und NRW.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Adalbertsteinweg 156",
              addressLocality: "Aachen",
              postalCode: "52066",
              addressCountry: "DE"
            },
            areaServed: ["Aachen", "Köln", "Düsseldorf", "NRW", "Deutschland"],
            priceRange: "€49–€299+",
            telephone: "+49 156 78317784",
            email: "dev@achimsommer.com",
            url: "https://achimsommer.com/services",
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00"
            },
            sameAs: [
              "https://github.com/Achim-Sommer",
              "https://linkedin.com/achim-sommer-b898a2185"
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "IT Dienstleistungen",
              itemListElement: serviceCategories.map((cat) => ({
                "@type": "OfferCatalog",
                name: cat.title,
                description: cat.description,
                itemListElement: cat.services.map((s) => ({
                  "@type": "Offer",
                  name: s.title,
                  description: s.description,
                  priceCurrency: "EUR"
                }))
              }))
            }
          })
        }}
      />

      {/* ──── Schema.org: BreadcrumbList ──── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://achimsommer.com" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://achimsommer.com/services" }
            ]
          })
        }}
      />

      {/* ──── Schema.org: FAQPage ──── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer }
            }))
          })
        }}
      />

      {/* ──── Breadcrumb ──── */}
      <nav className="relative z-50 mx-auto max-w-7xl px-4 py-4" aria-label="Brotkrumen-Navigation">
        <ol className="flex items-center space-x-2 text-sm text-gray-400">
          <li>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li className="text-white font-medium">Services</li>
        </ol>
      </nav>

      <div className="relative min-h-screen bg-black">
        {/* ════════════════════ HERO SECTION ════════════════════ */}
        <section className="relative overflow-hidden">
          {/* Subtle radial gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />

          {/* 3D Floating Elements */}
          <Hero3DElements />

          <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 md:pt-20 md:pb-28">
            {/* Hero Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                <RiSparklingFill className="h-4 w-4" />
                Kostenlose Erstberatung
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mt-4">
                Webentwicklung &{" "}
                <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                  UniFi Netzwerke
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400 md:text-xl leading-relaxed">
                Ich entwickle performante Websites mit{" "}
                <span className="text-emerald-400 font-medium">Next.js & React</span>{" "}
                und plane professionelle{" "}
                <span className="text-blue-400 font-medium">Ubiquiti UniFi Netzwerke</span>{" "}
                – maßgeschneidert für Unternehmen und anspruchsvolle Privatkunden in Aachen und NRW.
              </p>
            </motion.div>

            {/* Hero CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            >
              <a
                href="https://wa.me/4915678317784"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 hover:scale-[1.02]"
              >
                <FaWhatsapp className="h-5 w-5" />
                Kostenlos beraten lassen
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => scrollToCategory("Webentwicklung")}
                className="flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/50 px-8 py-4 text-lg font-medium text-gray-300 transition-all hover:border-gray-500 hover:text-white hover:bg-gray-800/50"
              >
                Services entdecken
                <FaArrowRight className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Stats row – 3D Cards */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((s, i) => (
                <Stat3DCard
                  key={i}
                  icon={s.icon}
                  value={s.value}
                  label={s.label}
                  index={i}
                />
              ))}
            </div>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              {[
                "Next.js",
                "React",
                "TypeScript",
                "UniFi OS",
                "WiFi 7",
                "UniFi Protect",
                "VLANs",
                "PoE++"
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-700/50 bg-gray-800/40 px-4 py-1.5 text-sm text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════ CATEGORY TABS ════════════════════ */}
        <div
          ref={tabsRef}
          className={`${
            isSticky
              ? "fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-xl shadow-black/20"
              : ""
          } transition-all duration-300`}
        >
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {serviceCategories.map((category) => {
                const accent = accentMap[category.accentColor];
                const isActive = activeCategory === category.title;
                return (
                  <button
                    key={category.title}
                    onClick={() => scrollToCategory(category.title)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? `${accent.bg} text-white shadow-lg`
                        : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                    }`}
                  >
                    {category.title}
                  </button>
                );
              })}
              <button
                onClick={() => scrollToSection(faqRef)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-gray-800/60"
              >
                FAQ
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════ SERVICE SECTIONS ════════════════════ */}
        {serviceCategories.map((category) => {
          const accent = accentMap[category.accentColor];
          return (
            <section
              key={category.title}
              ref={(el: HTMLDivElement | null) => {
                categoryRefs.current[category.title] = el;
              }}
              className="relative py-20 md:py-28"
              id={category.id}
            >
              {/* Section gradient glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${category.gradient} pointer-events-none`}
              />

              <div className="relative mx-auto max-w-7xl px-4">
                {/* Section header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="mb-14"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                    <Iso3DIcon
                      icon={category.icon}
                      color={category.accentColor as "emerald" | "blue" | "orange" | "violet"}
                      size="lg"
                    />
                    <div className="pt-1">
                      <h2 className="text-3xl font-bold text-white md:text-4xl">
                        {category.title}
                      </h2>
                      <p className={`text-sm font-medium ${accent.text} mt-1.5`}>
                        {category.subtitle}
                      </p>
                      <p className="max-w-3xl text-lg text-gray-400 leading-relaxed mt-3">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Service cards grid */}
                <div
                  className={`grid gap-8 ${
                    category.services.length === 3
                      ? "md:grid-cols-2 lg:grid-cols-3"
                      : "md:grid-cols-2"
                  }`}
                >
                  {category.services.map((service, sIdx) => (
                    <motion.div
                      key={sIdx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: sIdx * 0.1 }}
                      className="h-full"
                    >
                      <div className={`group flex h-full flex-col justify-between rounded-2xl border border-gray-800/50 bg-gray-900/40 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 ${accent.hoverBorder} hover:bg-gray-900/70 hover:shadow-2xl ${accent.hoverShadow} hover:-translate-y-1`}>
                        <div>
                          {/* Card header */}
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <h3 className="text-xl font-semibold text-white leading-tight group-hover:text-white transition-colors">
                              {service.title}
                            </h3>
                            <span
                              className={`flex-shrink-0 rounded-full ${accent.badgeBg} px-3 py-1.5 text-sm font-semibold ${accent.text} border ${accent.border} flex items-center gap-1.5 whitespace-nowrap`}
                            >
                              <RiSparklingFill className="h-3.5 w-3.5" />
                              {service.badge}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-gray-400 leading-relaxed mb-5">
                            {service.description}
                          </p>

                          {/* Details list */}
                          <ul className="space-y-2.5">
                            {service.details.map((detail, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-start gap-2.5 text-gray-300 text-sm"
                              >
                                <FaCheckCircle
                                  className={`h-4 w-4 ${accent.text} mt-0.5 flex-shrink-0`}
                                />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Card footer */}
                        <div className="mt-8 flex flex-col gap-3">
                          {service.consultation && (
                            <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-sm font-medium text-emerald-400">
                              <RiSparklingFill className="h-4 w-4" />
                              Kostenlose Erstberatung inklusive
                            </div>
                          )}
                          <a
                            href={service.link}
                            target={service.link.startsWith("http") ? "_blank" : undefined}
                            rel={
                              service.link.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className={`group/btn flex items-center justify-center gap-2 rounded-xl ${accent.bg} px-6 py-3.5 text-center font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] shadow-lg`}
                          >
                            {service.link.startsWith("http")
                              ? "Jetzt anfragen"
                              : "Mehr erfahren"}
                            <FaArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* ════════════════════ FAQ SECTION ════════════════════ */}
        <section ref={faqRef} className="py-20 md:py-28 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent" id="faq">
          <div className="mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Häufig gestellte Fragen
              </h2>
              <p className="mt-3 text-gray-400 text-lg">
                Antworten auf die wichtigsten Fragen zu meinen Services
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left rounded-2xl border border-gray-800/60 bg-gray-900/30 p-6 transition-all hover:border-gray-700/60 hover:bg-gray-900/50"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-white">
                        {faq.question}
                      </h3>
                      <span
                        className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                          openFaq === idx ? "rotate-45" : ""
                        }`}
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </span>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === idx ? "auto" : 0,
                        opacity: openFaq === idx ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-400 leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ CTA / KONTAKT ════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-gray-800/60 bg-gradient-to-br from-blue-600/10 via-gray-900/40 to-emerald-600/10 p-8 md:p-14 text-center backdrop-blur-sm"
            >
              <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
                Bereit für Ihr Projekt?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Egal ob Website-Relaunch oder UniFi Netzwerkinstallation – ich berate
                Sie kostenlos und unverbindlich.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 max-w-lg mx-auto">
                {contactMethods.map((method, i) => (
                  <a
                    key={i}
                    href={method.link}
                    target={method.type === "whatsapp" ? "_blank" : undefined}
                    rel={method.type === "whatsapp" ? "noopener noreferrer" : undefined}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-700/50 bg-gray-900/50 p-6 transition-all hover:border-gray-600 hover:bg-gray-800/50 hover:scale-[1.02]"
                  >
                    {method.icon}
                    <span className="text-lg font-semibold text-white">
                      {method.title}
                    </span>
                    <span className="text-sm text-gray-400">{method.value}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300">
                      {method.cta}
                      <FaArrowRight className="transition-transform group-hover:translate-x-1 h-3 w-3" />
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════ FLOATING ACTION BUTTONS ════════════════════ */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
          <button
            onClick={() => scrollToSection(faqRef)}
            className="p-3.5 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700 transition-all hover:scale-105 shadow-lg"
            aria-label="Zu den FAQ scrollen"
          >
            <FaQuestionCircle className="w-5 h-5 text-white" />
          </button>
          <a
            href="https://wa.me/4915678317784"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-full bg-green-600/80 backdrop-blur-sm border border-green-500/30 hover:bg-green-500 transition-all hover:scale-105 shadow-lg"
            aria-label="Per WhatsApp kontaktieren"
          >
            <FaWhatsapp className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </>
  );
}
