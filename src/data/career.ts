/**
 * Zentrale Datenquelle für den beruflichen Werdegang.
 *
 * Wird an zwei Stellen gelesen:
 *  - src/components/CareerTimeline.tsx  (ausführliche Sektion auf der Startseite)
 *  - src/components/AboutMe.tsx         (kompakte "Erfahrung"-Kachel in der Bento-Grid)
 *
 * Dadurch muss eine Station nur an einer Stelle gepflegt werden.
 *
 * Hinweis zu den Farbklassen: Tailwind erkennt nur vollständige Klassennamen im
 * Quelltext. Deshalb stehen hier komplette Strings statt zusammengesetzter Namen
 * wie `border-${color}-500` — letztere würden beim Build wegoptimiert.
 */

export interface Accent {
  dot: string;
  ring: string;
  border: string;
  text: string;
  tag: string;
}

export interface CareerStation {
  id: string;
  /** Positionsbezeichnung */
  role: string;
  /** Kurzform für die Bento-Kachel */
  company: string;
  /** Vollständiger Firmenname für die Timeline */
  companyFull: string;
  companyUrl?: string;
  /** Ausgeschriebener Zeitraum für die Timeline */
  period: string;
  /** Kurzform für die Bento-Kachel */
  periodShort: string;
  location: string;
  /** Vor Ort / Hybrid / Remote */
  workMode?: string;
  /** Vollzeit / Selbstständig */
  employment?: string;
  /** Markiert die laufende Position */
  current?: boolean;
  accent: Accent;
  highlights: string[];
  tech: string[];
  /** Optionale Fußnote unter den Aufgaben */
  note?: string;
}

export interface EducationStation {
  id: string;
  degree: string;
  institution: string;
  periodShort: string;
  accent: Accent;
}

/**
 * Farben orientieren sich an den Markenfarben der jeweiligen Arbeitgeber,
 * ausgelesen aus deren Websites (theme-color bzw. dominanter Farbwert):
 *
 *   Schumacher Gruppe  #383482  (Indigo)
 *   ROOS IT            #ec6b10  (Orange)
 *   Johanniter         #eb003c  (Rot)
 *   FOM                #02c7b2  (Türkis)
 *
 * Ausnahme Schumacher: das originale #383482 ist auf schwarzem Grund zu dunkel,
 * um als Punkt und Text lesbar zu bleiben. Verwendet wird deshalb #726dc5 —
 * derselbe Farbton, nur aufgehellt.
 */
const accents: Record<string, Accent> = {
  // amber Tech GmbH
  amber: {
    dot: 'bg-amber-500',
    ring: 'ring-amber-500/20',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    tag: 'bg-amber-500/10 border-amber-500/20 text-amber-300/90',
  },
  // Schumacher Gruppe
  schumacher: {
    dot: 'bg-[#726dc5]',
    ring: 'ring-[#726dc5]/20',
    border: 'border-[#726dc5]/40',
    text: 'text-[#8f8ad6]',
    tag: 'bg-[#726dc5]/10 border-[#726dc5]/25 text-[#a5a1e0]',
  },
  // ROOS IT
  roos: {
    dot: 'bg-[#ec6b10]',
    ring: 'ring-[#ec6b10]/20',
    border: 'border-[#ec6b10]/40',
    text: 'text-[#f5893c]',
    tag: 'bg-[#ec6b10]/10 border-[#ec6b10]/25 text-[#f7a468]',
  },
  // Johanniter-Unfall-Hilfe
  johanniter: {
    dot: 'bg-[#eb003c]',
    ring: 'ring-[#eb003c]/20',
    border: 'border-[#eb003c]/40',
    text: 'text-[#ff4a72]',
    tag: 'bg-[#eb003c]/10 border-[#eb003c]/25 text-[#ff7b99]',
  },
  // FOM Hochschule
  fom: {
    dot: 'bg-[#02c7b2]',
    ring: 'ring-[#02c7b2]/20',
    border: 'border-[#02c7b2]/40',
    text: 'text-[#02c7b2]',
    tag: 'bg-[#02c7b2]/10 border-[#02c7b2]/25 text-[#4ddbcb]',
  },
  // Selbstständigkeit — bewusst neutral
  gray: {
    dot: 'bg-gray-500',
    ring: 'ring-gray-500/20',
    border: 'border-gray-600/40',
    text: 'text-gray-400',
    tag: 'bg-white/[0.04] border-white/[0.08] text-gray-400',
  },
};

export const careerStations: CareerStation[] = [
  {
    id: 'amber',
    role: 'Head of IT',
    company: 'amber Tech GmbH',
    companyFull: 'amber Tech GmbH',
    companyUrl: 'https://ambersearch.de/',
    period: 'Aug 2026 — Heute',
    periodShort: 'Aug 2026 — Heute',
    location: 'Aachen',
    workMode: 'Hybrid',
    employment: 'Vollzeit',
    current: true,
    accent: accents.amber,
    highlights: [
      'Gesamtverantwortung für die interne IT-Landschaft und deren strategische Weiterentwicklung',
      'IT-Infrastruktur skalierbar, sicher und effizient auf das Wachstum eines KI-Startups ausrichten',
      'Administration der zentralen SaaS-Systeme: Microsoft 365, Atlassian, Identity- und Collaboration-Tools',
      'Security-Standards von MFA und Patch-Management bis Endpoint-Security und Backup-Konzepten',
      'Hardware-Flotte und Mobile Device Management inklusive Geräte- und Zugriffsrichtlinien',
      'Leitung von Projekten wie Systemmigrationen, Automatisierungen und Tool-Konsolidierungen',
    ],
    tech: ['Microsoft 365', 'Entra ID', 'Atlassian', 'MDM', 'macOS', 'Windows'],
  },
  {
    id: 'schumacher',
    role: 'IT-Leiter',
    company: 'Schumacher Gruppe',
    companyFull: 'Schumacher Gruppe',
    companyUrl: 'https://schumacher.ac/',
    period: 'Juli 2025 — Juli 2026',
    periodShort: 'Juli 2025 — Juli 2026',
    location: 'Würselen',
    workMode: 'Vor Ort',
    employment: 'Vollzeit',
    accent: accents.schumacher,
    highlights: [
      'Leitung der gesamten internen IT der Unternehmensgruppe inklusive strategischer Weiterentwicklung der IT-Landschaft',
      'Administration von Microsoft 365, Entra ID und Active Directory inklusive Gruppenrichtlinien, Rollen- und Rechteverwaltung',
      'Betrieb der Hyper-V-Virtualisierung mit Windows- und Linux-Servern, Docker-Containerplattform und Backup-Konzepten',
      'Etablierung von IT-Security-Standards: MFA-Rollout, Patch-Management, Endpoint-Härtung und Active-Directory-Härtung auf Basis eines PingCastle-Audits',
      'Aufbau des Endpoint- und Mobile-Device-Managements über NinjaOne RMM für Windows- und macOS-Geräte',
      'Automatisierung wiederkehrender Prozesse mit Python, PowerShell und der Microsoft Graph API sowie Aufbau einer zentralen IT-Dokumentation',
      'Steuerung externer Dienstleister sowie Lizenz-, Vertrags- und Kostenmanagement',
    ],
    tech: [
      'Microsoft 365',
      'Entra ID',
      'Active Directory',
      'Hyper-V',
      'Docker',
      'NinjaOne',
      'PowerShell',
      'Python',
    ],
  },
  {
    id: 'roos-it',
    role: 'SAP-Entwickler',
    company: 'ROOS IT',
    companyFull: 'ROOS IT GmbH & Co. KG',
    companyUrl: 'https://roos-it.de/',
    period: 'März 2025 — Juni 2025',
    periodShort: 'Mrz — Jun 2025',
    location: 'Städteregion Aachen',
    workMode: 'Hybrid',
    employment: 'Vollzeit',
    accent: accents.roos,
    highlights: [
      'Umsetzung einer SAP SuccessFactors Customer Extension zur digitalen Unfallmeldung',
      'Entwicklung von SAP Fiori Apps',
    ],
    tech: ['SAP SuccessFactors', 'SAP Fiori', 'SAPUI5'],
    note: 'Betriebsbedingte Kündigung',
  },
  {
    id: 'johanniter',
    role: 'Systemadministrator',
    company: 'Johanniter',
    companyFull: 'Johanniter-Unfall-Hilfe e.V.',
    companyUrl: 'https://www.johanniter.de/juh/lv-nrw/rv-aachen-dueren-heinsberg/',
    period: 'Aug 2023 — Feb 2025',
    periodShort: 'Aug 2023 — Feb 2025',
    location: 'Städteregion Aachen',
    workMode: 'Vor Ort',
    employment: 'Vollzeit',
    accent: accents.johanniter,
    highlights: [
      'Entwicklung von Webanwendungen mit Python und dem Django-Framework',
      '2nd- und 3rd-Level-Support inklusive Fehleranalyse und -behebung',
      'Installation, Konfiguration und Wartung von IT-Systemen und PC-Arbeitsplätzen',
      'Integration und Verwaltung mobiler Endgeräte über Mobile Device Management',
      'Konfiguration und Administration der Netzwerkinfrastruktur inklusive Switches',
    ],
    tech: ['Python', 'Django', 'MDM', 'Switches', 'Windows'],
  },
  {
    id: 'selbststaendig',
    role: 'Software Engineer & Content Creator',
    company: 'Selbstständig',
    companyFull: 'Achim Sommer | Softwareentwicklung',
    period: 'Aug 2018 — Heute',
    periodShort: 'Seit 2018',
    location: 'Städteregion Aachen',
    employment: 'Selbstständig',
    current: true,
    accent: accents.gray,
    highlights: [
      'Entwicklung moderner Webanwendungen mit Next.js, React und TypeScript',
      'Skripte und Modifikationen für FiveM-Server (CFX) in Lua, JavaScript, HTML und CSS',
      'Full-Stack-Entwicklung mit Fokus auf nutzerzentrierte Frontend- und Backend-Architekturen',
      'Videoschnitt und Postproduktion multimedialer Inhalte mit Adobe Premiere Pro',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Lua', 'Node.js', 'Premiere Pro'],
  },
];

export const education: EducationStation = {
  id: 'fom',
  degree: 'B.Sc. Wirtschaftsinformatik',
  institution: 'FOM Köln',
  periodShort: '2023 — Heute',
  accent: accents.fom,
};
