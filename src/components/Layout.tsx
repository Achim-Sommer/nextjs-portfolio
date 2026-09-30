import SiteHeader from './home/SiteHeader';
import Footer from './Footer';
import { plexMono, plexSans } from '@/lib/fonts';

interface LayoutProps {
  children: React.ReactNode;
}

/** Rahmen für alle Seiten im Pages-Router: gleicher Header und Footer wie die Startseite */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`${plexSans.variable} ${plexMono.variable} flex min-h-screen flex-col bg-canvas font-sans text-fg`}>
      <SiteHeader base="/" />
      <div id="main-content" className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
