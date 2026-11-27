import Head from 'next/head';
import Link from 'next/link';
import { generateNextSeo } from 'next-seo/pages';
import { FiArrowRight } from 'react-icons/fi';
import { ogImageUrl } from '@/lib/og-image';
import { SITE_URL, jsonLd, personRef } from '@/lib/schema';
import { Reveal, SectionHeading } from '@/components/home/primitives';
import { ArrowIcon, CouponCode, FactList, LandingHero, LandingSection, buttonClass } from '@/components/landing/ui';
import RamRechner from '@/components/mdx/RamRechner';
import RamTabelle from '@/components/mdx/RamTabelle';
import {
  APPS,
  GAMES,
  HEADROOM,
  OS_BASE,
  RAM_PATH,
  RAM_STEPS,
  ZAP_COUPON,
  ZAP_GAMESERVER_URL,
  ZAP_VSERVER_URL,
  calculate,
  findGame,
  formatGb,
  gamePath,
  localizeGame,
  ramDataAsOf,
  recommendGame as recommend,
} from '@/data/server-ram';

const PATH = RAM_PATH.en;
const URL = `${SITE_URL}${PATH}`;
const TITLE = 'Server RAM Calculator: How Much Memory Do You Need?';
const DESCRIPTION =
  'Free RAM calculator for game servers and VPS: pick a game, player count and mods, or services like Docker, Coolify and WordPress, and see RAM, CPU and storage instantly.';
const BUFFER = Math.round((HEADROOM - 1) * 100);

const gb = (n: number) => formatGb(n, 'en');

/** Recommendation for a game at a player count, same as the calculator */
const recommendGame = (id: string, players: number) => gb(recommend(findGame(id)!, players));

/** Recommendation for a set of services, same as the calculator */
const recommendApps = (ids: string[]) => {
  const result = calculate({ mode: 'vserver', gameId: '', players: 0, mods: 0, apps: Object.fromEntries(ids.map((id) => [id, 1])) }, 'en');
  return `${gb(result.recommended)} of RAM, ${result.cores} vCPU and ${result.disk} GB of SSD storage`;
};

// Answers are computed from the same data as the calculator so nothing drifts apart
const faqs = [
  {
    question: 'How much RAM does a Minecraft server need for 20 players?',
    answer: `For Minecraft Java with Paper or Vanilla, the calculator recommends ${recommendGame('minecraft', 20)} for 20 players. A larger modpack needs ${recommendGame('minecraft-modpack', 20)} at the same player count, and the Bedrock Edition gets by with ${recommendGame('minecraft-bedrock', 20)}.`,
  },
  {
    question: 'How much RAM does a VPS need for Docker and Coolify?',
    answer: `For Docker and Coolify alone, the calculator recommends ${recommendApps(['docker', 'coolify'])}. Add a Next.js app with a database and it is ${recommendApps(['docker', 'coolify', 'nextjs', 'database'])}. Coolify itself needs at least 2 GB according to its documentation.`,
  },
  {
    question: 'How accurate is the calculator?',
    answer:
      'The values are guidelines based on vendor requirements and experience from running servers, and they lean towards the generous side. Mods, plugins, large worlds and long uptimes without a restart can need considerably more. After launch, watch the real usage for a few days.',
  },
  {
    question: 'What happens when a server runs out of RAM?',
    answer:
      'First the server gets slow because the system starts swapping to disk. Players notice that as stutter and lag. If that is not enough, Linux kills processes, and the game server or a container crashes. More RAM or fewer services on one machine solves the problem.',
  },
  {
    question: 'Do more players need more RAM or more CPU?',
    answer:
      'Both, but to different degrees. RAM usage grows with the world, mods and stored data. The CPU decides whether the server stays smooth when many things happen at once. Many game servers only use a few cores, so high clock speed matters more than core count.',
  },
  {
    question: 'Can I add RAM later?',
    answer:
      'With rented game servers and VPS plans, usually yes, often without reinstalling. So start with a size that fits rather than one that is far too large, and upgrade when the measurements say so.',
  },
];

const steps = [
  {
    title: 'Estimate usage',
    text: `Game server: the base usage of the game plus a share per player, never less than the minimum of the game, plus mods or plugins. VPS: ${gb(OS_BASE)} for the operating system plus services and optionally a game server. For a VPS, the calculator also estimates CPU cores and storage.`,
  },
  {
    title: 'Add a buffer',
    text: `${BUFFER}% is added to the estimate for load peaks, updates and growth. A server that permanently runs at its limit gets slow.`,
  },
  {
    title: 'Round up to a plan size',
    text: `The result is rounded up to the next common size: ${RAM_STEPS.slice(0, 8)
      .map((s) => `${s} GB`)
      .join(', ')} and so on.`,
  },
];

export default function ServerRamCalculator() {
  const ogImage = ogImageUrl({ title: 'Server RAM Calculator', subtitle: 'Size game servers and VPS correctly', baseUrl: SITE_URL });

  return (
    <>
      <Head>
        {generateNextSeo({
          title: TITLE,
          description: DESCRIPTION,
          canonical: URL,
          languageAlternates: [
            { hrefLang: 'de', href: `${SITE_URL}${RAM_PATH.de}` },
            { hrefLang: 'en', href: URL },
            { hrefLang: 'x-default', href: URL },
          ],
          openGraph: {
            title: TITLE,
            description: DESCRIPTION,
            url: URL,
            type: 'website',
            locale: 'en_US',
            images: [{ url: ogImage, width: 1200, height: 630, alt: 'Server RAM calculator by Achim Sommer' }],
          },
        })}
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Server RAM Calculator',
            url: URL,
            description: DESCRIPTION,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'All',
            inLanguage: 'en',
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
            inLanguage: 'en',
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
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Server RAM calculator', item: URL },
            ],
          }),
        }}
      />

      <main className="overflow-x-clip">
        <LandingHero
          eyebrow="Free tool"
          title="Server RAM calculator"
          intro={
            <p>
              How much memory does your server need? Pick a game, player count and mods, or the services on your VPS. The
              calculator instantly shows RAM including a buffer, and for a VPS also CPU and storage.
            </p>
          }
        >
          <FactList className="mt-8" items={[`${GAMES.length} game servers`, `${APPS.length} services for your VPS`, 'No sign-up']} />
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#calculator" className={buttonClass.primary}>
              Open the calculator
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#reference" className={buttonClass.secondary}>
              View reference values
            </a>
            <Link href={RAM_PATH.de} hrefLang="de" lang="de" className="px-2 py-3 text-sm text-muted hover:text-fg">
              Deutsche Version
            </Link>
          </div>
        </LandingHero>

        <LandingSection id="calculator">
          <SectionHeading index="01" label="Calculator" title="Calculate your RAM">
            A game server by game, players and mods, or a VPS with services and an optional game server on top. Use
            &quot;Share result&quot; to send your selection as a link, for example to your group on Discord.
          </SectionHeading>
          <div className="mt-6 grid sm:mt-10 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <RamRechner syncUrl lang="en" />
            </div>
          </div>
        </LandingSection>

        <LandingSection id="games">
          <SectionHeading index="02" label="Games" title="A calculator for your game">
            Every game has its own page with a table by player count, tips and answers to the most common questions.
          </SectionHeading>
          <Reveal className="mt-12 sm:mt-16">
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {GAMES.map((raw) => {
                const g = localizeGame(raw, 'en');
                const players = Math.min(5, g.maxPlayers);
                return (
                  <li key={g.id} className="bg-canvas">
                    <Link href={gamePath(g.id, 'en')} className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-surface">
                      <span>
                        <span className="block font-medium text-fg">{g.short.charAt(0).toUpperCase() + g.short.slice(1)}</span>
                        <span className="mt-1 block font-mono text-xs text-faint">
                          from {gb(recommend(g, players))} for {players} players
                        </span>
                      </span>
                      <FiArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="03" label="Method" title="How the calculator works">
            No magic, just three steps. You can check every value yourself.
          </SectionHeading>
          <Reveal className="mt-12 sm:mt-16">
            <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
              {steps.map((item, i) => (
                <li key={item.title} className="bg-canvas p-6 sm:p-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Step {i + 1}</span>
                  <h3 className="mt-3 text-xl font-medium tracking-[-0.02em] text-fg">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </LandingSection>

        <LandingSection id="reference">
          <SectionHeading index="04" label="Reference" title="RAM for game servers">
            Minimum values and recommendations for typical player counts. With many mods or plugins, plan one size up.
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="article min-w-0 lg:col-span-8 lg:col-start-5">
              <RamTabelle type="games" lang="en" />
              <p className="mt-4 text-sm text-faint">Guideline values as of {ramDataAsOf('en')}.</p>
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="05" label="Reference" title="RAM for services on a VPS">
            Typical usage in operation, including the service&apos;s own database where one is required. For the whole
            server, add up the services and the operating system.
          </SectionHeading>
          <Reveal className="mt-10 grid sm:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="article min-w-0 lg:col-span-8 lg:col-start-5">
              <RamTabelle type="apps" lang="en" />
            </div>
          </Reveal>
        </LandingSection>

        <LandingSection>
          <SectionHeading index="06" label="FAQ" title="Frequently asked questions about server RAM" />
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
            <aside className="relative border border-line bg-surface p-6 sm:p-10" aria-label="Ad: ZAP-Hosting">
              <span className="absolute inset-x-0 top-0 h-px bg-accent/70" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                Recommendation <span className="text-[#4a4946]">/</span> Ad
              </p>
              <h2 className="mt-4 max-w-3xl text-[2rem] font-medium leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl">
                Found the right size?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                At ZAP-Hosting you can rent game servers and VPS plans in the recommended size and upgrade them later at any
                time.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={ZAP_GAMESERVER_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.primary}>
                  View game servers
                  <ArrowIcon />
                </a>
                <a href={ZAP_VSERVER_URL} target="_blank" rel="sponsored noopener noreferrer" className={buttonClass.secondary}>
                  View VPS plans
                  <ArrowIcon />
                </a>
                <CouponCode code={ZAP_COUPON}>
                  <span>
                    = <span className="text-accent">20%</span> off (depending on product)
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
