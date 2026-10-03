import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { generateNextSeo } from 'next-seo/pages';
import { FiArrowRight } from 'react-icons/fi';
import { ogImageUrl } from '@/lib/og-image';
import { SITE_URL, jsonLd } from '@/lib/schema';
import { Reveal, SectionHeading } from '@/components/home/primitives';
import { AdLabel, ArrowIcon, CouponCode, FactList, LandingHero, LandingSection, buttonClass } from '@/components/landing/ui';
import RamRechner from '@/components/mdx/RamRechner';
import {
  GAMES,
  MOD_LEVELS,
  RAM_DATA_AS_OF,
  ZAP_GAMESERVER_URL,
  calculate,
  findGame,
  formatGb,
  recommendGame,
  toQuery,
  type GameProfile,
  type ModLevel,
} from '@/data/server-ram';
import { GAME_GUIDES } from '@/data/game-ram-guides';

const BASE = '/server-ram-rechner';

/** Spielerzahlen für die Tabelle: typische Werte bis zum Maximum des Spiels */
function playerRows(game: GameProfile): number[] {
  const rows = [2, 5, 10, 20, 32, 50, 100, 200].filter((n) => n < game.maxPlayers);
  return [...rows.slice(-5), game.maxPlayers];
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: GAMES.map((g) => ({ params: { spiel: g.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ id: string }> = async ({ params }) => {
  const id = String(params?.spiel ?? '');
  if (!findGame(id) || !GAME_GUIDES[id]) return { notFound: true };
  return { props: { id } };
};

export default function GameRamPage({ id }: { id: string }) {
  const game = findGame(id)!;
  const guide = GAME_GUIDES[id];
  const path = `${BASE}/${game.id}`;
  const url = `${SITE_URL}${path}`;
  const rows = playerRows(game);
  const levels = game.mods ? MOD_LEVELS : MOD_LEVELS.slice(0, 1);
  const defaultRec = formatGb(recommendGame(game, game.defaultPlayers));
  // Hinweis auf Mods nur, wenn sich die Empfehlung dadurch ändert
  const heavyRec = game.mods ? recommendGame(game, game.defaultPlayers, 2) : 0;
  const modsMatter = heavyRec > recommendGame(game, game.defaultPlayers);
  const onVServer = calculate({ mode: 'vserver', gameId: game.id, players: game.defaultPlayers, mods: 0, apps: {} });
  const vserverQuery = toQuery({ mode: 'vserver', gameId: game.id, players: game.defaultPlayers, mods: 0, apps: {} });

  const title = `${game.short}: Wie viel RAM brauchst du?`;
  const description = `Wie viel RAM braucht ein ${game.short}? Für ${game.defaultPlayers} Spieler ${defaultRec}, mindestens ${formatGb(game.min)}. Tabelle nach Spielerzahl${game.mods ? ` und ${game.modLabel}` : ''}, Rechner, Tipps und FAQ.`;

  const faqs = [
    {
      question: `Wie viel RAM braucht ein ${game.short} für ${game.defaultPlayers} Spieler?`,
      answer: `Für ${game.defaultPlayers} Spieler${game.mods ? ` ohne ${game.modLabel}` : ''} empfiehlt der Rechner ${defaultRec} RAM, inklusive 25 % Puffer.${
        modsMatter ? ` Mit vielen ${game.modLabel} sind es ${formatGb(heavyRec)}.` : ''
      }`,
    },
    {
      question: `Wie viel RAM braucht ein ${game.short} mindestens?`,
      answer: `Als Untergrenze gelten ${formatGb(game.min)}. Damit läuft der Server für wenige Spieler, Spitzen und Wachstum fängt dieser Wert aber nicht ab.`,
    },
    ...guide.faqs,
  ];

  const ogImage = ogImageUrl({ title: `${game.short}: RAM-Bedarf`, subtitle: 'Rechner, Tabelle und Tipps', baseUrl: SITE_URL });

  return (
    <>
      <Head>
        {generateNextSeo({
          title,
          description,
          canonical: url,
          openGraph: {
            title,
            description,
            url,
            type: 'website',
            images: [{ url: ogImage, width: 1200, height: 630, alt: `RAM-Bedarf für einen ${game.short}` }],
          },
        })}
      </Head>

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
              { '@type': 'ListItem', position: 2, name: 'Server RAM-Rechner', item: `${SITE_URL}${BASE}` },
              { '@type': 'ListItem', position: 3, name: game.short, item: url },
            ],
          }),
        }}
      />

      <main className="overflow-x-clip">
        <LandingHero
          eyebrow={
            <>
              <Link href={BASE} className="hover:text-fg">
                RAM-Rechner
              </Link>{' '}
              / {game.short}
            </>
          }
          title={`Wie viel RAM braucht ein ${game.short}?`}
          intro={<p>{guide.intro}</p>}
        >
          <div className="mt-8 max-w-2xl border border-accent/40 bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Kurz gesagt</p>
            <p className="mt-2 text-lg leading-relaxed text-fg">
              Für {game.defaultPlayers} Spieler empfehle ich <strong className="font-medium text-accent">{defaultRec} RAM</strong>, mindestens{' '}
              {formatGb(game.min)}.{modsMatter ? ` Mit vielen ${game.modLabel} eher ${formatGb(heavyRec)}.` : ''}
            </p>
          </div>
          <FactList className="mt-8" items={[`Bis ${game.maxPlayers} Spieler`, `${game.disk} GB Speicherplatz`, `Stand ${RAM_DATA_AS_OF}`]} />
        </LandingHero>

        <LandingSection id="rechner">
          <SectionHeading index="01" label="Rechner" title={`RAM für deinen ${game.short}`}>
            Stell Spielerzahl{game.mods ? ` und ${game.modLabel}` : ''} ein. Unter „vServer“ siehst du, was du brauchst, wenn der
            Server zusammen mit anderen Diensten läuft.
          </SectionHeading>
          <div className="mt-6 grid sm:mt-10 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <RamRechner initialGame={game.id} syncUrl sharePath={path} />
            </div>
          </div>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="02" label="Tabelle" title="Empfehlung nach Spielerzahl">
            Alle Werte inklusive 25 % Puffer und auf übliche Paketgrößen gerundet.
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="article min-w-0 lg:col-span-8 lg:col-start-5">
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Spieler</th>
                      {levels.map((level) => (
                        <th key={level.value}>{game.mods ? `${game.modLabel}: ${level.label}` : 'Empfehlung'}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((players) => (
                      <tr key={players}>
                        <td>{players}</td>
                        {levels.map((level) => (
                          <td key={level.value}>{formatGb(recommendGame(game, players, level.value as ModLevel))}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-faint">
                Mindestens {formatGb(game.min)}. {game.note} Stand der Richtwerte: {RAM_DATA_AS_OF}.
              </p>
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="03" label="Praxis" title={`Tipps für deinen ${game.short}`} />
          <Reveal className="mt-12 sm:mt-16">
            <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
              {guide.tips.map((tip) => (
                <li key={tip.title} className="bg-canvas p-6 sm:p-8">
                  <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">{tip.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{tip.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="04" label="vServer" title="Selbst auf einem vServer betreiben">
            Läuft der Server auf deinem eigenen vServer, brauchst du auch CPU und Speicherplatz. Für {game.defaultPlayers} Spieler
            ohne weitere Dienste empfiehlt der Rechner:
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <div className="grid grid-cols-3 gap-px border border-line bg-line text-center">
                {[
                  { label: 'RAM', value: formatGb(onVServer.recommended) },
                  { label: 'vCPU', value: `${onVServer.cores} ${onVServer.cores === 1 ? 'Kern' : 'Kerne'}` },
                  { label: 'SSD', value: `${onVServer.disk} GB` },
                ].map((item) => (
                  <div key={item.label} className="bg-canvas px-3 py-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{item.label}</div>
                    <div className="mt-1 text-2xl font-medium tracking-[-0.02em] text-fg">{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-muted">
                {game.cpuNote} Das Betriebssystem ist eingerechnet.{' '}
                <Link href={`${BASE}?${vserverQuery}`} className="text-fg underline decoration-accent underline-offset-4 hover:text-accent">
                  Weitere Dienste im Rechner ergänzen
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="05" label="FAQ" title={`Häufige Fragen zum ${game.short}`} />
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
          <SectionHeading index="06" label="Weiterlesen" title="Mehr zum Thema" />
          <Reveal className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12">
            <ul className="space-y-3 lg:col-span-4">
              {[
                ...(guide.links ?? []),
                { href: '/blog/wie-viel-ram-braucht-mein-server', title: 'Wie viel RAM braucht mein Server?' },
                { href: '/blog/zap-hosting-lifetime', title: 'Server kaufen statt mieten' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-2 text-fg hover:text-accent">
                    {link.title}
                    <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-8">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Weitere Spiele</p>
              <ul className="flex flex-wrap gap-2">
                {GAMES.filter((g) => g.id !== game.id).map((g) => (
                  <li key={g.id}>
                    <Link
                      href={`${BASE}/${g.id}`}
                      className="inline-block border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                    >
                      {g.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <Reveal>
            <aside className="relative border border-line bg-surface p-6 sm:p-10" aria-label="Anzeige: ZAP-Hosting">
              <span className="absolute inset-x-0 top-0 h-px bg-accent/70" aria-hidden="true" />
              <AdLabel />
              <h2 className="mt-4 max-w-3xl text-[2rem] font-medium leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl">
                {game.short} mieten
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Bei ZAP-Hosting wählst du die empfohlene Größe und erweiterst sie später, wenn eure Welt wächst.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={game.url ?? ZAP_GAMESERVER_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.primary}>
                  {game.short} ansehen
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
