'use client';
import { useState, useEffect, useRef } from 'react';
import { AnimatedText } from './ui/animated-text';
import { motion } from 'framer-motion';
import { SparklesCore } from './ui/sparkles-core';
import Image from 'next/image';
import { Octokit } from '@octokit/rest';
import * as VscIcons from 'react-icons/vsc';
import { FiCoffee } from 'react-icons/fi';
import * as SiIcons from 'react-icons/si';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  prism as prismStyle
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';

// Register languages
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('markdown', markdown);

// TypeScript Interfaces
interface GitHubStats {
  contributions?: number;
  stars?: number;
  repos?: number;
  mainLanguages?: { [key: string]: number };
  error?: string;
}

interface WakaTimeStats {
  totalHours?: number;
  languages?: { name: string; percent: number }[];
}

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
}

interface TerminalCommand {
  description: string;
  action: () => string;
}

interface Tab {
  id: string;
  title: string;
  icon?: JSX.Element;
  content: React.ReactNode;
}

interface SideBarItem {
  id: string;
  icon: JSX.Element;
  label: string;
}

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState<string>('about.tsx');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Willkommen in meinem Portfolio-Terminal! Tippe "help" für verfügbare Befehle.']);
  const [githubStats, setGithubStats] = useState<GitHubStats>({});
  const [wakaStats, setWakaStats] = useState<WakaTimeStats>({});
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    uptime: '0:00:00'
  });
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // GitHub Stats Fetching
  const fetchGitHubStats = async () => {
    try {
      const response = await fetch('/api/github');
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'Fehler beim Abrufen von GitHub-Statistiken');
      }

      setGithubStats(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler aufgetreten';
      setGithubStats({
        contributions: 0,
        stars: 0,
        repos: 0,
        mainLanguages: {},
        error: errorMessage
      });
    }
  };

  // Simulate system stats updates
  useEffect(() => {
    const updateSystemStats = () => {
      setSystemStats({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(50 + Math.random() * 40), // Mehr realistische Disk-Nutzung
        network: Math.floor(Math.random() * 1000),
        uptime: new Date().toLocaleTimeString()
      });
    };

    updateSystemStats();
    const interval = setInterval(updateSystemStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const commands: Record<string, TerminalCommand> = {
    help: {
      description: 'Liste aller verfügbaren Befehle',
      action: () => `Verfügbare Befehle:
  help - Zeige diese Hilfe-Nachricht
  about - Zeige persönliche Informationen
  github - Zeige GitHub-Statistiken
  wakatime - Zeige Codier-Statistiken
  system - Zeige System-Statistiken
  skills - Liste technische Fähigkeiten
  clear - Leere Terminal`
    },
    about: {
      description: 'Zeige persönliche Informationen',
      action: () => `Name: Achim Sommer
Rolle: Dualer Wirtschaftsinformatik-Student & Full Stack Entwickler
Standort: Aachen, Deutschland
Schwerpunkte: TypeScript, React, FiveM Development`
    },
    github: {
      description: 'Zeige GitHub-Statistiken',
      action: () => {
        // Trigger a fresh fetch when the command is run
        fetchGitHubStats();
        
        return `GitHub-Statistiken:
Beiträge: ${githubStats.contributions ?? 'Lade...'}
Sterne: ${githubStats.stars ?? 'Lade...'}
Repositories: ${githubStats.repos ?? 'Lade...'}
Haupt-Sprachen: ${Object.entries(githubStats.mainLanguages || {})
  .sort(([,a], [,b]) => (b as number) - (a as number))
  .map(([lang, count]) => `${lang}: ${count}`)
  .join(', ') || 'Keine gefunden'}`
      }
    },
    wakatime: {
      description: 'Zeige Codier-Statistiken',
      action: () => `WakaTime-Statistiken (Letzte 7 Tage):
Gesamt-Codier-Stunden: ${wakaStats.totalHours?.toFixed(1) || 'Lade...'}
Haupt-Sprachen: ${wakaStats.languages?.map(l => `${l.name}: ${l.percent.toFixed(1)}%`).join(', ') || 'Lade...'}`
    },
    system: {
      description: 'Zeige System-Statistiken',
      action: () => `System-Statistiken:
CPU-Auslastung: ${systemStats.cpu}%
Speicher-Auslastung: ${systemStats.memory}%
Festplatten-Auslastung: ${systemStats.disk}%
Netzwerk-Verkehr: ${systemStats.network} KB/s
System-Laufzeit: ${systemStats.uptime}`
    },
    skills: {
      description: 'Liste technische Fähigkeiten',
      action: () => `Technische Fähigkeiten:
Frontend: React, Next.js, TypeScript, TailwindCSS
Backend: Node.js, Express, Django
Datenbanken: MongoDB, MySQL, PostgreSQL
Sprachen: Python, JavaScript, Lua`
    },
    clear: {
      description: 'Leere Terminal-Ausgabe',
      action: () => {
        setOutput([]);
        return '';
      }
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd in commands) {
      const result = commands[trimmedCmd].action();
      setOutput(prev => [...prev, `> ${cmd}`, result]);
    } else {
      setOutput(prev => [...prev, `> ${cmd}`, `Befehl nicht gefunden: ${cmd}`]);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  useEffect(() => {
    // WakaTime Stats Fetching
    const fetchWakaTimeStats = async () => {
      try {
        const response = await fetch('/api/wakatime');
        
        if (!response.ok) {
          throw new Error(`WakaTime API-Anfrage fehlgeschlagen: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data && data.data) {
          setWakaStats({
            totalHours: Number((data.data.total_seconds_including_other_language / 3600).toFixed(1)),
            languages: Array.isArray(data.data.languages) ? data.data.languages.map((lang: any) => ({
              name: lang.name,
              percent: Number(lang.percent.toFixed(1))
            })) : []
          });
        } else {
          throw new Error('Ungültiges WakaTime API-Antwort-Format');
        }
      } catch (error) {
        setWakaStats({
          totalHours: 0,
          languages: []
        });
      }
    };

    fetchGitHubStats();
    fetchWakaTimeStats();
    
    // Periodisch aktualisiere Statistiken
    const interval = setInterval(() => {
      fetchWakaTimeStats();
    }, 60000); // Aktualisiere alle 60 Sekunden
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Definiere die Tabs mit Syntax-Highlighting und interaktiven Elementen
  const tabs: Tab[] = [
    {
      id: 'about.tsx',
      title: 'about.tsx',
      icon: <SiIcons.SiTypescript className="text-blue-400" />,
      content: (
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
      )
    },
    {
      id: 'skills.md',
      title: 'skills.md',
      icon: <SiIcons.SiMarkdown className="text-[#519aba]" />,
      content: (
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
      )
    },
    {
      id: 'projects.json',
      title: 'projects.json',
      icon: <SiIcons.SiJson className="text-yellow-500" />,
      content: (
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
              <SiIcons.SiGithub />
              <span>Auf GitHub ansehen</span>
            </a>
          </div>
        </div>
      )
    },
    {
      id: 'experience.tsx',
      title: 'experience.tsx',
      icon: <SiIcons.SiReact className="text-[#61dafb]" />,
      content: (
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
      )
    }
  ];

  // Definiere die Sidebar-Items mit VS Code Icons
  const sidebarItems: SideBarItem[] = [
    { id: 'explorer', icon: <VscIcons.VscFiles className="w-5 h-5" />, label: 'Explorer' },
    { id: 'search', icon: <VscIcons.VscSearch className="w-5 h-5" />, label: 'Suche' },
    { id: 'git', icon: <VscIcons.VscSourceControl className="w-5 h-5" />, label: 'Quellcode-Verwaltung' },
    { id: 'debug', icon: <VscIcons.VscDebugAlt className="w-5 h-5" />, label: 'Ausführen und Debuggen' },
    { id: 'extensions', icon: <VscIcons.VscExtensions className="w-5 h-5" />, label: 'Erweiterungen' }
  ];

  return (
    <section id="about-me" className="relative py-10 sm:py-16">
      <div className="mx-auto max-w-[90%] xl:max-w-[1400px] px-4">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedText
              text="Entwickler-Terminal"
              className="text-4xl font-bold mb-4"
              gradient
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="flex h-[800px]">
            {/* Activity Bar */}
            <div className="w-12 bg-[#333333] flex flex-col items-center py-2 space-y-4">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#2a2a2a] rounded"
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
            </div>

            {/* Sidebar */}
            {sidebarOpen && (
              <div className="w-64 bg-[#252526] border-r border-[#3c3c3c]">
                <div className="p-2">
                  <h2 className="text-sm uppercase text-gray-400 px-2 py-1">Explorer</h2>
                  <div className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`w-full text-left px-2 py-1 rounded flex items-center space-x-2 ${
                          activeTab === tab.id ? 'bg-[#37373d]' : 'hover:bg-[#2a2a2a]'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.icon}
                        <span>{tab.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Tabs */}
              <div className="h-9 bg-[#2d2d2d] flex items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-3 h-full flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-[#1e1e1e] border-t border-[#007acc]'
                        : 'hover:bg-[#2a2a2a]'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.title}</span>
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-auto bg-[#1e1e1e]">
                {tabs.find((tab) => tab.id === activeTab)?.content}
              </div>

              {/* Terminal */}
              <div className="h-1/3 border-t border-[#3c3c3c] bg-[#1e1e1e]">
                <div className="h-8 bg-[#2d2d2d] px-4 flex items-center">
                  <span className="text-sm">Terminal</span>
                </div>
                <div
                  ref={terminalRef}
                  className="h-[calc(100%-2rem)] overflow-auto p-2 font-mono text-sm"
                >
                  {output.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap">
                      {line}
                    </div>
                  ))}
                  <div className="flex items-center">
                    <span className="text-green-500">➜</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none border-none ml-2"
                      spellCheck={false}
                    />
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="h-6 bg-[#007acc] text-white flex items-center px-2 text-sm">
                <span className="mr-4">🌿 main</span>
                <span className="mr-4">📡 Verbunden</span>
                <span>CPU: {systemStats.cpu}% SPEICHER: {systemStats.memory}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
