'use client';
import { motion } from 'framer-motion';
import { Card, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles } from './ui/sparkles';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'Moderne Portfolio-Website mit Next.js 14, TypeScript und Tailwind CSS. Features: YouTube API Integration, 3D Animationen, Dark Mode.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/yourusername/portfolio',
  },
  {
    title: "FiveM Development",
    description: "Entwicklung von hochperformanten FiveM-Systemen mit Lua und JavaScript. Spezialisiert auf Rollenspiel-Server mit komplexen Gameplay-Mechaniken.",
    technologies: ["Lua", "JavaScript", "FiveM", "Gaming"],
    link: "https://github.com/yourusername/fivem-project",
  },
  {
    title: "YouTube Tutorials",
    description: "Eine Sammlung von Tutorials und Code-Beispielen für die FiveM-Entwicklung. Fokus auf Best Practices und fortgeschrittene Techniken.",
    technologies: ["Tutorial", "FiveM", "Coding", "Education"],
    link: "https://youtube.com/@yourusername",
  },
];

export default function ProjectShowcase() {
  return (
    <section id="github-section" className="py-20">
      <div className="container mx-auto px-4">
        <Sparkles>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Meine Projekte
          </motion.h2>
        </Sparkles>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Card className="h-full transition-transform duration-300 hover:-translate-y-2">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="mb-4 h-48 w-full rounded-lg object-cover"
                    />
                  )}
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="glow">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
