import ComparisonTable, { ComparisonItem } from '../ComparisonTable/ComparisonTable';

// Server Comparison Table
const serverComparisonData: ComparisonItem[] = [
  {
    criterion: "Kosten",
    lifetime: "Einmalige Zahlung",
    rental: "Monatliche Gebühren"
  },
  {
    criterion: "Langzeitkosten",
    lifetime: "Niedrig",
    rental: "Hoch"
  },
  {
    criterion: "Flexibilität",
    lifetime: "Upgrade möglich",
    rental: "Volle Flexibilität"
  },
  {
    criterion: "Root-Zugriff",
    lifetime: "Ja",
    rental: "Ja"
  },
  {
    criterion: "Support",
    lifetime: "Inklusive",
    rental: "Inklusive"
  },
  {
    criterion: "Mindestlaufzeit",
    lifetime: "Keine",
    rental: "Meist 7 Tage - 1 Monat"
  },
  {
    criterion: "Break-Even",
    lifetime: "Nach ~10 Monaten",
    rental: "-"
  }
];

export function ServerComparisonTable() {
  return <ComparisonTable items={serverComparisonData} />;
}

// Hier können weitere Tabellen-Komponenten für andere Blog-Artikel hinzugefügt werden
// Beispiel:
// export function HostingComparisonTable() {
//   const hostingData = [...];
//   return <ComparisonTable items={hostingData} />;
// }
