import Head from 'next/head';
import Link from 'next/link';
import { generateNextSeo } from 'next-seo/pages';
import { FiActivity, FiArrowRight, FiHardDrive, FiRefreshCw, FiTrendingUp } from 'react-icons/fi';
import { ogImageUrl } from '@/lib/og-image';
import { SITE_URL, jsonLd, personRef } from '@/lib/schema';
import { Reveal, SectionHeading } from '@/components/home/primitives';
import { AdLabel, ArrowIcon, CouponCode, FactList, LandingHero, LandingSection, buttonClass } from '@/components/landing/ui';
import RamRechner from '@/components/mdx/RamRechner';
import RamTabelle from '@/components/mdx/RamTabelle';
import {
  APPS,
  GAMES,
  HEADROOM,
  OS_BASE,
  RAM_STEPS,
  ZAP_GAMESERVER_URL,
  ZAP_VSERVER_URL,
  formatGb,
  gameRam,
  roundToStep,
} from '@/data/server-ram';

const PATH = '/server-ram-rechner';
const URL = `${SITE_URL}${PATH}`;
const TITLE = 'Server RAM-Rechner: Wie viel Arbeitsspeicher brauchst du?';
const DESCRIPTION =
  'Kostenloser RAM-Rechner für Gameserver und vServer: Spiel und Spielerzahl oder Dienste wie Docker, Coolify und WordPress wählen und sofort die passende RAM-Größe sehen.';

const ICON = 'h-4 w-4';

/** Empfehlung für ein Spiel bei einer Spielerzahl, wie im Rechner */
const recommendGame = (id: string, players: number) => {
  const game = GAMES.find((g) => g.id === id)!;
  return formatGb(roundToStep(gameRam(game, players) * HEADROOM));
};

/** Empfehlung für eine Auswahl an Diensten, wie im Rechner */
const recommendApps = (ids: string[]) =>
  formatGb(roundToStep((OS_BASE + APPS.filter((a) => ids.includes(a.id)).reduce((sum, a) => sum + a.ram, 0)) * HEADROOM));

// Antworten werden aus denselben Daten berechnet wie der Rechner, damit nichts auseinanderläuft
const faqs = [
  {
    question: 'Wie viel RAM braucht ein Minecraft Server mit 20 Spielern?',
    answer: `Für Minecraft Java mit Paper oder Vanilla empfiehlt der Rechner bei 20 Spielern ${recommendGame('minecraft', 20)}. Ein größeres Modpack braucht bei gleicher Spielerzahl ${recommendGame('minecraft-modded', 20)}, die Bedrock Edition kommt mit ${recommendGame('minecraft-bedrock', 20)} aus.`,
  },
  {
    question: 'Wie viel RAM braucht ein vServer für Docker und Coolify?',
    answer: `Für Docker und Coolify allein empfiehlt der Rechner ${recommendApps(['docker', 'coolify'])}. Läuft darüber noch eine Next.js-App mit Datenbank, sind es ${recommendApps(['docker', 'coolify', 'nextjs', 'database'])}. Coolify selbst braucht laut Hersteller mindestens 2 GB.`,
  },
  {
    question: 'Wie genau ist der Rechner?',
    answer:
      'Die Werte sind Richtwerte aus Herstellerangaben und Erfahrungen im Betrieb, bewusst eher großzügig. Mods, Plugins, große Welten und lange Laufzeiten ohne Neustart können deutlich mehr brauchen. Nach dem Start solltest du den echten Verbrauch ein paar Tage beobachten.',
  },
  {
    question: 'Was passiert, wenn der Arbeitsspeicher nicht reicht?',
    answer:
      'Erst wird der Server langsam, weil das System auf die Festplatte auslagert. Spieler merken das als Ruckler und Lags. Reicht auch das nicht, beendet Linux Prozesse, und der Gameserver oder ein Container stürzt ab. Mehr RAM oder weniger Dienste auf einer Maschine lösen das Problem.',
  },
  {
    question: 'Brauche ich für mehr Spieler mehr RAM oder mehr CPU?',
    answer:
      'Beides, aber unterschiedlich stark. Der RAM-Bedarf wächst mit Welt, Mods und gespeicherten Daten. Die CPU entscheidet, ob der Server bei vielen gleichzeitigen Aktionen flüssig bleibt. Viele Gameserver nutzen nur wenige Kerne, deshalb zählt dort ein hoher Takt mehr als viele Kerne.',
  },
  {
    question: 'Kann ich den RAM später erhöhen?',
    answer:
      'Bei gemieteten Gameservern und vServern meist ja, oft ohne Neuinstallation. Starte deshalb lieber passend als viel zu groß und erhöhe, wenn die Messwerte es zeigen.',
  },
];

const tips = [
  {
    icon: <FiActivity className={ICON} />,
    title: 'Echten Verbrauch messen',
    text: 'Mit free -h siehst du den Speicher des ganzen Servers, mit docker stats den Verbrauch je Container. Wichtig ist die Spalte „available“, nicht „free“.',
  },
  {
    icon: <FiHardDrive className={ICON} />,
    title: 'Swap als Notreserve',
    text: '1 bis 2 GB Swap fangen kurze Spitzen ab, etwa beim Build einer App. Dauerhaft ersetzt Swap keinen Arbeitsspeicher, dafür ist er viel zu langsam.',
  },
  {
    icon: <FiRefreshCw className={ICON} />,
    title: 'Geplante Neustarts',
    text: 'Manche Gameserver wie Palworld belegen mit der Zeit immer mehr Speicher. Ein täglicher Neustart zu einer ruhigen Uhrzeit hält den Verbrauch stabil.',
  },
  {
    icon: <FiTrendingUp className={ICON} />,
    title: 'Mit Puffer planen',
    text: `Der Rechner schlägt ${Math.round((HEADROOM - 1) * 100)} % auf den geschätzten Bedarf auf und rundet auf übliche Paketgrößen. So bleibt Luft für Updates, Spitzen und neue Spieler.`,
  },
];

const guides = [
  {
    href: '/blog/wie-viel-ram-braucht-mein-server',
    title: 'Wie viel RAM braucht mein Server?',
    text: 'Der ausführliche Guide: Verbrauch messen, Swap einrichten, typische Beispiele und die Entscheidung zwischen Gameserver und vServer.',
  },
  {
    href: '/blog/vserver-vs-dedicated-server',
    title: 'vServer oder Dedicated Server?',
    text: 'Wann ein vServer reicht und ab wann sich ein eigener physischer Server lohnt, mit Kosten im Vergleich.',
  },
  {
    href: '/blog/zap-hosting-lifetime',
    title: 'Server kaufen statt mieten',
    text: 'Break-even-Rechnung mit interaktivem Diagramm: ab welchem Monat sich die Lifetime-Option rechnet.',
  },
];

export default function ServerRamRechner() {
  const ogImage = ogImageUrl({ title: 'Server RAM-Rechner', subtitle: 'Gameserver und vServer richtig planen', baseUrl: SITE_URL });

  return (
    <>
      <Head>
        {generateNextSeo({
          title: TITLE,
          description: DESCRIPTION,
          canonical: URL,
          openGraph: {
            title: TITLE,
            description: DESCRIPTION,
            url: URL,
            type: 'website',
            images: [{ url: ogImage, width: 1200, height: 630, alt: 'Server RAM-Rechner von Achim Sommer' }],
          },
        })}
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Server RAM-Rechner',
          url: URL,
          description: DESCRIPTION,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Alle',
          inLanguage: 'de-DE',
          isAccessibleForFree: true,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
          author: personRef,
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Server RAM-Rechner', item: URL },
          ],
        }) }}
      />

      <main className="overflow-x-clip">
        <LandingHero
          eyebrow="Kostenloses Tool"
          title="Server RAM-Rechner"
          intro={
            <p>
              Wie viel Arbeitsspeicher braucht dein Server? Wähle ein Spiel und die Zahl der Spieler oder die Dienste, die
              auf deinem vServer laufen sollen. Der Rechner zeigt dir sofort eine Empfehlung mit Puffer.
            </p>
          }
        >
          <FactList
            className="mt-8"
            items={[`${GAMES.length} Gameserver`, `${APPS.length} Dienste für den vServer`, 'Ohne Anmeldung']}
          />
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#rechner" className={buttonClass.primary}>
              Zum Rechner
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#richtwerte" className={buttonClass.secondary}>
              Richtwerte ansehen
            </a>
          </div>
        </LandingHero>

        <LandingSection id="rechner">
          <SectionHeading index="01" label="Rechner" title="RAM-Bedarf berechnen">
            Gameserver nach Spiel und Spielerzahl oder vServer nach Diensten: Die Empfehlung enthält bereits einen Puffer
            und ist auf eine übliche Paketgröße gerundet.
          </SectionHeading>
          <div className="mt-6 grid sm:mt-10 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <RamRechner />
            </div>
          </div>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="02" label="Methode" title="So rechnet der Rechner">
            Keine Magie, sondern drei Schritte. Du kannst die Werte jederzeit selbst nachvollziehen.
          </SectionHeading>
          <Reveal className="mt-12 sm:mt-16">
            <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
              {[
                {
                  step: '1',
                  title: 'Bedarf schätzen',
                  text: `Gameserver: Grundbedarf des Spiels plus ein Anteil je Spieler, mindestens der Mindestwert des Spiels. vServer: ${formatGb(OS_BASE)} für das Betriebssystem plus die gewählten Dienste.`,
                },
                {
                  step: '2',
                  title: 'Puffer aufschlagen',
                  text: `Auf den geschätzten Bedarf kommen ${Math.round((HEADROOM - 1) * 100)} % für Lastspitzen, Updates und Wachstum. Ein Server, der dauerhaft am Limit läuft, wird langsam.`,
                },
                {
                  step: '3',
                  title: 'Auf Paketgröße runden',
                  text: `Das Ergebnis wird auf die nächste übliche Größe aufgerundet: ${RAM_STEPS.slice(0, 8)
                    .map((s) => `${s} GB`)
                    .join(', ')} und so weiter.`,
                },
              ].map((item) => (
                <li key={item.step} className="bg-canvas p-6 sm:p-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Schritt {item.step}</span>
                  <h3 className="mt-3 text-xl font-medium tracking-[-0.02em] text-fg">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </LandingSection>

        <LandingSection id="richtwerte">
          <SectionHeading index="03" label="Richtwerte" title="RAM für Gameserver">
            Mindestwerte und Empfehlungen für typische Spielerzahlen. Mit vielen Mods oder Plugins solltest du eine Stufe
            höher planen.
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="article min-w-0 lg:col-span-8 lg:col-start-5">
              <RamTabelle type="games" />
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="04" label="Richtwerte" title="RAM für Dienste auf dem vServer">
            Typischer Verbrauch im Betrieb, inklusive eigener Datenbank, wo sie nötig ist. Für den ganzen Server addierst
            du die Dienste und das Betriebssystem.
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="article min-w-0 lg:col-span-8 lg:col-start-5">
              <RamTabelle type="apps" />
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="05" label="Praxis" title="Tipps aus dem Betrieb" />
          <Reveal className="mt-12 sm:mt-16">
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {tips.map((tip) => (
                <li key={tip.title} className="bg-canvas p-6">
                  <span className="flex h-9 w-9 items-center justify-center border border-line text-accent">{tip.icon}</span>
                  <h3 className="mt-5 text-lg font-medium tracking-[-0.01em] text-fg">{tip.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{tip.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="06" label="Weiterlesen" title="Passende Guides" />
          <Reveal className="mt-12 sm:mt-16">
            <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
              {guides.map((guide) => (
                <li key={guide.href} className="bg-canvas">
                  <Link href={guide.href} className="group flex h-full flex-col p-6 transition-colors hover:bg-surface sm:p-8">
                    <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">{guide.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{guide.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg group-hover:text-accent">
                      Zum Guide
                      <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="07" label="FAQ" title="Häufige Fragen zum RAM-Bedarf" />
          <Reveal className="mt-12 sm:mt-16">
            <div className="border-t border-line">
              {faqs.map((faq) => (
                <div key={faq.question} className="grid gap-3 border-b border-line py-6 lg:grid-cols-12 lg:gap-10">
                  <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] text-fg lg:col-span-4">{faq.question}</h3>
                  <p className="max-w-2xl leading-relaxed text-muted lg:col-span-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <Reveal>
            <aside className="relative border border-line bg-surface p-6 sm:p-10" aria-label="Anzeige: ZAP-Hosting">
              <span className="absolute inset-x-0 top-0 h-px bg-accent/70" aria-hidden="true" />
              <AdLabel />
              <h2 className="mt-4 max-w-3xl text-[2rem] font-medium leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl">
                Passenden Server gefunden?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Gameserver und vServer bei ZAP-Hosting kannst du in der empfohlenen Größe mieten und später jederzeit
                erweitern.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={ZAP_GAMESERVER_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.primary}>
                  Gameserver ansehen
                  <ArrowIcon />
                </a>
                <a href={ZAP_VSERVER_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.secondary}>
                  vServer ansehen
                  <ArrowIcon />
                </a>
                <CouponCode code="GermanGaming">
                  <span>
                    = <span className="text-accent">20 %</span> Rabatt (je nach Produkt)
                  </span>
                </CouponCode>
              </div>
            </aside>
          </Reveal>
        </LandingSection>
      </main>
    </>
  );
}
