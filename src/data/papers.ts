/** Wissenschaftliche Arbeiten aus dem Studium, sortiert nach Note */
export interface Paper {
  grade: string;
  title: string;
}

export const papers: Paper[] = [
  { grade: '1,0', title: 'Generative KI zur Erstellung von Management-Summaries aus SAP S/4HANA' },
  {
    grade: '1,0',
    title:
      'OrbRush: Technische Dokumentation eines server-autoritativen Echtzeit-Multiplayer-Browserspiels mit TypeScript, Node.js, Socket.IO und Phaser 3',
  },
  { grade: '1,0', title: 'Joiner-Mover-Leaver-Prozess in hybrider AD/Entra-ID-Umgebung' },
  {
    grade: '1,3',
    title:
      'Pragmatische Adaption von ITIL 4 bei einem internen IT-Dienstleister einer mittelständischen Unternehmensgruppe. Konzept und Bewertung am Beispiel einer Logistikgruppe',
  },
  { grade: '1,3', title: 'No-Code/Low-Code Plattformen für Unternehmen' },
  { grade: '1,7', title: 'EU KI Act: Auswirkungen auf KMU' },
  { grade: '2,0', title: 'Java-Anwendung: Wertpapier-Depot-Rechner zur KPI-Berechnung' },
];
