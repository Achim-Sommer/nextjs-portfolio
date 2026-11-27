import Head from 'next/head';
import Link from 'next/link';
import { generateNextSeo } from 'next-seo/pages';
import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiCpu,
  FiGlobe,
  FiSave,
  FiShield,
  FiSliders,
  FiUsers,
  FiX,
  FiZap,
} from 'react-icons/fi';
import { ogImageUrl } from '@/lib/og-image';
import { PASS_MONTHLY, PASS_YEARLY, breakEvenMonths, eur, findProduct, lifetimeCost } from '@/data/hosting-prices';
import { Reveal, SectionHeading } from '@/components/home/primitives';
import {
  AdLabel,
  ArrowIcon,
  CouponCode,
  FactList,
  LandingHero,
  LandingSection,
  buttonClass,
} from '@/components/landing/ui';

const ZAP_URL = 'https://zap-hosting.com/serverpalworld';
const SITE_URL = 'https://achimsommer.com';

// Preise aus der zentralen Preisdatei (src/data/hosting-prices.ts)
const PALWORLD = findProduct('palworld')!;
const RENT = eur(PALWORLD.monthly);
const LIFETIME = eur(PALWORLD.lifetime);
const PASS = eur(PASS_MONTHLY);
const PASS_YEAR = eur(PASS_YEARLY);
// Break-even in Monaten: mit ZapX Pass Plus, mit Pass im Jahrestarif, mit bereits laufendem Pass
const BREAK_EVEN = Math.round(breakEvenMonths(PALWORLD));
const BREAK_EVEN_YEARLY = Math.round(PALWORLD.lifetime / (PALWORLD.monthly - PASS_YEARLY));
const BREAK_EVEN_NO_PASS = Math.round(breakEvenMonths(PALWORLD, 0, false));
const SAVED_3_YEARS = eur(PALWORLD.monthly * 36 - lifetimeCost(PALWORLD, 36));

// FAQ-Daten: werden gerendert UND als FAQPage-Schema (JSON-LD) ausgegeben
const faqs = [
  {
    question: 'Was kostet ein Palworld Server?',
    answer:
      `Ein Palworld Server bei ZAP-Hosting kostet ab ${RENT} für 30 Tage, zum Testen gibt es 3 Tage ab 2,34 €. Mit dem Rabattcode ZAPX-M26R79 sparst du 20% auf den Mietpreis. Als Lifetime-Server kostet das kleinste Paket ${LIFETIME} einmalig. Dazu brauchst du einen aktiven ZapX Pass ab ${PASS} je 30 Tage. Stand: 27. November 2026.`,
  },
  {
    question: 'Palworld Server mieten oder kaufen: Was ist besser?',
    answer:
      `Mieten ist ideal zum Einstieg: geringe Kosten, jederzeit kündbar. Kaufen (Lifetime) lohnt sich ab einer Laufzeit von rund ${BREAK_EVEN} Monaten. Erst dann ist der Kaufpreis von ${LIFETIME} plus ZapX Pass (${PASS} je 30 Tage) günstiger als die Miete. Läuft der Pass bei dir ohnehin schon, sind es ${BREAK_EVEN_NO_PASS} Monate. Für Community-Server, die sicher mehrere Jahre laufen, kann Lifetime die bessere Rechnung sein.`,
  },
  {
    question: 'Was ist der ZapX Pass und brauche ich ihn?',
    answer:
      `Laut ZAP-Hosting, Stand November 2026, setzt ein Lifetime-Server einen aktiven ZapX Pass voraus. Der Pass ist ein Abo für das ganze Konto, nicht pro Server. Die kleinste Stufe Plus kostet ${PASS} je 30 Tage (${PASS_YEAR} je 30 Tage bei 365 Tagen Laufzeit) und deckt zwei Lifetime-Server ab. Endet der Pass, wird der Server gesperrt, der Lifetime-Anspruch bleibt bestehen. Mit aktivem Pass gibt es keine Aktivitätschecks. Für Mietserver brauchst du den Pass nicht. Prüfe die Bedingungen vor dem Kauf im Shop.`,
  },
  {
    question: 'Wie viele Spieler passen auf einen Palworld Server?',
    answer:
      'Ein dedizierter Palworld Server unterstützt bis zu 32 Spieler gleichzeitig, deutlich mehr als der normale Koop-Modus, der auf 4 Spieler begrenzt ist und nur läuft, solange der Host online ist.',
  },
  {
    question: 'Wie viel RAM braucht ein Palworld Server?',
    answer:
      'Mindestens 8 GB RAM, empfohlen sind 16 GB, besonders bei vielen Spielern, großen Basen und langen Laufzeiten ohne Neustart. Palworld ist bekannt dafür, mit der Zeit viel Arbeitsspeicher zu belegen. Regelmäßige geplante Neustarts helfen zusätzlich.',
  },
  {
    question: 'Gilt der Rabattcode ZAPX-M26R79 auch für Lifetime-Server?',
    answer:
      'Nein. Der Code ZAPX-M26R79 (20% Rabatt) gilt nur für Mietlaufzeiten. Der Lifetime-Kauf ist ein Festpreis ohne Rabattcode.',
  },
  {
    question: 'Wie schnell ist ein Palworld Server online?',
    answer:
      'In der Regel innerhalb weniger Minuten nach der Bestellung. Der Server wird automatisch eingerichtet. Danach nur noch die Serverdaten (IP und Port) in Palworld eintragen und losspielen.',
  },
  {
    question: 'Läuft ein Lifetime-Server genauso wie ein Mietserver?',
    answer:
      'Ja. Der Lifetime-Server läuft im selben Rechenzentrum mit derselben Leistung und demselben Webpanel wie ein Mietserver. Anders ist das Bezahlmodell: Du bezahlst den Server einmal, laufend fällt nur der ZapX Pass an.',
  },
];

const ICON = 'h-4 w-4';

const features = [
  {
    icon: <FiClock className={ICON} />,
    title: '24/7 online',
    text: 'Deine Welt läuft durchgehend weiter, auch wenn niemand spielt. Kein Host-PC nötig.',
  },
  {
    icon: <FiUsers className={ICON} />,
    title: 'Bis zu 32 Spieler',
    text: 'Statt 4 Spielern im Koop-Modus: Platz für die ganze Community auf einer Welt.',
  },
  {
    icon: <FiSliders className={ICON} />,
    title: 'Eigene Regeln',
    text: 'EXP-Rate, Fangrate, Schwierigkeit, PvP: Du bestimmst, wie gespielt wird.',
  },
  {
    icon: <FiSave className={ICON} />,
    title: 'Automatische Backups',
    text: 'Palworld-Spielstände sind wertvoll. Backups schützen vor Crashes und Datenverlust.',
  },
  {
    icon: <FiGlobe className={ICON} />,
    title: 'Deutsche Standorte',
    text: 'EU/DE-Rechenzentren für niedrigen Ping, wichtig bei Bosskämpfen und PvP.',
  },
  {
    icon: <FiCpu className={ICON} />,
    title: 'Genug RAM',
    text: 'Palworld ist RAM-hungrig. Die Server sind auf die Anforderungen des Spiels ausgelegt.',
  },
  {
    icon: <FiZap className={ICON} />,
    title: 'In Minuten startklar',
    text: 'Automatische Einrichtung nach der Bestellung: Serverdaten eintragen, losspielen.',
  },
  {
    icon: <FiShield className={ICON} />,
    title: 'Updates & Panel',
    text: 'Automatische Updates nach dem 1.0 Release plus Webpanel für Start/Stop, Logs und Konfiguration.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Paket wählen',
    text: 'Slots und RAM passend zur Gruppengröße auswählen. Für Palworld lieber etwas RAM-Puffer einplanen.',
  },
  {
    step: '02',
    title: 'Mieten oder Lifetime',
    text: `Mieten ab ${RENT} für 30 Tage (flexibel, mit Code 20% sparen) oder Lifetime für ${LIFETIME} einmalig plus ZapX Pass.`,
  },
  {
    step: '03',
    title: 'Standort & Code',
    text: 'DE/EU-Standort für niedrigen Ping wählen. Bei Miete den Code ZAPX-M26R79 im Checkout eintragen.',
  },
  {
    step: '04',
    title: 'Losspielen',
    text: 'Server wird automatisch eingerichtet. IP und Port in Palworld eintragen, fertig.',
  },
];

// Kostenvergleich: Miete gegen Lifetime inklusive ZapX Pass
const breakEvenRows = [6, 12, 18, 24, 36].map((m) => {
  const rent = PALWORLD.monthly * m;
  const lifetime = lifetimeCost(PALWORLD, m);
  return {
    months: `${m} Monate`,
    rent: eur(rent),
    lifetime: eur(lifetime),
    cheaper: rent > lifetime ? 'Lifetime' : 'Miete',
  };
});

const plans = [
  {
    key: 'rent',
    label: 'Laufzeit 30 Tage',
    title: 'Server mieten',
    subtitle: 'Flexibel starten, monatlich kündbar',
    price: RENT,
    unit: '/ 30 Tage',
    items: [
      'In Minuten startklar',
      'Jederzeit kündbar oder upgradebar',
      'Zum Testen: 3 Tage ab 2,34 €',
      'Webpanel, Backups & Updates inklusive',
    ],
    cta: 'Palworld Server mieten',
    highlight: false,
  },
  {
    key: 'lifetime',
    label: 'Einmalig plus ZapX Pass',
    title: 'Server kaufen (Lifetime)',
    subtitle: 'Server einmal bezahlen, laufend nur der ZapX Pass',
    price: LIFETIME,
    unit: 'einmalig, plus ZapX Pass',
    items: [
      `Laufend nur der ZapX Pass ab ${PASS} je 30 Tage`,
      `Günstiger als Miete ab ca. ${BREAK_EVEN} Monaten`,
      'Gleiche Leistung & gleiches Panel wie Mietserver',
      'Ideal für Community & Langzeit-Welten',
    ],
    cta: 'Lifetime-Server kaufen',
    highlight: true,
  },
];

const guides = [
  {
    href: '/server-ram-rechner/palworld',
    title: 'RAM-Rechner für Palworld',
    text: 'Wie viel Arbeitsspeicher dein Server für deine Spielerzahl braucht, mit Tabelle, Tipps und Werten für den eigenen vServer.',
  },
  {
    href: '/blog/palworld-server-mieten',
    title: 'Palworld Server mieten: Der komplette Guide',
    text: 'Schritt-für-Schritt Anleitung, RAM-Empfehlungen, wichtige Einstellungen nach der Bestellung und Performance-Tipps.',
  },
  {
    href: '/blog/zap-hosting-lifetime',
    title: 'Lifetime Server kaufen: Preise, Break-even und Haken',
    text: 'Der komplette Kostenvergleich: ZapX Pass, Break-even-Rechnung, Risiken und für wen sich die Lifetime-Option wirklich lohnt.',
  },
];

export default function PalworldServer() {
  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Palworld Server mieten oder kaufen: Preise im Vergleich',
          description:
            `Palworld Server im Preisvergleich: mieten ab ${RENT} je 30 Tage oder als Lifetime-Server für ${LIFETIME} plus ZapX Pass kaufen. Mit Break-even-Rechnung. 20% Rabatt auf Mietserver mit Code ZAPX-M26R79.`,
          canonical: `${SITE_URL}/palworld`,
          openGraph: {
            title: 'Palworld Server mieten oder kaufen: Preise im Vergleich',
            description:
              `Palworld Server mieten ab ${RENT} je 30 Tage oder als Lifetime-Server für ${LIFETIME} plus ZapX Pass kaufen. Preisvergleich mit Break-even-Rechnung, bis 32 Spieler, deutsche Standorte.`,
            url: `${SITE_URL}/palworld`,
            images: [
              {
                url: ogImageUrl({
                  title: 'Palworld Server mieten oder kaufen',
                  subtitle: `ab ${RENT} je 30 Tage · Lifetime ${LIFETIME} plus ZapX Pass`,
                  baseUrl: SITE_URL,
                }),
                width: 1200,
                height: 630,
                alt: `Palworld Server mieten oder kaufen - ab ${RENT} je 30 Tage oder ${LIFETIME} Lifetime plus ZapX Pass`,
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

      <main className="overflow-x-clip">
        <LandingHero
          eyebrow="Palworld 1.0 ist da: starte deine eigene Welt"
          title="Palworld Server mieten oder kaufen"
          intro={
            <p>
              Dein eigener Palworld Server im Preisvergleich:{' '}
              <strong className="font-medium text-fg">ab {RENT} für 30 Tage</strong> mieten oder als{' '}
              <strong className="font-medium text-fg">Lifetime-Server für {LIFETIME}</strong> kaufen, plus ZapX Pass ab{' '}
              {PASS} je 30 Tage. Die ausführliche Anleitung steht im{' '}
              <Link href="/blog/palworld-server-mieten" className="text-fg underline underline-offset-4 hover:text-accent">
                Guide zum Palworld Server
              </Link>
              .
            </p>
          }
        >
          <FactList className="mt-8" items={['Bis zu 32 Spieler', 'Deutsche Standorte', 'In Minuten online']} />

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={ZAP_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.primary}>
              Palworld Server holen
              <ArrowIcon />
            </a>
            <a href="#preise" className={buttonClass.secondary}>
              Preise vergleichen
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <CouponCode code="ZAPX-M26R79">
              <span>
                <span className="text-accent">20 %</span> auf Mietserver
              </span>
            </CouponCode>
            <AdLabel />
          </div>
        </LandingHero>

        {/* Preise: Mieten vs. Kaufen */}
        <LandingSection id="preise">
          <SectionHeading index="01" label="Preise" title="Mieten oder kaufen?">
            Beide Varianten laufen im selben Rechenzentrum mit derselben Leistung. Der Unterschied ist das
            Bezahlmodell: Miete je Laufzeit oder Server einmal bezahlen und laufend nur den ZapX Pass. Preise am
            27. November 2026 im Shop abgelesen.
          </SectionHeading>

          <Reveal className="mt-12 sm:mt-16">
            <div className="flex items-center justify-between gap-4 border border-b-0 border-line px-5 py-3 sm:px-7">
              <AdLabel />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">ZAP-Hosting</span>
            </div>
            <div className="grid gap-px border border-line bg-line md:grid-cols-2">
              {plans.map((plan) => (
                <div
                  key={plan.key}
                  className={`relative flex flex-col p-5 sm:p-8 ${plan.highlight ? 'bg-surface' : 'bg-canvas'}`}
                >
                  {plan.highlight && (
                    <>
                      <span className="absolute inset-x-0 top-0 h-px bg-accent/70" aria-hidden="true" />
                      <span className="absolute right-5 top-5 bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-canvas sm:right-8 sm:top-8">
                        Langzeit-Tipp
                      </span>
                    </>
                  )}
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{plan.label}</p>
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.02em] text-fg">{plan.title}</h3>
                  <p className="mt-1 text-[15px] text-muted">{plan.subtitle}</p>
                  <p className="mt-8 flex items-baseline gap-2">
                    <span className="text-5xl font-medium tracking-[-0.04em] text-fg">{plan.price}</span>
                    <span className="text-sm text-faint">{plan.unit}</span>
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-6 text-[15px]">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted">
                        <FiCheck className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {plan.highlight ? (
                      <li className="flex items-start gap-3 text-faint">
                        <FiX className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Rabattcode gilt hier nicht (Festpreis)</span>
                      </li>
                    ) : (
                      <li className="flex items-start gap-3 text-muted">
                        <FiCheck className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>
                          <span className="font-mono text-[13px] tracking-[0.06em] text-fg">ZAPX-M26R79</span>: 20%
                          Rabatt auf den Mietpreis
                        </span>
                      </li>
                    )}
                  </ul>
                  <a
                    href={ZAP_URL}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className={`${buttonClass.primary} mt-8 w-full ${plan.highlight ? '!bg-accent hover:!bg-accent-strong' : ''}`}
                  >
                    {plan.cta}
                    <ArrowIcon />
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </LandingSection>

        {/* Break-even Rechnung */}
        <LandingSection>
          <SectionHeading index="02" label="Rechnung" title="Kaufen statt mieten: Ab wann lohnt es sich?">
            Mit dem Kauf sparst du die Miete, zahlst aber weiter den ZapX Pass: {LIFETIME} ÷ ({RENT} − {PASS}) ={' '}
            <strong className="font-medium text-fg">Break-even nach rund {BREAK_EVEN} Monaten</strong>. Mit dem Pass im
            Jahrestarif ({PASS_YEAR} je 30 Tage) sind es rund {BREAK_EVEN_YEARLY} Monate. Läuft der Pass ohnehin schon,
            sind es {BREAK_EVEN_NO_PASS} Monate.
          </SectionHeading>

          <Reveal className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <div className="overflow-x-auto border border-line">
                <table className="w-full text-left text-sm sm:text-[15px]">
                  <thead>
                    <tr className="border-b border-line bg-surface font-mono text-[10px] uppercase tracking-[0.06em] text-faint sm:text-[11px] sm:tracking-[0.12em]">
                      <th className="px-2.5 py-3 align-bottom font-normal sm:px-5">Laufzeit</th>
                      <th className="px-2.5 py-3 align-bottom font-normal sm:px-5">Miete ({RENT}/30 Tage)</th>
                      <th className="px-2.5 py-3 align-bottom font-normal sm:px-5">Lifetime inkl. ZapX Pass</th>
                      <th className="px-2.5 py-3 align-bottom font-normal sm:px-5">Günstiger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakEvenRows.map((row) => (
                      <tr key={row.months} className="border-b border-line last:border-0">
                        <td className="whitespace-nowrap px-2.5 py-3 font-mono text-xs text-muted sm:px-5 sm:text-[13px]">{row.months}</td>
                        <td className="whitespace-nowrap px-2.5 py-3 text-fg sm:px-5">{row.rent}</td>
                        <td className="whitespace-nowrap px-2.5 py-3 text-fg sm:px-5">{row.lifetime}</td>
                        <td className="whitespace-nowrap px-2.5 py-3 sm:px-5">
                          <span className={row.cheaper === 'Lifetime' ? 'font-medium text-accent' : 'font-medium text-fg'}>
                            {row.cheaper}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-faint">
                Nach 3 Jahren hast du mit Lifetime {SAVED_3_YEARS} gespart, der ZapX Pass ({PASS} je 30 Tage) ist
                eingerechnet. Mit 20% Rabatt auf die Miete dauert es länger, größere Pakete rechnen sich schneller.
                Laut ZAP-Hosting, Stand November 2026, wird der Server gesperrt, wenn der Pass endet. Prüfe Preise und
                Bedingungen vor dem Kauf auf der Produktseite. Die ganze Rechnung steht im{' '}
                <Link href="/blog/palworld-server-mieten" className="underline underline-offset-4 hover:text-fg">
                  Guide
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </LandingSection>

        {/* Warum eigener Server */}
        <LandingSection>
          <SectionHeading index="03" label="Vorteile" title="Warum ein eigener Palworld Server?">
            Im Koop-Modus endet die Session, sobald der Host offline geht, und mehr als 4 Spieler sind nicht drin. Ein
            dedizierter Server löst beides.
          </SectionHeading>

          <Reveal className="mt-12 sm:mt-16">
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <li key={feature.title} className="bg-canvas p-6">
                  <span className="text-accent" aria-hidden="true">
                    {feature.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-medium tracking-[-0.01em] text-fg">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </LandingSection>

        {/* Schritt für Schritt */}
        <LandingSection>
          <SectionHeading index="04" label="Ablauf" title="In 4 Schritten zum eigenen Server" />

          <Reveal className="mt-12 sm:mt-16">
            <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((item) => (
                <li key={item.step} className="bg-canvas p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{item.step}</span>
                  <h3 className="mt-5 text-lg font-medium tracking-[-0.01em] text-fg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a href={ZAP_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.primary}>
                Jetzt Palworld Server starten
                <ArrowIcon />
              </a>
              <AdLabel />
            </div>
          </Reveal>
        </LandingSection>

        {/* Guides / Blog-Artikel */}
        <LandingSection>
          <SectionHeading index="05" label="Guides" title="Ausführliche Guides">
            Diese Seite ist der Überblick mit Preisvergleich. In den Guides findest du die Anleitung Schritt für
            Schritt, Einstellungen, Performance-Tipps und die komplette Kostenrechnung.
          </SectionHeading>

          <Reveal className="mt-12 sm:mt-16">
            <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
              {guides.map((guide) => (
                <li key={guide.href} className="bg-canvas">
                  <Link
                    href={guide.href}
                    className="group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-surface sm:p-8"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{guide.href.startsWith('/blog') ? 'Guide' : 'Rechner'}</span>
                    <span className="mt-3 text-xl font-medium leading-snug tracking-[-0.02em] text-fg transition-colors group-hover:text-accent">
                      {guide.title}
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-muted">{guide.text}</span>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm text-fg">
                      {guide.href.startsWith('/blog') ? 'Zum Guide' : 'Zum Rechner'}
                      <FiArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </LandingSection>

        {/* FAQ */}
        <LandingSection>
          <SectionHeading index="06" label="FAQ" title="Häufige Fragen zum Palworld Server" />

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

        {/* Abschluss */}
        <LandingSection>
          <Reveal>
            <aside className="relative border border-line bg-surface p-6 sm:p-10" aria-label="Anzeige: ZAP-Hosting">
              <span className="absolute inset-x-0 top-0 h-px bg-accent/70" aria-hidden="true" />
              <AdLabel />
              <h2 className="mt-4 max-w-3xl text-[2rem] font-medium leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl">
                Bereit für deine eigene Palworld-Welt?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Ab {RENT} für 30 Tage mieten oder für {LIFETIME} plus ZapX Pass kaufen, in wenigen Minuten online.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={ZAP_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.primary}>
                  Palworld Server bei ZAP-Hosting holen
                  <ArrowIcon />
                </a>
                <CouponCode code="ZAPX-M26R79">
                  <span>
                    = <span className="text-accent">20 %</span> Rabatt auf Mietserver
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
