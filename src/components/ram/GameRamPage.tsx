import Head from 'next/head';
import Link from 'next/link';
import { generateNextSeo } from 'next-seo/pages';
import { FiArrowRight } from 'react-icons/fi';
import { ogImageUrl } from '@/lib/og-image';
import { SITE_URL, jsonLd } from '@/lib/schema';
import { Reveal, SectionHeading } from '@/components/home/primitives';
import { AdLabel, ArrowIcon, CouponCode, FactList, LandingHero, LandingSection, buttonClass } from '@/components/landing/ui';
import RamRechner from '@/components/mdx/RamRechner';
import {
  GAMES,
  RAM_PATH,
  RAM_STEPS,
  ZAP_COUPON,
  ZAP_GAMESERVER_URL,
  article,
  calculate,
  findGame,
  formatGb,
  gamePath,
  localizeGame,
  manyMods,
  maxPlayersFor,
  modLevels,
  noMods,
  ramDataAsOf,
  recommendGame,
  toQuery,
  type GameProfile,
  type Lang,
  type ModLevel,
} from '@/data/server-ram';
import { GAME_GUIDES } from '@/data/game-ram-guides';
import { GAME_GUIDES_EN } from '@/data/server-ram.en';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const LINK = 'text-fg underline decoration-accent underline-offset-4 hover:text-accent';

/** Spielerzahlen für die Tabelle: typische Werte bis zum Maximum des Spiels */
function playerRows(game: GameProfile): number[] {
  const rows = [2, 5, 10, 20, 32, 50, 100, 200].filter((n) => n < game.maxPlayers);
  return [...rows.slice(-5), game.maxPlayers];
}

/** Paketgrößen für die Tabelle „Spieler nach RAM“: eine zu kleine Größe, dann bis das Maximum erreicht ist */
function ramRows(game: GameProfile): number[] {
  const steps = RAM_STEPS.filter((gb) => gb <= 64);
  const heaviest: ModLevel = game.mods ? 2 : 0;
  const first = steps.findIndex((gb) => maxPlayersFor(game, gb) > 0);
  const full = steps.findIndex((gb) => maxPlayersFor(game, gb, heaviest) === game.maxPlayers);
  const start = Math.max(0, first - 1);
  return steps.slice(start, full === -1 ? steps.length : full + 1).slice(0, 7);
}

type Faq = { question: string; answer: string };

/** Alle sprachabhängigen Texte der Seite */
function texts(lang: Lang, g: GameProfile) {
  const gb = (n: number) => formatGb(n, lang);
  if (lang === 'en') {
    const a = article(g.short);
    return {
      title: `${g.short} RAM calculator: how much RAM?`,
      description: (rec: string) =>
        `How much RAM does ${a} ${g.short} need? ${rec} for ${g.defaultPlayers} players, at least ${gb(g.min)}. Table by player count${g.mods ? ` and ${g.modLabel}` : ''}, calculator, tips and FAQ.`,
      ogTitle: `${g.short}: RAM requirements`,
      ogSubtitle: 'Calculator, table and tips',
      ogAlt: `RAM requirements for ${a} ${g.short}`,
      home: 'Home',
      calculatorName: 'Server RAM calculator',
      eyebrow: 'RAM calculator',
      h1: `How much RAM does ${a} ${g.short} need?`,
      inShort: 'In short',
      summary: (rec: string, heavy: string | null) => (
        <>
          For {g.defaultPlayers} players I recommend <strong className="font-medium text-accent">{rec} of RAM</strong>, at least {gb(g.min)}.
          {heavy ? ` With ${manyMods(g, lang)}, plan for ${heavy}.` : ''}
        </>
      ),
      facts: [`Up to ${g.maxPlayers} players`, `${g.disk} GB of storage`, `As of ${ramDataAsOf(lang)}`],
      calc: { label: 'Calculator', title: `RAM for your ${g.short}` },
      calcIntro: `Set the player count${g.mods ? ` and ${g.modLabel}` : ''}. The VPS tab shows what you need when the server runs alongside other services.`,
      table: { label: 'Table', title: 'Recommendation by player count' },
      tableIntro: 'All values include a 25% buffer and are rounded up to common plan sizes.',
      players: 'Players',
      recommendation: 'Recommended',
      tableNote: `At least ${gb(g.min)}. ${g.note} Guideline values as of ${ramDataAsOf(lang)}.`,
      slots: { label: 'Players', title: 'How many players fit into your RAM?' },
      slotsIntro: 'The reverse question: you know the size of your server and want to know how many players it can handle.',
      ram: 'RAM',
      tooSmall: 'too small',
      max: (n: number) => `${n} (max)`,
      slotLink: null as string | null,
      tips: { label: 'In practice', title: `Tips for your ${g.short}` },
      vps: { label: 'VPS', title: 'Running it yourself on a VPS' },
      vpsIntro: `If the server runs on your own VPS, you also need CPU and storage. For ${g.defaultPlayers} players without other services, the calculator recommends:`,
      cores: (n: number) => `${n} ${n === 1 ? 'core' : 'cores'}`,
      vpsNote: 'The operating system is included.',
      vpsLink: 'Add more services in the calculator',
      faq: { label: 'FAQ', title: `Frequently asked questions about the ${g.short}` },
      more: { label: 'More', title: 'More calculators' },
      allGames: 'All games in the RAM calculator',
      otherGames: 'More games',
      adAria: 'Ad: ZAP-Hosting',
      adLabel: (
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          Recommendation <span className="text-[#4a4946]">/</span> Ad
        </p>
      ),
      adTitle: `Rent ${a} ${g.short}`,
      adText: 'At ZAP-Hosting you pick the recommended size and upgrade later as your world grows.',
      adButton: 'View plans',
      discount: 'off (depending on product)',
      percent: '20%',
      faqDefault: (rec: string, heavy: string | null): Faq => ({
        question: `How much RAM does ${a} ${g.short} need for ${g.defaultPlayers} players?`,
        answer: `For ${g.defaultPlayers} players${g.mods ? noMods(g, lang) : ''}, the calculator recommends ${rec} of RAM, including a 25% buffer.${heavy ? ` With ${manyMods(g, lang)}, plan for ${heavy}.` : ''}`,
      }),
      faqMin: {
        question: `What is the minimum RAM for ${a} ${g.short}?`,
        answer: `The lower limit is ${gb(g.min)}. That runs the server for a few players, but it leaves no room for peaks or growth.`,
      } as Faq,
      faqPlayers: (n: number, rec: string, heavy: string | null): Faq => ({
        question: `How much RAM does ${a} ${g.short} need for ${n} players?`,
        answer: `For ${n} players, the calculator recommends ${rec} of RAM${heavy ? `, or ${heavy} with ${manyMods(g, lang)}` : ''}. The 25% buffer is included.`,
      }),
      faqSlots: (ram: string, n: number): Faq => ({
        question: `How many players can ${a} ${g.short} with ${ram} of RAM handle?`,
        answer: `According to the calculator, ${a} ${g.short} with ${ram} handles up to ${n} players${n === g.maxPlayers ? ', which is the maximum the calculator covers for this game' : ''}. This includes a 25% buffer${g.mods ? ` and assumes no ${g.modLabel}` : ''}.`,
      }),
    };
  }
  return {
    title: `${g.short} RAM-Rechner: Wie viel RAM?`,
    description: (rec: string) =>
      `Wie viel RAM braucht ein ${g.short}? Für ${g.defaultPlayers} Spieler ${rec}, mindestens ${gb(g.min)}. Tabelle nach Spielerzahl${g.mods ? ` und ${g.modLabel}` : ''}, Rechner, Tipps und FAQ.`,
    ogTitle: `${g.short}: RAM-Bedarf`,
    ogSubtitle: 'Rechner, Tabelle und Tipps',
    ogAlt: `RAM-Bedarf für einen ${g.short}`,
    home: 'Startseite',
    calculatorName: 'Server RAM-Rechner',
    eyebrow: 'RAM-Rechner',
    h1: `Wie viel RAM braucht ein ${g.short}?`,
    inShort: 'Kurz gesagt',
    summary: (rec: string, heavy: string | null) => (
      <>
        Für {g.defaultPlayers} Spieler empfehle ich <strong className="font-medium text-accent">{rec} RAM</strong>, mindestens {gb(g.min)}.
        {heavy ? ` Mit ${manyMods(g, lang)} eher ${heavy}.` : ''}
      </>
    ),
    facts: [`Bis ${g.maxPlayers} Spieler`, `${g.disk} GB Speicherplatz`, `Stand ${ramDataAsOf(lang)}`],
    calc: { label: 'Rechner', title: `RAM für deinen ${g.short}` },
    calcIntro: `Stell Spielerzahl${g.mods ? ` und ${g.modLabel}` : ''} ein. Unter „vServer“ siehst du, was du brauchst, wenn der Server zusammen mit anderen Diensten läuft.`,
    table: { label: 'Tabelle', title: 'Empfehlung nach Spielerzahl' },
    tableIntro: 'Alle Werte inklusive 25 % Puffer und auf übliche Paketgrößen gerundet.',
    players: 'Spieler',
    recommendation: 'Empfehlung',
    tableNote: `Mindestens ${gb(g.min)}. ${g.note} Stand der Richtwerte: ${ramDataAsOf(lang)}.`,
    slots: { label: 'Slots', title: 'Wie viele Spieler schafft dein RAM?' },
    slotsIntro: 'Die umgekehrte Frage: Du kennst die Größe deines Servers und willst wissen, wie viele Spieler darauf passen.',
    ram: 'RAM',
    tooSmall: 'zu wenig',
    max: (n: number) => `${n} (Maximum)`,
    slotLink: 'Im Slot-Rechner ausprobieren' as string | null,
    tips: { label: 'Praxis', title: `Tipps für deinen ${g.short}` },
    vps: { label: 'vServer', title: 'Selbst auf einem vServer betreiben' },
    vpsIntro: `Läuft der Server auf deinem eigenen vServer, brauchst du auch CPU und Speicherplatz. Für ${g.defaultPlayers} Spieler ohne weitere Dienste empfiehlt der Rechner:`,
    cores: (n: number) => `${n} ${n === 1 ? 'Kern' : 'Kerne'}`,
    vpsNote: 'Das Betriebssystem ist eingerechnet.',
    vpsLink: 'Weitere Dienste im Rechner ergänzen',
    faq: { label: 'FAQ', title: `Häufige Fragen zum ${g.short}` },
    more: { label: 'Weiterlesen', title: 'Mehr zum Thema' },
    allGames: 'Alle Spiele im RAM-Rechner',
    otherGames: 'Weitere Spiele',
    adAria: 'Anzeige: ZAP-Hosting',
    adLabel: <AdLabel />,
    adTitle: `${g.short} mieten`,
    adText: 'Bei ZAP-Hosting wählst du die empfohlene Größe und erweiterst sie später, wenn eure Welt wächst.',
    adButton: `${g.short} ansehen`,
    discount: 'Rabatt (je nach Produkt)',
    percent: '20 %',
    faqDefault: (rec: string, heavy: string | null): Faq => ({
      question: `Wie viel RAM braucht ein ${g.short} für ${g.defaultPlayers} Spieler?`,
      answer: `Für ${g.defaultPlayers} Spieler${g.mods ? noMods(g, lang) : ''} empfiehlt der Rechner ${rec} RAM, inklusive 25 % Puffer.${heavy ? ` Mit ${manyMods(g, lang)} sind es ${heavy}.` : ''}`,
    }),
    faqMin: {
      question: `Wie viel RAM braucht ein ${g.short} mindestens?`,
      answer: `Als Untergrenze gelten ${gb(g.min)}. Damit läuft der Server für wenige Spieler, Spitzen und Wachstum fängt dieser Wert aber nicht ab.`,
    } as Faq,
    faqPlayers: (n: number, rec: string, heavy: string | null): Faq => ({
      question: `Wie viel RAM braucht ein ${g.short} für ${n} Spieler?`,
      answer: `Für ${n} Spieler empfiehlt der Rechner ${rec} RAM${heavy ? `, mit ${manyMods(g, lang)} ${heavy}` : ''}. Der Puffer von 25 % ist eingerechnet.`,
    }),
    faqSlots: (ram: string, n: number): Faq => ({
      question: `Wie viele Spieler schafft ein ${g.short} mit ${ram} RAM?`,
      answer: `Auf einen ${g.short} mit ${ram} passen laut Rechner bis zu ${n} Spieler${n === g.maxPlayers ? ', das ist das Maximum, das der Rechner für dieses Spiel vorsieht' : ''}. Gerechnet mit 25 % Puffer${g.mods ? ` und ohne ${g.modLabel}` : ''}.`,
    }),
  };
}

/** Seite für ein einzelnes Spiel: Rechner, Tabellen, Tipps und FAQ, deutsch oder englisch */
export default function GameRamPage({ id, lang = 'de' }: { id: string; lang?: Lang }) {
  const game = localizeGame(findGame(id)!, lang);
  const guide = (lang === 'en' ? GAME_GUIDES_EN : GAME_GUIDES)[id];
  const t = texts(lang, game);
  const gb = (n: number) => formatGb(n, lang);
  const base = RAM_PATH[lang];
  const path = gamePath(game.id, lang);
  const url = `${SITE_URL}${path}`;
  const rows = playerRows(game);
  const sizes = ramRows(game);
  const levels = game.mods ? modLevels(lang) : modLevels(lang).slice(0, 1);

  const defaultGb = recommendGame(game, game.defaultPlayers);
  const defaultRec = gb(defaultGb);
  // Hinweis auf Mods nur, wenn sich die Empfehlung dadurch ändert
  const heavyGb = game.mods ? recommendGame(game, game.defaultPlayers, 2) : 0;
  const heavyRec = heavyGb > defaultGb ? gb(heavyGb) : null;
  const vserverInput = { mode: 'vserver' as const, gameId: game.id, players: game.defaultPlayers, mods: 0 as ModLevel, apps: {} };
  const onVServer = calculate(vserverInput, lang);

  // Weitere Spielerzahlen für die FAQ: kleinste, mittlere und größte Zeile der Tabelle
  const otherRows = rows.filter((n) => n !== game.defaultPlayers);
  const faqPlayers = [...new Set([otherRows[0], otherRows[Math.floor(otherRows.length / 2)], otherRows[otherRows.length - 1]])].filter(
    (n) => n !== undefined,
  );

  const title = t.title;
  const description = t.description(defaultRec);

  const faqs: Faq[] = [
    t.faqDefault(defaultRec, heavyRec),
    t.faqMin,
    ...guide.faqs,
    ...faqPlayers.map((players) => {
      const rec = recommendGame(game, players);
      const heavy = game.mods ? recommendGame(game, players, 2) : rec;
      return t.faqPlayers(players, gb(rec), heavy > rec ? gb(heavy) : null);
    }),
    t.faqSlots(defaultRec, maxPlayersFor(game, defaultGb)),
  ];

  const ogImage = ogImageUrl({ title: t.ogTitle, subtitle: t.ogSubtitle, baseUrl: SITE_URL });
  const links = lang === 'de' ? [
    ...(guide.links ?? []),
    { href: '/blog/wie-viel-ram-braucht-mein-server', title: 'Wie viel RAM braucht mein Server?' },
    { href: '/blog/zap-hosting-lifetime', title: 'Server kaufen statt mieten' },
  ] : [{ href: base, title: t.allGames }];

  return (
    <>
      <Head>
        {generateNextSeo({
          title,
          description,
          canonical: url,
          languageAlternates: [
            { hrefLang: 'de', href: `${SITE_URL}${gamePath(game.id, 'de')}` },
            { hrefLang: 'en', href: `${SITE_URL}${gamePath(game.id, 'en')}` },
            { hrefLang: 'x-default', href: `${SITE_URL}${gamePath(game.id, 'en')}` },
          ],
          openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: lang === 'en' ? 'en_US' : 'de_DE',
            images: [{ url: ogImage, width: 1200, height: 630, alt: t.ogAlt }],
          },
        })}
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            inLanguage: lang === 'en' ? 'en' : 'de-DE',
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
              { '@type': 'ListItem', position: 1, name: t.home, item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: t.calculatorName, item: `${SITE_URL}${base}` },
              { '@type': 'ListItem', position: 3, name: cap(game.short), item: url },
            ],
          }),
        }}
      />

      <main className="overflow-x-clip">
        <LandingHero
          eyebrow={
            <>
              <Link href={base} className="hover:text-fg">
                {t.eyebrow}
              </Link>{' '}
              / {game.short}
            </>
          }
          title={t.h1}
          intro={<p>{guide.intro}</p>}
        >
          <div className="mt-8 max-w-2xl border border-accent/40 bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{t.inShort}</p>
            <p className="mt-2 text-lg leading-relaxed text-fg">{t.summary(defaultRec, heavyRec)}</p>
          </div>
          <FactList className="mt-8" items={t.facts} />
        </LandingHero>

        <LandingSection id={lang === 'en' ? 'calculator' : 'rechner'}>
          <SectionHeading index="01" label={t.calc.label} title={t.calc.title}>
            {t.calcIntro}
          </SectionHeading>
          <div className="mt-6 grid sm:mt-10 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <RamRechner initialGame={game.id} syncUrl sharePath={path} lang={lang} />
            </div>
          </div>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="02" label={t.table.label} title={t.table.title}>
            {t.tableIntro}
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="article min-w-0 lg:col-span-8 lg:col-start-5">
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>{t.players}</th>
                      {levels.map((level) => (
                        <th key={level.value}>{game.mods ? `${cap(game.modLabel)}: ${level.label}` : t.recommendation}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((players) => (
                      <tr key={players}>
                        <td>{players}</td>
                        {levels.map((level) => (
                          <td key={level.value}>{gb(recommendGame(game, players, level.value))}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-faint">{t.tableNote}</p>
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="03" label={t.slots.label} title={t.slots.title}>
            {t.slotsIntro}
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="article min-w-0 lg:col-span-8 lg:col-start-5">
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>{t.ram}</th>
                      {levels.map((level) => (
                        <th key={level.value}>{game.mods ? `${cap(game.modLabel)}: ${level.label}` : t.players}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size) => (
                      <tr key={size}>
                        <td>{gb(size)}</td>
                        {levels.map((level) => {
                          const players = maxPlayersFor(game, size, level.value);
                          return <td key={level.value}>{players === 0 ? t.tooSmall : players === game.maxPlayers ? t.max(players) : players}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {t.slotLink && (
                <p className="mt-4 text-sm text-muted">
                  <Link href={`/server-slot-rechner?spiel=${game.id}&ram=${defaultGb}`} className={LINK}>
                    {t.slotLink}
                  </Link>
                </p>
              )}
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="04" label={t.tips.label} title={t.tips.title} />
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
          <SectionHeading index="05" label={t.vps.label} title={t.vps.title}>
            {t.vpsIntro}
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <div className="grid grid-cols-3 gap-px border border-line bg-line text-center">
                {[
                  { label: 'RAM', value: gb(onVServer.recommended) },
                  { label: 'vCPU', value: t.cores(onVServer.cores ?? 1) },
                  { label: 'SSD', value: `${onVServer.disk} GB` },
                ].map((item) => (
                  <div key={item.label} className="bg-canvas px-3 py-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{item.label}</div>
                    <div className="mt-1 text-2xl font-medium tracking-[-0.02em] text-fg">{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-muted">
                {game.cpuNote} {t.vpsNote}{' '}
                <Link href={`${base}?${toQuery(vserverInput)}`} className={LINK}>
                  {t.vpsLink}
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="06" label={t.faq.label} title={t.faq.title} />
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
          <SectionHeading index="07" label={t.more.label} title={t.more.title} />
          <Reveal className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12">
            <ul className="space-y-3 lg:col-span-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-2 text-fg hover:text-accent">
                    {link.title}
                    <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-8">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{t.otherGames}</p>
              <ul className="flex flex-wrap gap-2">
                {GAMES.filter((g) => g.id !== game.id).map((g) => (
                  <li key={g.id}>
                    <Link
                      href={gamePath(g.id, lang)}
                      className="inline-block border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                    >
                      {cap(localizeGame(g, lang).short)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <Reveal>
            <aside className="relative border border-line bg-surface p-6 sm:p-10" aria-label={t.adAria}>
              <span className="absolute inset-x-0 top-0 h-px bg-accent/70" aria-hidden="true" />
              {t.adLabel}
              <h2 className="mt-4 max-w-3xl text-[2rem] font-medium leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl">{t.adTitle}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{t.adText}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={game.url ?? ZAP_GAMESERVER_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.primary}>
                  {t.adButton}
                  <ArrowIcon />
                </a>
                <CouponCode code={ZAP_COUPON}>
                  <span>
                    = <span className="text-accent">{t.percent}</span> {t.discount}
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
