import SiteHeader from '@/components/home/SiteHeader';
import Footer from '@/components/Footer';
import { Container, Eyebrow } from '@/components/home/primitives';

/** Rahmen für Impressum, Datenschutz und Kontakt im Design der Startseite */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  children,
  wide = false,
}: {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  /** Formular statt Fließtext: ohne Textformatierung */
  wide?: boolean;
}) {
  return (
    <>
      <SiteHeader base="/" />
      <main id="main-content">
        <header className="border-b border-line">
          <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 hyphens-auto text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-fg">
              {title}
            </h1>
            {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</div>}
          </Container>
        </header>
        <Container className="py-14 sm:py-20">
          <div className={wide ? 'max-w-[760px]' : 'legal max-w-[720px]'}>{children}</div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
