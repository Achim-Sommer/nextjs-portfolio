'use client';

import { Reveal, Section, SectionHeading } from './home/primitives';

const FOCUS = [
  {
    title: 'Infrastruktur und Netzwerk',
    text: 'Server, Virtualisierung, Netzwerke und Backups, die zuverlässig laufen und mit dem Unternehmen mitwachsen.',
    tools: ['Hyper-V', 'Docker', 'Linux', 'Switching', 'Backup'],
  },
  {
    title: 'Identität und Security',
    text: 'Zugriffe sauber regeln, Angriffsflächen klein halten und Standards einführen, die im Alltag auch gelebt werden.',
    tools: ['Entra ID', 'Active Directory', 'MFA', 'Patch-Management', 'PingCastle'],
  },
  {
    title: 'Moderner Arbeitsplatz',
    text: 'Geräte, Tools und Abläufe, mit denen Teams gerne arbeiten: vom ersten Arbeitstag bis zur Rückgabe des Laptops.',
    tools: ['Microsoft 365', 'Atlassian', 'NinjaOne', 'MDM', 'macOS', 'Windows'],
  },
  {
    title: 'Softwareentwicklung',
    text: 'Web-Apps, Automatisierungen und Integrationen. Was sich wiederholt, wird ein Skript.',
    tools: ['Next.js', 'React', 'TypeScript', 'Python', 'PowerShell', 'Graph API'],
  },
];

export default function AboutMe() {
  return (
    <Section id="about-me">
      <SectionHeading
        index="01"
        label="Profil"
        title="Ich sorge dafür, dass IT im Hintergrund einfach funktioniert."
      >
        <p>
          Als Head of IT bei der amber Tech GmbH verantworte ich die interne IT eines wachsenden
          KI-Startups: Microsoft 365 und Entra ID, Geräteverwaltung, Security-Standards und Backups.
          Davor habe ich die IT der Schumacher Gruppe geleitet, SAP-Anwendungen entwickelt und bei den
          Johannitern Netzwerke und Arbeitsplätze betreut.
        </p>
        <p className="mt-5">
          Programmiert habe ich schon vorher. Seit 2018 entwickle ich Webanwendungen und
          Gaming-Projekte, heute vor allem mit Next.js und TypeScript. Parallel schließe ich mein
          Studium der Wirtschaftsinformatik an der FOM ab.
        </p>
      </SectionHeading>

      <div className="mt-20 lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Schwerpunkte</p>
          </Reveal>
        </div>

        <ol className="mt-6 lg:col-span-8 lg:mt-0">
          {FOCUS.map((item, i) => (
            <li key={item.title} className="border-t border-line last:border-b">
              <Reveal delay={i * 0.05} className="grid gap-3 py-7 sm:grid-cols-8 sm:gap-6">
                <div className="flex gap-4 sm:col-span-3">
                  <span className="pt-1 font-mono text-[11px] text-accent">0{i + 1}</span>
                  <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">{item.title}</h3>
                </div>
                <div className="pl-8 sm:col-span-5 sm:pl-0">
                  <p className="text-[15px] leading-relaxed text-muted">{item.text}</p>
                  <p className="mt-3 font-mono text-xs leading-relaxed text-faint">
                    {item.tools.join(' / ')}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
