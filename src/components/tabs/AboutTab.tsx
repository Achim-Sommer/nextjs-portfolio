import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCoffee } from 'react-icons/fi';

export default function AboutTab() {
  return (
    <div className="p-4 prose prose-invert">
      <SyntaxHighlighter
        language="typescript"
        style={vscDarkPlus}
        customStyle={{ background: 'transparent' }}
      >
        {`// Persönliche Informationen
const entwickler = {
  name: "Achim Sommer",
  rolle: "Dualer Wirtschaftsinformatik-Student & Full Stack Entwickler",
  standort: "Aachen, Deutschland",
  schwerpunkte: ["TypeScript", "React", "FiveM Development"],
  
  kontakt: {
    email: "contact@achimsommer.com",
    github: "@Achim-Sommer",
  },

  interessen: [
    "Web Development",
    "System Architektur",
    "UI/UX Design",
    "Open Source"
  ],

  // Hover über die Kaffeetasse für tägliche Statistiken 
  kaffeeProTag: 3,
  
  // Klicke auf die Funktion um sie auszuführen
  aktuellesProjekt: () => {
    return "Entwicklung beeindruckender Web-Erfahrungen";
  }
};`}
      </SyntaxHighlighter>
      <div className="mt-4 flex items-center space-x-4">
        <button 
          className="px-3 py-1 bg-[#007acc] rounded-md hover:bg-[#1e8ed7] transition-colors"
          onClick={() => alert('Funktion aufgerufen: Entwicklung beeindruckender Web-Erfahrungen')}
        >
          Führe aktuellesProjekt() aus
        </button>
        <div className="relative group">
          <FiCoffee className="text-2xl text-yellow-500 cursor-help" />
          <div className="absolute hidden group-hover:block bg-[#252526] p-2 rounded shadow-lg z-10 w-48 bottom-full mb-2">
            Tägliche Kaffeestatistiken:
            <div className="w-full bg-[#1e1e1e] h-2 rounded mt-1">
              <div className="bg-yellow-500 h-full rounded" style={{ width: '75%' }}></div>
            </div>
            <span className="text-sm text-gray-400">3/4 Tassen heute</span>
          </div>
        </div>
      </div>
    </div>
  );
}
