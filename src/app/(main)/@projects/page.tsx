import dynamic from 'next/dynamic';

// Dynamischer Import der Projekte-Komponente
const ProjectShowcase = dynamic(() => import('@/components/ProjectShowcase'), {
  ssr: true
});

const ZapHosting = dynamic(() => import('@/components/ZapHosting'), {
  ssr: true
});

export const fetchCache = 'force-cache';
export const revalidate = 3600;

export default async function Projects() {
  return (
    <>
      <section className="py-20">
        <ProjectShowcase />
      </section>
      
      <section className="py-20">
        <ZapHosting />
      </section>
    </>
  );
}
