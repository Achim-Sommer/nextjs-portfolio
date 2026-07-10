import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles-core';
import Link from 'next/link';
import {
  FaServer,
  FaUsers,
  FaShieldAlt,
  FaClock,
  FaMemory,
  FaGlobeEurope,
  FaCogs,
  FaSave,
  FaBolt,
  FaGift,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaBookOpen,
  FaGamepad,
  FaEuroSign,
  FaInfinity,
} from 'react-icons/fa';

const ZAP_URL = 'https://zap-hosting.com/serverpalworld';
const SITE_URL = 'https://achimsommer.com';
const ZAP_GREEN = '#57BB54';

// FAQ-Daten: werden gerendert UND als FAQPage-Schema (JSON-LD) ausgegeben
const faqs = [
  {
    question: 'Was kostet ein Palworld Server?',
    answer:
      'Ein Palworld Server bei ZAP-Hosting startet ab 7,14 € im Monat. Mit dem Rabattcode GermanGaming sparst du 20% auf den Mietpreis. Alternativ gibt es die Lifetime-Option ab 60 € – einmal zahlen, dauerhaft nutzen, ohne monatliche Kosten.',
  },
  {
    question: 'Palworld Server mieten oder kaufen – was ist besser?',
    answer:
      'Mieten ist ideal zum Einstieg: geringe Kosten, jederzeit kündbar. Kaufen (Lifetime) lohnt sich ab einer Laufzeit von etwa 8–9 Monaten – danach ist der einmalige Kaufpreis von 60 € günstiger als die monatliche Miete. Für langfristige Community-Server ist Lifetime meist die bessere Rechnung.',
  },
  {
    question: 'Wie viele Spieler passen auf einen Palworld Server?',
    answer:
      'Ein dedizierter Palworld Server unterstützt bis zu 32 Spieler gleichzeitig – deutlich mehr als der normale Koop-Modus, der auf 4 Spieler begrenzt ist und nur läuft, solange der Host online ist.',
  },
  {
    question: 'Wie viel RAM braucht ein Palworld Server?',
    answer:
      'Mindestens 8 GB RAM, empfohlen sind 16 GB – besonders bei vielen Spielern, großen Basen und langen Laufzeiten ohne Neustart. Palworld ist bekannt dafür, mit der Zeit viel Arbeitsspeicher zu belegen. Regelmäßige geplante Neustarts helfen zusätzlich.',
  },
  {
    question: 'Gilt der Rabattcode GermanGaming auch für Lifetime-Server?',
    answer:
      'Nein. Der Code GermanGaming (20% Rabatt) gilt nur für Mietserver mit monatlicher Laufzeit. Der Lifetime-Kauf ist ein einmaliger Festpreis ohne Rabattcode.',
  },
  {
    question: 'Wie schnell ist ein Palworld Server online?',
    answer:
      'In der Regel innerhalb weniger Minuten nach der Bestellung. Der Server wird automatisch eingerichtet – danach nur noch die Serverdaten (IP und Port) in Palworld eintragen und losspielen.',
  },
  {
    question: 'Läuft ein Lifetime-Server genauso wie ein Mietserver?',
    answer:
      'Ja. Der Lifetime-Server läuft im selben Rechenzentrum mit derselben Leistung, demselben Webpanel und denselben Backup-Funktionen wie ein Mietserver. Nur das Bezahlmodell ist anders: einmal zahlen statt monatlich.',
  },
];

const features = [
  {
    icon: <FaClock className="h-6 w-6" />,
    title: '24/7 online',
    text: 'Deine Welt läuft durchgehend weiter – auch wenn niemand spielt. Kein Host-PC nötig.',
  },
  {
    icon: <FaUsers className="h-6 w-6" />,
    title: 'Bis zu 32 Spieler',
    text: 'Statt 4 Spielern im Koop-Modus: Platz für die ganze Community auf einer Welt.',
  },
  {
    icon: <FaCogs className="h-6 w-6" />,
    title: 'Eigene Regeln',
    text: 'EXP-Rate, Fangrate, Schwierigkeit, PvP – du bestimmst, wie gespielt wird.',
  },
  {
    icon: <FaSave className="h-6 w-6" />,
    title: 'Automatische Backups',
    text: 'Palworld-Spielstände sind wertvoll. Backups schützen vor Crashes und Datenverlust.',
  },
  {
    icon: <FaGlobeEurope className="h-6 w-6" />,
    title: 'Deutsche Standorte',
    text: 'EU/DE-Rechenzentren für niedrigen Ping – wichtig bei Bosskämpfen und PvP.',
  },
  {
    icon: <FaMemory className="h-6 w-6" />,
    title: 'Genug RAM',
    text: 'Palworld ist RAM-hungrig. Die Server sind auf die Anforderungen des Spiels ausgelegt.',
  },
  {
    icon: <FaBolt className="h-6 w-6" />,
    title: 'In Minuten startklar',
    text: 'Automatische Einrichtung nach der Bestellung – Serverdaten eintragen, losspielen.',
  },
  {
    icon: <FaShieldAlt className="h-6 w-6" />,
    title: 'Updates & Panel',
    text: 'Automatische Updates nach dem 1.0 Release plus Webpanel für Start/Stop, Logs und Konfiguration.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Paket wählen',
    text: 'Slots und RAM passend zur Gruppengröße auswählen – für Palworld lieber etwas RAM-Puffer einplanen.',
  },
  {
    step: '02',
    title: 'Mieten oder Lifetime',
    text: 'Monatlich ab 7,14 € (flexibel, mit Code 20% sparen) oder einmalig ab 60 € (Lifetime, dauerhaft nutzen).',
  },
  {
    step: '03',
    title: 'Standort & Code',
    text: 'DE/EU-Standort für niedrigen Ping wählen. Bei Miete den Code GermanGaming im Checkout eintragen.',
  },
  {
    step: '04',
    title: 'Losspielen',
    text: 'Server wird automatisch eingerichtet. IP und Port in Palworld eintragen – fertig.',
  },
];

const breakEvenRows = [
  { months: '6 Monate', rent: '42,84 €', lifetime: '60 €', cheaper: 'Miete' },
  { months: '9 Monate', rent: '64,26 €', lifetime: '60 €', cheaper: 'Lifetime' },
  { months: '12 Monate', rent: '85,68 €', lifetime: '60 €', cheaper: 'Lifetime' },
  { months: '24 Monate', rent: '171,36 €', lifetime: '60 €', cheaper: 'Lifetime' },
  { months: '36 Monate', rent: '257,04 €', lifetime: '60 €', cheaper: 'Lifetime' },
];

export default function PalworldServer() {
  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Palworld Server mieten oder kaufen | ab 7,14 €/Monat oder 60 € Lifetime',
          description:
            'Palworld Server mieten ab 7,14 €/Monat oder kaufen statt mieten: Lifetime-Server ab 60 € – einmal zahlen, für immer nutzen. Bis 32 Spieler, DE-Standorte, in Minuten online. 20% Rabatt auf Mietserver mit Code GermanGaming.',
          canonical: `${SITE_URL}/palworld`,
          openGraph: {
            title: 'Palworld Server mieten oder kaufen | ab 7,14 €/Monat oder 60 € Lifetime',
            description:
              'Palworld Server mieten oder kaufen statt mieten: ab 7,14 €/Monat oder 60 € Lifetime (einmal zahlen, für immer nutzen). Bis 32 Spieler, deutsche Standorte, in Minuten online.',
            url: `${SITE_URL}/palworld`,
            images: [
              {
                url: `${SITE_URL}/api/og?title=${encodeURIComponent('Palworld Server mieten oder kaufen')}`,
                width: 1200,
                height: 630,
                alt: 'Palworld Server mieten oder kaufen - ab 7,14 €/Monat oder 60 € Lifetime',
              },
            ],
          },
          additionalMetaTags: [
            {
              name: 'keywords',
              content:
                'palworld server, palworld server mieten, palworld server kaufen, palworld server kaufen statt mieten, palworld server lifetime, palworld server hosting, palworld dedicated server, server kaufen statt mieten, palworld server günstig, palworld 1.0 server',
            },
          ],
        })}
      </Head>

      {/* FAQ-Schema für Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Palworld Server', item: `${SITE_URL}/palworld` },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.15),rgba(52,211,153,0.1),rgba(255,255,255,0))]">
        {/* Hero */}
        <div className="relative min-h-[70vh] md:min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0a0a0a] z-10" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,.3)_1px,transparent_1px)] bg-[size:35px_35px] z-0" />

          <div className="w-full absolute inset-0">
            <SparklesCore
              id="palworld-sparkles"
              background="transparent"
              minSize={0.8}
              maxSize={1.6}
              particleDensity={60}
              className="w-full h-full"
              particleColor="#38bdf8"
            />
          </div>

          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-sm font-mono mb-6"
            >
              <FaGamepad className="h-4 w-4" />
              Palworld 1.0 ist da – starte deine eigene Welt
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-400 mb-6 font-mono tracking-tight"
            >
              Palworld Server mieten oder kaufen
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Dein eigener Palworld Server: <strong className="text-sky-300">ab 7,14 € im Monat</strong> mieten
              oder als <strong className="text-emerald-300">Lifetime-Server ab 60 €</strong> kaufen –
              einmal zahlen, für immer nutzen.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <FaUsers className="text-sky-400 h-5 w-5" />
                <span className="text-gray-300">Bis zu 32 Spieler</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGlobeEurope className="text-emerald-400 h-5 w-5" />
                <span className="text-gray-300">Deutsche Standorte</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBolt className="text-amber-400 h-5 w-5" />
                <span className="text-gray-300">In Minuten online</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap justify-center items-center gap-4"
            >
              <a
                href={ZAP_URL}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-lg text-lg"
                style={{ backgroundColor: ZAP_GREEN, boxShadow: `0 10px 30px ${ZAP_GREEN}40` }}
              >
                <FaServer className="w-5 h-5" />
                Palworld Server holen
                <FaExternalLinkAlt className="w-4 h-4 opacity-70" />
              </a>
              <a
                href="#preise"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] transition-all text-gray-200 font-semibold text-lg"
              >
                <FaEuroSign className="w-4 h-4" />
                Preise vergleichen
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400"
            >
              <FaGift style={{ color: ZAP_GREEN }} />
              <span>
                Rabattcode <span className="font-mono font-bold text-gray-200">GermanGaming</span> – 20% auf
                Mietserver
              </span>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-24">
          {/* Preise: Mieten vs. Kaufen */}
          <div id="preise" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 font-mono tracking-tight mb-4">
                Mieten oder kaufen?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Beide Varianten laufen im selben Rechenzentrum mit derselben Leistung – der Unterschied ist
                nur das Bezahlmodell.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Mieten */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-8 bg-zinc-900/60 border border-sky-500/30 backdrop-blur-sm relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-cyan-400" />
                <div className="flex items-center gap-3 mb-2">
                  <FaClock className="text-sky-400 h-6 w-6" />
                  <h3 className="text-2xl font-bold text-white font-mono">Server mieten</h3>
                </div>
                <p className="text-gray-400 mb-6">Flexibel starten, monatlich kündbar</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-sky-300 font-mono">7,14 €</span>
                  <span className="text-gray-400 text-lg"> / Monat</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    'In Minuten startklar',
                    'Jederzeit kündbar oder upgradebar',
                    'Ideal zum Testen & für den Einstieg',
                    'Webpanel, Backups & Updates inklusive',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <FaCheck className="text-sky-400 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-gray-300">
                    <FaGift className="mt-1 shrink-0" style={{ color: ZAP_GREEN }} />
                    <span>
                      <span className="font-mono font-bold text-emerald-300">GermanGaming</span> – 20% Rabatt
                      auf den Mietpreis
                    </span>
                  </li>
                </ul>
                <a
                  href={ZAP_URL}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold transition-colors"
                >
                  Palworld Server mieten
                  <FaExternalLinkAlt className="w-3.5 h-3.5 opacity-70" />
                </a>
              </motion.div>

              {/* Kaufen / Lifetime */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-8 bg-zinc-900/60 border border-emerald-500/40 backdrop-blur-sm relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-400" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                  Langzeit-Tipp
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <FaInfinity className="text-emerald-400 h-6 w-6" />
                  <h3 className="text-2xl font-bold text-white font-mono">Server kaufen (Lifetime)</h3>
                </div>
                <p className="text-gray-400 mb-6">Einmal zahlen, für immer nutzen</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-emerald-300 font-mono">60 €</span>
                  <span className="text-gray-400 text-lg"> einmalig</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    'Keine monatlichen Kosten – nie wieder',
                    'Günstiger als Miete ab ca. 8–9 Monaten',
                    'Gleiche Leistung & gleiches Panel wie Mietserver',
                    'Ideal für Community & Langzeit-Welten',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <FaCheck className="text-emerald-400 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-gray-500">
                    <FaTimes className="mt-1 shrink-0 text-gray-600" />
                    <span>Rabattcode gilt hier nicht (einmaliger Festpreis)</span>
                  </li>
                </ul>
                <a
                  href={ZAP_URL}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-white font-bold transition-all"
                  style={{ backgroundColor: ZAP_GREEN }}
                >
                  Lifetime-Server kaufen
                  <FaExternalLinkAlt className="w-3.5 h-3.5 opacity-70" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Break-even Rechnung */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 rounded-2xl p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 font-mono tracking-tight mb-3">
              Kaufen statt mieten: Ab wann lohnt es sich?
            </h2>
            <p className="text-gray-400 mb-6">
              Die Rechnung ist simpel: 60 € Lifetime geteilt durch 7,14 € Monatsmiete ={' '}
              <strong className="text-gray-200">Break-even nach ca. 8–9 Monaten</strong>. Jeder Monat danach
              ist gespartes Geld.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead>
                  <tr className="border-b border-zinc-700 text-sm font-mono text-gray-400">
                    <th className="py-3 pr-4">Laufzeit</th>
                    <th className="py-3 pr-4">Miete (7,14 €/Monat)</th>
                    <th className="py-3 pr-4">Lifetime (einmalig)</th>
                    <th className="py-3">Günstiger</th>
                  </tr>
                </thead>
                <tbody>
                  {breakEvenRows.map((row, i) => (
                    <tr key={i} className="border-b border-zinc-800/60">
                      <td className="py-3 pr-4 font-mono">{row.months}</td>
                      <td className="py-3 pr-4">{row.rent}</td>
                      <td className="py-3 pr-4">{row.lifetime}</td>
                      <td className="py-3">
                        <span
                          className={
                            row.cheaper === 'Lifetime'
                              ? 'text-emerald-400 font-bold'
                              : 'text-sky-400 font-bold'
                          }
                        >
                          {row.cheaper}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Nach 3 Jahren hast du mit Lifetime fast 200 € gespart. Preise können je nach Paket (Slots, RAM)
              variieren – aktuelle Preise auf der Produktseite prüfen.
            </p>
          </motion.div>

          {/* Warum eigener Server */}
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 font-mono tracking-tight mb-4">
                Warum ein eigener Palworld Server?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Im Koop-Modus endet die Session, sobald der Host offline geht – und mehr als 4 Spieler sind
                nicht drin. Ein dedizierter Server löst beides.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-sky-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-sm group"
                >
                  <div className="text-sky-400 group-hover:text-cyan-300 transition-colors mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-bold font-mono mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Schritt für Schritt */}
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 font-mono tracking-tight mb-4">
                In 4 Schritten zum eigenen Server
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm relative"
                >
                  <span className="text-4xl font-bold font-mono text-sky-500/25 absolute top-4 right-5">
                    {item.step}
                  </span>
                  <h3 className="text-white font-bold font-mono mb-2 mt-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <a
                href={ZAP_URL}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-lg text-lg"
                style={{ backgroundColor: ZAP_GREEN, boxShadow: `0 10px 30px ${ZAP_GREEN}40` }}
              >
                <FaServer className="w-5 h-5" />
                Jetzt Palworld Server starten
                <FaExternalLinkAlt className="w-4 h-4 opacity-70" />
              </a>
            </motion.div>
          </div>

          {/* Guides / Blog-Artikel */}
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 font-mono tracking-tight mb-4">
                Ausführliche Guides
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Du willst mehr Details? In den Guides findest du Einstellungen, Performance-Tipps und die
                komplette Kostenrechnung.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/blog/palworld-server-mieten"
                  className="block p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-sky-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] group h-full"
                >
                  <div className="flex items-center gap-3 text-sky-400 mb-3">
                    <FaBookOpen className="h-5 w-5" />
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Guide</span>
                  </div>
                  <h3 className="text-white font-bold font-mono mb-2 group-hover:text-sky-300 transition-colors">
                    Palworld Server mieten: Der komplette Guide
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Schritt-für-Schritt Anleitung, RAM-Empfehlungen, wichtige Einstellungen nach der
                    Bestellung und Performance-Tipps.
                  </p>
                  <span className="inline-block mt-4 text-sky-400 text-sm font-mono group-hover:translate-x-1 transition-transform">
                    Zum Guide →
                  </span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/blog/palworld-server-kaufen-statt-mieten-lifetime"
                  className="block p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.15)] group h-full"
                >
                  <div className="flex items-center gap-3 text-emerald-400 mb-3">
                    <FaBookOpen className="h-5 w-5" />
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Guide</span>
                  </div>
                  <h3 className="text-white font-bold font-mono mb-2 group-hover:text-emerald-300 transition-colors">
                    Palworld Server kaufen statt mieten (Lifetime)
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Der komplette Kostenvergleich: Break-even-Rechnung, Risiken und für wen sich die
                    Lifetime-Option wirklich lohnt.
                  </p>
                  <span className="inline-block mt-4 text-emerald-400 text-sm font-mono group-hover:translate-x-1 transition-transform">
                    Zum Guide →
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 rounded-2xl p-8 md:p-10 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 font-mono tracking-tight mb-8">
              Häufige Fragen zum Palworld Server
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="space-y-2 pb-6 border-b border-zinc-800/60 last:border-0 last:pb-0">
                  <h3 className="text-white font-bold text-lg">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 rounded-2xl bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-emerald-500/10 p-[1px] relative overflow-hidden max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl bg-zinc-900/90 p-10 backdrop-blur-sm text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 font-mono tracking-tight mb-4">
                Bereit für deine eigene Palworld-Welt?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Ab 7,14 € im Monat mieten oder ab 60 € einmalig kaufen – in wenigen Minuten online.
              </p>
              <a
                href={ZAP_URL}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-lg text-lg"
                style={{ backgroundColor: ZAP_GREEN, boxShadow: `0 10px 30px ${ZAP_GREEN}40` }}
              >
                <FaServer className="w-5 h-5" />
                Palworld Server bei ZAP-Hosting holen
                <FaExternalLinkAlt className="w-4 h-4 opacity-70" />
              </a>
              <p className="mt-5 text-sm text-gray-400">
                <FaGift className="inline mr-1.5" style={{ color: ZAP_GREEN }} />
                Code <span className="font-mono font-bold text-gray-200">GermanGaming</span> = 20% Rabatt auf
                Mietserver
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
