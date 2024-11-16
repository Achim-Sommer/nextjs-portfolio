import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialMedia from '@/components/SocialMedia';
import AboutMe from '@/components/AboutMe';
import Skills from '@/components/Skills';
import Counter from '@/components/Counter';
import GitHubRepos from '@/components/GitHubRepos';
import Footer from '@/components/Footer';
import ProjectShowcase from '@/components/ProjectShowcase';
import ZapHosting from '@/components/ZapHosting';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <SocialMedia />
      <AboutMe />
      <Skills />
      <ZapHosting />
      <Counter />
      <ProjectShowcase />
      <GitHubRepos />
      <Footer />
    </main>
  );
}
