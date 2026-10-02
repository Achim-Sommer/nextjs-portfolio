import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { ogImageUrl } from '@/lib/og-image';
import {
  FaAmbulance,
  FaBuilding,
  FaBus,
  FaCar,
  FaCarCrash,
  FaCut,
  FaDice,
  FaDog,
  FaGamepad,
  FaFish,
  FaGasPump,
  FaKey,
  FaMobileAlt,
  FaPlane,
  FaShip,
  FaStore,
  FaTaxi,
  FaTruck,
  FaTshirt,
  FaWhatsapp,
  FaWrench,
} from 'react-icons/fa';
import { GiBank, GiCardPlay, GiPokerHand, GiPoliceOfficerHead, GiSteeringWheel } from 'react-icons/gi';
import { FiCode, FiDownload, FiGithub, FiGlobe, FiHeadphones, FiServer, FiUsers } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Container, Reveal, SectionHeading } from '@/components/home/primitives';
import { ArrowIcon, FactList, LandingHero, LandingSection, buttonClass } from '@/components/landing/ui';

const SHOP_URL = 'https://achim.tebex.io/category/esx-legacy-template';
const FEATURE_ICON = 'h-4 w-4';

const allFeatures = {
  shops: [
    { name: 'Flugzeugshop', icon: <FaPlane className={FEATURE_ICON} /> },
    { name: 'Bootshop', icon: <FaShip className={FEATURE_ICON} /> },
    { name: 'Truckshop', icon: <FaTruck className={FEATURE_ICON} /> },
    { name: 'Vehicleshop', icon: <FaCar className={FEATURE_ICON} /> },
    { name: 'Waschanlage', icon: <FaCarCrash className={FEATURE_ICON} /> },
    { name: 'Kleidungsshop', icon: <FaTshirt className={FEATURE_ICON} /> },
    { name: 'Supermarket', icon: <FaStore className={FEATURE_ICON} /> },
    { name: 'Tankstellen', icon: <FaGasPump className={FEATURE_ICON} /> },
    { name: 'LScustom', icon: <FaWrench className={FEATURE_ICON} /> },
    { name: 'Barbarshop', icon: <FaCut className={FEATURE_ICON} /> },
  ],
  jobs: [
    { name: 'Polizei', icon: <GiPoliceOfficerHead className={FEATURE_ICON} /> },
    { name: 'Rettungsdienst', icon: <FaAmbulance className={FEATURE_ICON} /> },
    { name: 'Mechaniker', icon: <FaWrench className={FEATURE_ICON} /> },
    { name: 'Fischer', icon: <FaFish className={FEATURE_ICON} /> },
    { name: 'Busfahrer', icon: <FaBus className={FEATURE_ICON} /> },
    { name: 'Taxifahrer', icon: <FaTaxi className={FEATURE_ICON} /> },
  ],
  heists: [
    { name: 'Shop Überfälle', icon: <FaStore className={FEATURE_ICON} /> },
    { name: 'Bank Überfälle', icon: <GiBank className={FEATURE_ICON} /> },
  ],
  casino: [
    { name: 'Spielautomaten', icon: <FaDice className={FEATURE_ICON} /> },
    { name: 'Multiplayer Blackjack', icon: <GiCardPlay className={FEATURE_ICON} /> },
    { name: 'Roulette', icon: <GiPokerHand className={FEATURE_ICON} /> },
    { name: 'Animierte Wände', icon: <FaBuilding className={FEATURE_ICON} /> },
  ],
  additional: [
    { name: 'Neue Fahrschule', icon: <GiSteeringWheel className={FEATURE_ICON} /> },
    { name: 'Jobcenter', icon: <FaBuilding className={FEATURE_ICON} /> },
    { name: 'Polizei CAD/MTD', icon: <GiPoliceOfficerHead className={FEATURE_ICON} /> },
    { name: 'GcPhone', icon: <FaMobileAlt className={FEATURE_ICON} /> },
    { name: 'Haustiere', icon: <FaDog className={FEATURE_ICON} /> },
    { name: 'Carlock', icon: <FaKey className={FEATURE_ICON} /> },
  ],
};

const versions = [
  { version: 'Release 1.4.0', date: '09.07.2023', latest: true },
  { version: 'Release 1.3.0', date: '07.07.2023' },
  { version: 'Release 1.2.0', date: '03.07.2023' },
  { version: 'Release 1.1.0', date: '30.06.2023' },
  { version: 'Release 1.0.0', date: '17.06.2023' },
  { version: 'Legacy Beta 4.0.0', date: '13.06.2023' },
  { version: 'Legacy Beta 3.0.0', date: '08.06.2023' },
  { version: 'Legacy Beta 2.0.0', date: '15.05.2023' },
  { version: 'Legacy Beta 1.0.0', date: '07.05.2023' },
];

const premiumFeatures = [
  { name: 'PoliceCad', link: 'https://achim.tebex.io/package/5097370', description: 'Professionelles Polizei-Verwaltungssystem' },
  { name: 'Helicopter Camera', link: 'https://achim.tebex.io/package/5156431', description: 'Realistische Helikopter-Kamera' },
  { name: 'Luckywheel', link: 'https://achim.tebex.io/package/5214747', description: 'Casino Glücksrad-System' },
  { name: 'ESX Drugs', link: 'https://achim.tebex.io/package/5118373', description: 'Erweitertes Drogensystem' },
  { name: 'MainMenu', link: 'https://achim.tebex.io/package/5153446', description: 'Anpassbares Hauptmenü' },
  { name: 'Roulette Like GTA:O', link: 'https://achim.tebex.io/package/5240886', description: 'GTA-Style Casino Roulette' },
  { name: 'Doge Store', link: 'https://achim.tebex.io/package/5113761', description: 'Erweitertes Shop-System' },
];

const infoPoints = [
  {
    icon: <FiCode className="h-4 w-4" />,
    title: 'Modularer Aufbau',
    text: 'Füge hinzu, entferne oder ändere Komponenten ganz nach deinen Bedürfnissen. Perfekt für jeden Servertyp, von Hardcore bis Casual RP.',
  },
  {
    icon: <FiGlobe className="h-4 w-4" />,
    title: 'Mehrsprachig',
    text: 'Größtenteils auf Deutsch übersetzt und einfach in jede gewünschte Sprache anpassbar.',
  },
  {
    icon: <FiServer className="h-4 w-4" />,
    title: 'Neueste ESX Version',
    text: 'Basiert auf der aktuellsten ESX Legacy Version für beste Performance und Sicherheit.',
  },
  {
    icon: <FiHeadphones className="h-4 w-4" />,
    title: 'Support',
    text: 'Professioneller Support bei Fragen oder Problemen für alle Premium-Nutzer.',
  },
];

const supportList = [
  { icon: <FiHeadphones className="h-4 w-4" />, text: 'Professioneller Support' },
  { icon: <FiDownload className="h-4 w-4" />, text: 'Regelmäßige Updates' },
  { icon: <FiCode className="h-4 w-4" />, text: 'Premium-Features' },
  { icon: <FiUsers className="h-4 w-4" />, text: 'Community-Zugang' },
];

const supportCards = [
  { icon: <FiServer className="h-4 w-4" />, title: 'Lifetime Updates', text: 'Alle zukünftigen Updates ohne zusätzliche Kosten' },
  { icon: <FiHeadphones className="h-4 w-4" />, title: 'Premium Support', text: 'Direkter Support bei Fragen und Problemen' },
  { icon: <FaGamepad className="h-4 w-4" />, title: 'Premium Features', text: 'Zugriff auf alle Premium-Erweiterungen' },
];

const faqs = [
  {
    question: 'Ist der FiveM Template Server wirklich kostenlos?',
    answer:
      'Ja, die Open Source Version des FiveM Template Servers ist komplett kostenlos und kann ohne Einschränkungen genutzt werden.',
  },
  {
    question: 'Was ist der Unterschied zwischen der kostenlosen und Premium Version?',
    answer:
      'Die kostenlose Version enthält alle grundlegenden Features, während die Premium Version zusätzliche Erweiterungen und professionellen Support bietet.',
  },
  {
    question: 'Kann ich den Server für kommerzielle Zwecke nutzen?',
    answer: 'Ja, der FiveM Template Server kann sowohl für private als auch kommerzielle Projekte genutzt werden.',
  },
  {
    question: 'Wie oft wird der Template Server aktualisiert?',
    answer: 'Der Server erhält regelmäßige Updates, sowohl für die kostenlose als auch die Premium Version.',
  },
];

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/** Eingebettetes YouTube-Video im Seitenverhältnis 16:9 */
function VideoFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative aspect-video w-full border border-line bg-surface">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function FiveMTemplateServer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'FiveM Template Server Kostenlos | Free ESX Legacy Template für GTA RP',
          description:
            'FiveM Template Server kostenlos downloaden - Das beste kostenlose ESX Legacy Template für deinen GTA Roleplay Server. Inklusive Jobs, Shops, Casino & mehr. Jetzt kostenlos herunterladen!',
          canonical: 'https://achimsommer.com/fivem-template-server',
          openGraph: {
            title: 'FiveM Template Server Kostenlos | Free ESX Legacy Template',
            description:
              'FiveM Template Server kostenlos downloaden - Das beste kostenlose ESX Legacy Template für deinen GTA Roleplay Server. Inklusive Jobs, Shops, Casino & mehr.',
            images: [
              {
                url: ogImageUrl({
                  title: 'FiveM Template Server Kostenlos',
                  subtitle: 'Free ESX Legacy Template für GTA Roleplay',
                }),
                width: 1200,
                height: 630,
                alt: 'FiveM Template Server Kostenlos - Bestes ESX Legacy Template',
              },
            ],
          },
          additionalMetaTags: [
            {
              name: 'keywords',
              content:
                'fivem template server, fivem template server kostenlos, fivem template server free, esx legacy template, gta roleplay server, fivem server setup, fivem server template kostenlos',
            },
          ],
        })}
      </Head>

      {/* Schwebender WhatsApp-Button */}
      {mounted &&
        createPortal(
          <a
            href="https://wa.me/4915678317784"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-[9999] flex h-12 w-12 items-center justify-center border border-line bg-surface text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            aria-label="Contact on WhatsApp"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
          </a>,
          document.body,
        )}

      <main className="overflow-x-clip">
        <LandingHero
          eyebrow="ESX Legacy · GTA Roleplay"
          title="FiveM Template Server Kostenlos: Bestes ESX Legacy Template"
          intro={
            <p>
              Kostenloser FiveM Template Server mit ESX Legacy Framework. Perfekter Start für deinen GTA Roleplay
              Server.
            </p>
          }
        >
          <FactList className="mt-8" items={['100+ Server', '1000+ Downloads', 'ESX Legacy']} />

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className={buttonClass.primary}>
              Zum Shop
              <ArrowIcon />
            </a>
            <button
              type="button"
              onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={buttonClass.secondary}
            >
              Features erkunden
            </button>
          </div>
        </LandingHero>

        {/* Server-Vorschau */}
        <section className="border-t border-line py-16 sm:py-24">
          <Container>
            <Reveal>
              <VideoFrame src="https://www.youtube.com/embed/YATdPnTEeNQ?rel=0" title="FiveM Template Server Preview" />
            </Reveal>
          </Container>
        </section>

        {/* Kategorien-Navigation, klebt unter dem festen Header */}
        <nav
          aria-label="Feature-Kategorien"
          className="sticky top-16 z-30 border-y border-line bg-canvas/90 backdrop-blur-sm"
        >
          <Container>
            <div className="hide-scrollbar flex gap-6 overflow-x-auto py-3">
              {Object.keys(allFeatures).map((category) => (
                <a
                  key={category}
                  href={`#${category}`}
                  className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
                >
                  {capitalize(category)}
                </a>
              ))}
            </div>
          </Container>
        </nav>

        {/* Info */}
        <LandingSection>
          <SectionHeading
            index="01"
            label="Template"
            title="FiveM Template Server Kostenlos: Das beste ESX Legacy Template"
          >
            Der kostenlose FiveM Template Server ist das beste ESX Legacy Template für deinen GTA Roleplay Server. Egal
            ob Anfänger oder Fortgeschrittener, mit diesem kostenlosen Template erstellst du schnell und einfach deinen
            eigenen Server. Das modulare System ermöglicht es dir, den Server genau nach deinen Vorstellungen
            anzupassen.
          </SectionHeading>

          <Reveal className="mt-12 sm:mt-16">
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {infoPoints.map((point) => (
                <li key={point.title} className="bg-canvas p-6">
                  <span className="text-accent" aria-hidden="true">
                    {point.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-medium tracking-[-0.01em] text-fg">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{point.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </LandingSection>

        {/* Features */}
        <section id="features" className="scroll-mt-32 py-16 sm:py-24">
          <Container>
            <div className="space-y-16 sm:space-y-20">
              {Object.entries(allFeatures).map(([category, items], index) => (
                <Reveal key={category}>
                  <div id={category} className="grid scroll-mt-36 gap-6 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                        <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
                        <span className="mx-2 text-[#4a4946]" aria-hidden="true">
                          /
                        </span>
                        {String(items.length).padStart(2, '0')}
                      </p>
                      <h2 className="mt-3 text-[2rem] font-medium leading-[1.08] tracking-[-0.03em] text-fg sm:text-4xl">
                        {capitalize(category)}
                      </h2>
                    </div>
                    <div className="lg:col-span-8">
                      {category === 'casino' && (
                        <div className="mb-6">
                          <VideoFrame src="https://www.youtube.com/embed/EvTT7BPJJwk?rel=0" title="Casino Roulette Preview" />
                        </div>
                      )}
                      <ul className="grid grid-cols-1 border-l border-t border-line min-[420px]:grid-cols-2 md:grid-cols-3">
                        {items.map((item) => (
                          <li key={item.name} className="flex items-center gap-3 border-b border-r border-line px-5 py-4">
                            <span className="text-muted" aria-hidden="true">
                              {item.icon}
                            </span>
                            <span className="text-[15px] text-fg">{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Shop / Weiterentwicklung */}
        <LandingSection>
          <SectionHeading index="02" label="Premium" title="Weiterentwicklung & Support">
            Erhalte Zugriff auf alle Premium-Features, regelmäßige Updates und professionellen Support. Entwickle deinen
            Server mit uns weiter!
          </SectionHeading>

          <Reveal className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ul className="space-y-3">
                {supportList.map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-muted">
                    <span className="text-accent" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className={buttonClass.primary}>
                  Zum Shop
                  <ArrowIcon />
                </a>
                <span className="font-mono text-xs text-muted">Starte ab €16.65</span>
              </div>
            </div>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-3 lg:col-span-8">
              {supportCards.map((card) => (
                <li key={card.title} className="bg-surface p-6">
                  <span className="text-accent" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-medium tracking-[-0.01em] text-fg">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{card.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </LandingSection>

        {/* Versionen */}
        <LandingSection>
          <SectionHeading index="03" label="Versionen" title="Entwicklung">
            Kontinuierliche Entwicklung mit regelmäßigen Updates und neuen Features. Alle Updates sind für Käufer
            kostenlos.
          </SectionHeading>

          <Reveal className="mt-12 sm:mt-16">
            <ol className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {versions.map((version) => (
                <li
                  key={version.version}
                  className={`relative flex items-baseline justify-between gap-4 border-b border-r border-line px-5 py-4 ${version.latest ? 'bg-surface' : ''}`}
                >
                  {version.latest && <span className="absolute inset-y-0 left-0 w-px bg-accent" aria-hidden="true" />}
                  <h3 className={`text-[15px] font-medium ${version.latest ? 'text-accent' : 'text-fg'}`}>
                    {version.version}
                  </h3>
                  <p className="font-mono text-xs text-faint">{version.date}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </LandingSection>

        {/* Open Source / GitHub */}
        <LandingSection>
          <SectionHeading index="04" label="Open Source" title="Kostenloser FiveM Template Server: Open Source Version">
            <div className="space-y-6">
              <p className="border-l border-accent pl-4 text-[15px]">
                Die kostenlose Open Source Version enthält keinen Support und ausgewählte Premium-Features. Perfekt für
                alle, die einen kostenlosen FiveM Server erstellen wollen.
              </p>
              <a
                href="https://github.com/Achim-Sommer/FiveM-ESX-Template-Server"
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${buttonClass.secondary}`}
              >
                <FiGithub className="h-4 w-4" aria-hidden="true" />
                GitHub Repository
                <ArrowIcon />
              </a>
            </div>
          </SectionHeading>

          <Reveal className="mt-12 sm:mt-16">
            <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {premiumFeatures.map((feature) => (
                <li key={feature.name} className="border-b border-r border-line">
                  <a
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-surface"
                  >
                    <h3 className="text-lg font-medium tracking-[-0.01em] text-fg transition-colors group-hover:text-accent">
                      {feature.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{feature.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-fg">
                      Mehr erfahren
                      <ArrowIcon />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </LandingSection>

        {/* FAQ */}
        <LandingSection>
          <SectionHeading index="05" label="FAQ" title="Häufige Fragen (FAQ)" />

          <Reveal className="mt-12 sm:mt-16">
            <div className="border-t border-line">
              {faqs.map((faq) => (
                <div key={faq.question} className="grid gap-3 border-b border-line py-6 lg:grid-cols-12 lg:gap-10">
                  <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] text-fg lg:col-span-4">
                    {faq.question}
                  </h3>
                  <p className="max-w-2xl leading-relaxed text-muted lg:col-span-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </LandingSection>
      </main>
    </>
  );
}
