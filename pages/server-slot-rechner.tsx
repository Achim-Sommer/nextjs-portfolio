import Head from 'next/head';
import Link from 'next/link';
import { generateNextSeo } from 'next-seo/pages';
import { FiArrowRight } from 'react-icons/fi';
import { ogImageUrl } from '@/lib/og-image';
import { SITE_URL, jsonLd, personRef } from '@/lib/schema';
import { Reveal, SectionHeading } from '@/components/home/primitives';
import { AdLabel, ArrowIcon, CouponCode, FactList, LandingHero, LandingSection, buttonClass } from '@/components/landing/ui';
import SlotRechner from '@/components/mdx/SlotRechner';
import {
  GAMES,
  HEADROOM,
  RAM_DATA_AS_OF,
  ZAP_COUPON,
  ZAP_GAMESERVER_URL,
  findGame,
  formatGb,
  gamePath,
  manyMods,
  maxPlayersFor,
  minPackage,
  type GameProfile,
} from '@/data/server-ram';

const PATH = '/server-slot-rechner';
const URL = `${SITE_URL}${PATH}`;
const TITLE = 'Slot-Rechner: Wie viele Spieler schafft dein Server?';
const DESCRIPTION =
  'Wie viele Spieler passen auf einen Server mit 4, 8 oder 16 GB RAM? Der Slot-Rechner zeigt es für Minecraft, Rust, ARK, FiveM, Palworld und viele weitere Spiele.';

/** Paketgrößen der Übersichtstabelle */
const SIZES = [4, 8, 16, 32];

/** Anzeige in Tabelle und Text: Strich = zu klein, Zusatz beim Maximum des Spiels */
const cell = (game: GameProfile, ram: number) => {
  const players = maxPlayersFor(game, ram);
  if (players === 0) return '–';
  return players === game.maxPlayers ? `${players} (Maximum)` : String(players);
};

/** Satz für die FAQ, aus denselben Daten wie der Rechner */
const answerFor = (id: string, ram: number) => {
  const game = findGame(id)!;
  const players = maxPlayersFor(game, ram);
  if (players === 0) return `${formatGb(ram)} sind für einen ${game.short} zu wenig, mit Puffer brauchst du mindestens ${formatGb(minPackage(game))}.`;
  const heavy = game.mods ? maxPlayersFor(game, ram, 2) : players;
  const withMods = game.mods
    ? heavy > 0
      ? ` Mit ${manyMods(game)} sind es noch ${heavy}.`
      : ` Mit ${manyMods(game)} reicht diese Größe nicht mehr.`
    : '';
  return `Auf einen ${game.short} mit ${formatGb(ram)} passen laut Rechner bis zu ${players} Spieler.${withMods}`;
};

// Antworten werden aus den Rechnerdaten erzeugt, damit Tabelle, Rechner und FAQ zusammenpassen
const faqs = [
  { question: 'Wie viele Spieler schafft ein Minecraft Server mit 8 GB RAM?', answer: `${answerFor('minecraft', 8)} ${answerFor('minecraft-modpack', 8)}` },
  { question: 'Wie viele Spieler passen auf einen Rust Server mit 16 GB RAM?', answer: answerFor('rust', 16) },
  { question: 'Reichen 8 GB RAM für einen Palworld Server?', answer: answerFor('palworld', 8) },
  { question: 'Wie viele Spieler schafft ein FiveM Server mit 8 GB RAM?', answer: answerFor('fivem', 8) },
  {
    question: 'Sind Slots und RAM dasselbe?',
    answer:
      'Nein. Slots sind die Zahl der Plätze, die der Hoster freischaltet. Der Arbeitsspeicher bestimmt, wie viele dieser Plätze der Server flüssig bedienen kann. Viele Slots auf einem zu kleinen Paket führen zu Rucklern, sobald der Server voll wird.',
  },
  {
    question: 'Wie genau ist der Slot-Rechner?',
    answer: `Er rechnet mit denselben Richtwerten wie der RAM-Rechner und hält ${Math.round((HEADROOM - 1) * 100)} % Puffer frei. Mods, Plugins, große Welten und lange Laufzeiten ohne Neustart senken die Zahl. Bei vielen Spielen begrenzt außerdem die CPU, nicht der Speicher.`,
  },
];

export default function ServerSlotRechner() {
  const ogImage = ogImageUrl({ title: 'Slot-Rechner für Gameserver', subtitle: 'Wie viele Spieler schafft dein Server?', baseUrl: SITE_URL });

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
            images: [{ url: ogImage, width: 1200, height: 630, alt: 'Slot-Rechner für Gameserver von Achim Sommer' }],
          },
        })}
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Slot-Rechner für Gameserver',
            url: URL,
            description: DESCRIPTION,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Alle',
            inLanguage: 'de-DE',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            author: personRef,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Slot-Rechner', item: URL },
            ],
          }),
        }}
      />

      <main className="overflow-x-clip">
        <LandingHero
          eyebrow="Kostenloses Tool"
          title="Slot-Rechner für Gameserver"
          intro={
            <p>
              Wie viele Spieler schafft dein Server? Wähle das Spiel und den Arbeitsspeicher deines Pakets. Der Rechner zeigt
              dir, für wie viele gleichzeitige Spieler das reicht, mit Puffer für Spitzen.
            </p>
          }
        >
          <FactList className="mt-8" items={[`${GAMES.length} Spiele`, 'Gleiche Daten wie der RAM-Rechner', 'Ohne Anmeldung']} />
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#rechner" className={buttonClass.primary}>
              Zum Rechner
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/server-ram-rechner" className={buttonClass.secondary}>
              Zum RAM-Rechner
            </Link>
          </div>
        </LandingHero>

        <LandingSection id="rechner">
          <SectionHeading index="01" label="Rechner" title="Spielerzahl berechnen">
            Du kennst die Größe deines Servers und willst wissen, wie viele Spieler darauf passen? Hier bekommst du die
            Antwort. Suchst du umgekehrt die passende Größe für deine Gruppe, nimm den{' '}
            <Link href="/server-ram-rechner" className="text-fg underline decoration-accent underline-offset-4 hover:text-accent">
              RAM-Rechner
            </Link>
            .
          </SectionHeading>
          <div className="mt-6 grid sm:mt-10 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <SlotRechner syncUrl />
            </div>
          </div>
        </LandingSection>

        <LandingSection id="tabelle">
          <SectionHeading index="02" label="Tabelle" title="Spieler nach Arbeitsspeicher">
            Maximale Spielerzahl je Paketgröße ohne Mods und Plugins. Ein Strich heißt: Das Paket ist für dieses Spiel zu
            klein.
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="article min-w-0 lg:col-span-8 lg:col-start-5">
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Spiel</th>
                      {SIZES.map((size) => (
                        <th key={size}>{size} GB</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {GAMES.map((game) => (
                      <tr key={game.id}>
                        <td>
                          <a href={gamePath(game.id)}>{game.name}</a>
                        </td>
                        {SIZES.map((size) => (
                          <td key={size}>{cell(game, size)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-faint">
                „Maximum“ ist die höchste Spielerzahl, die der Rechner für das Spiel vorsieht. Stand der Richtwerte:{' '}
                {RAM_DATA_AS_OF}.
              </p>
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="03" label="Methode" title="So rechnet der Slot-Rechner" />
          <Reveal className="mt-12 sm:mt-16">
            <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
              {[
                {
                  step: '1',
                  title: 'Puffer abziehen',
                  text: `Von deinem Arbeitsspeicher bleiben ${Math.round((HEADROOM - 1) * 100)} % Puffer für Lastspitzen, Updates und Wachstum frei, genau wie im RAM-Rechner.`,
                },
                {
                  step: '2',
                  title: 'Grundbedarf abziehen',
                  text: 'Jedes Spiel braucht einen festen Sockel, bevor der erste Spieler beitritt. Mods und Plugins kommen dazu.',
                },
                {
                  step: '3',
                  title: 'Rest auf Spieler verteilen',
                  text: 'Was übrig bleibt, wird durch den Bedarf je Spieler geteilt. Das Ergebnis ist nach oben durch das Maximum des Spiels begrenzt.',
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

        <LandingSection>
          <SectionHeading index="04" label="FAQ" title="Häufige Fragen zu Slots und RAM" />
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
                Server zu klein geworden?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Bei ZAP-Hosting erweiterst du Arbeitsspeicher und Slots später, ohne die Welt neu aufzusetzen.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={ZAP_GAMESERVER_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.primary}>
                  Gameserver ansehen
                  <ArrowIcon />
                </a>
                <CouponCode code={ZAP_COUPON}>
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
