import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { Container, Eyebrow } from '@/components/home/primitives';

/** Ausweis, der am Band pendelt, mit Stempel "Zugang verweigert" */
function DeniedBadge() {
  return (
    <div className="relative mx-auto flex h-[340px] w-full max-w-[300px] justify-center sm:h-[440px]" aria-hidden="true">
      {/* Zentrierung und Pendeln getrennt: die Animation setzt transform und würde sonst die Zentrierung überschreiben */}
      <div className="origin-top motion-safe:animate-swing">
        <div className="mx-auto h-[110px] w-[26px] bg-accent sm:h-[190px]" />
        <div className="mx-auto -mt-1 h-[22px] w-[22px] rounded-full border-[4px] border-[#c9c8c4]" />
        <div className="relative mt-1 w-[220px] rounded-[10px] border border-[#3a3a38] bg-[#2a2a29] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <div className="mx-auto h-[7px] w-[40px] rounded-full bg-canvas" />
          <div className="mt-4 flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
            <span>Ausweis</span>
            <span>Fehler 404</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- kleines statisches Bild */}
          <img src="/img/badge-photo.jpg" alt="" className="mt-3 h-[58px] w-[58px] border-b-2 border-accent object-cover grayscale" />
          <p className="mt-6 text-[26px] font-medium leading-[0.95] tracking-[-0.04em] text-fg">
            Achim
            <br />
            Sommer
          </p>
          <p className="mt-1 text-[11px] text-accent">Head of IT</p>
          <span className="absolute right-3 top-[92px] rotate-[-14deg] border-2 border-accent px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
            Zugang
            <br />
            verweigert
          </span>
        </div>
      </div>
    </div>
  );
}

/** Inhalt der 404-Seite, gemeinsam für App- und Pages-Router */
export default function NotFoundContent() {
  const links = [
    { href: '/', label: 'Zur Startseite' },
    { href: '/blog', label: 'Zum Blog' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-10 pb-16 pt-28 lg:grid-cols-12 lg:pt-24">
      <div className="lg:col-span-7">
        <Eyebrow index="404">Seite nicht gefunden</Eyebrow>
        <h1 className="mt-6 text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[1] tracking-[-0.045em] text-fg">
          Kein Zutritt.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Diesen Raum gibt es nicht, oder dein Ausweis ist hier nicht freigeschaltet. Vielleicht wurde die Seite
          verschoben, oder in der Adresse steckt ein Tippfehler.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                i === 0 ? 'bg-fg text-canvas hover:bg-accent' : 'border border-line text-fg hover:border-accent'
              }`}
            >
              {link.label}
              <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5">
        <DeniedBadge />
      </div>
    </Container>
  );
}
