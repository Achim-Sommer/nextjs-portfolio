import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SiGithub } from 'react-icons/si';

export default function ProjectsTab() {
  return (
    <div className="p-4 prose prose-invert">
      <SyntaxHighlighter
        language="json"
        style={vscDarkPlus}
        customStyle={{ background: 'transparent' }}
      >
        {`{
  "projects": [
    {
      "name": "Portfolio Website",
      "description": "Persönliche Portfolio-Website mit Next.js und TailwindCSS",
      "technologies": ["Next.js", "TypeScript", "TailwindCSS"],
      "status": "aktiv",
      "github": "https://github.com/Achim-Sommer/nextjs-portfolio"
    },
    {
      "name": "FiveM Development",
      "description": "Benutzerdefinierte Spiel-Modifikationen und Server-Entwicklung",
      "technologies": ["Lua", "JavaScript", "MySQL"],
      "status": "aktiv"
    }
  ]
}`}
      </SyntaxHighlighter>
      <div className="mt-4 flex items-center space-x-4">
        <a
          href="https://github.com/Achim-Sommer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-3 py-1 bg-[#238636] rounded-md hover:bg-[#2ea043] transition-colors"
        >
          <SiGithub />
          <span>Auf GitHub ansehen</span>
        </a>
      </div>
    </div>
  );
}
