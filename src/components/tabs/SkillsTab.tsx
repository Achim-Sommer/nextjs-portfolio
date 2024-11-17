import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SkillsTab() {
  return (
    <div className="p-4 prose prose-invert">
      <SyntaxHighlighter
        language="markdown"
        style={vscDarkPlus}
        customStyle={{ background: 'transparent' }}
      >
        {`# Technische Fähigkeiten

## Frontend-Entwicklung
- React/Next.js
- TypeScript
- TailwindCSS
- HTML5/CSS3
- JavaScript

## Backend-Entwicklung
- Node.js
- Express
- Django

## Datenbanken
- MongoDB
- MySQL
- PostgreSQL

## Weitere Technologien
- Docker
- Git
- REST APIs
- Lua

## Betriebssysteme
- Windows
- MacOS
- Linux`}
      </SyntaxHighlighter>
    </div>
  );
}
