import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ExperienceTab() {
  return (
    <div className="p-4 prose prose-invert">
      <SyntaxHighlighter
        language="typescript"
        style={vscDarkPlus}
        customStyle={{ background: 'transparent' }}
      >
        {`// Berufserfahrung
interface Erfahrung {
  position: string;
  unternehmen: string;
  zeitraum: string;
  technologien: string[];
  highlights: string[];
}

const erfahrungen: Erfahrung[] = [
  {
    position: "Selbstständiger Entwickler",
    unternehmen: "Freiberuflich",
    zeitraum: "2016 - Heute",
    technologien: ["Lua", "JavaScript", "React", "Node.js"],
    highlights: [
      "Erfolgreicher YouTube-Kanal mit Fokus auf Entwicklung",
      "Entwicklung von FiveM Scripts und Modifikationen",
      "Erstellung maßgeschneiderter Websites für Kunden",
      "Community Management und technischer Support"
    ]
  }
];

// Ausbildung
interface Ausbildung {
  abschluss: string;
  institution: string;
  zeitraum: string;
  schwerpunkte?: string[];
}

const ausbildung: Ausbildung[] = [
  {
    abschluss: "Bachelor of Science - Wirtschaftsinformatik",
    institution: "FOM Hochschule Köln",
    zeitraum: "2023 - Heute"
  },
  {
    abschluss: "Allgemeine Hochschulreife",
    institution: "Wirtschaftsgymnasium",
    zeitraum: "2019 - 2023",
    schwerpunkte: [
      "Leistungskurs Betriebswirtschaftslehre",
      "Leistungskurs Mathematik",
      "Abiturfach Deutsch",
      "Abiturfach Wirtschaftsinformatik"
    ]
  }
];`}
      </SyntaxHighlighter>
    </div>
  );
}
