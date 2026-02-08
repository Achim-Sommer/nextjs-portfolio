import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isBlogPage = router.pathname.includes('/blog');

  return (
    <div className={`min-h-screen flex flex-col relative ${isBlogPage ? 'bg-transparent' : 'bg-gray-900'}`}>
      <div className="absolute top-0 left-0 right-0 h-16 bg-transparent z-[1]" />
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
