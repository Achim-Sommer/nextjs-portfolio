'use client';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
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
  action: () => string | JSX.Element;
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

// Lazy load tab contents
const AboutTab = lazy(() => import('./tabs/AboutTab'));
const SkillsTab = lazy(() => import('./tabs/SkillsTab'));
const ProjectsTab = lazy(() => import('./tabs/ProjectsTab'));
const ExperienceTab = lazy(() => import('./tabs/ExperienceTab'));

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState<string>('about.tsx');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Willkommen in meinem Portfolio-Terminal! Tippe "help" für verfügbare Befehle.']);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
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
  clear - Leere Terminal
  matrix - Zeige Matrix-Animation
  neofetch - Zeige System-Information
  coffee - Kaffee-Zeit!`
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
    },
    matrix: {
      description: 'Zeige Matrix-Animation',
      action: () => {
        const matrixChars = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
        let output = '';
        for (let i = 0; i < 10; i++) {
          output += Array.from(
            { length: 40 }, 
            () => matrixChars[Math.floor(Math.random() * matrixChars.length)]
          ).join('') + '\n';
        }
        return <span className="text-green-400 font-matrix">{output}</span>;
      }
    },
    neofetch: {
      description: 'Zeige System-Information',
      action: () => {
        return (
          <div className="flex gap-2">
            <pre className="text-blue-400">
              {`       _,met$$$$$gg.
    ,g$$$$$$$$$$$$$$$P.
  ,g$$P"     """Y$$.".
 ,$$P'              \`$$$.
,'$$P       ,ggs.     \`$$b:
'd$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $$.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`.\`"Y$$$$P"'
 \`$$b      "-.__
  \`Y$$
   \`Y$$.
     \`$$b.
       \`Y$$b.
          \`"Y$b._
              \`""""\``}
            </pre>
            <div className="text-yellow-400">
              <p>OS: macOS</p>
              <p>Shell: Portfolio Terminal</p>
              <p>Theme: VS Code Dark+</p>
              <p>Languages: TypeScript, JavaScript, Lua</p>
            </div>
          </div>
        );
      }
    },
    coffee: {
      description: 'Kaffee-Zeit!',
      action: () => {
        return (
          <pre className="text-amber-600">
            {`
         )  (
        (   ) )
         ) ( (
       _______)_
    .-'---------|  
    ( C|/\\/\\/\\/\\/|
     '-./\\/\\/\\/\\/|
       '_________'
        '-------'
      `}
          </pre>
        );
      }
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    // Füge Befehl zur Historie hinzu
    setCommandHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);

    if (trimmedCmd in commands) {
      const result = commands[trimmedCmd].action();
      setOutput(prev => [...prev, `> ${cmd}`, result]);
    } else {
      setOutput(prev => [...prev, `> ${cmd}`, `Befehl nicht gefunden: ${cmd}`]);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const inputCommand = input.toLowerCase();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(inputCommand)
      );
      
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setOutput(prev => [...prev, '', ...matches]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex(prev => prev + 1);
        setInput(commandHistory[historyIndex + 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(prev => prev - 1);
        setInput(commandHistory[historyIndex - 1]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else 
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

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
        <Suspense fallback={<div className="p-4 text-gray-400">Lade about.tsx...</div>}>
          <AboutTab />
        </Suspense>
      )
    },
    {
      id: 'skills.md',
      title: 'skills.md',
      icon: <SiIcons.SiMarkdown className="text-[#519aba]" />,
      content: (
        <Suspense fallback={<div className="p-4 text-gray-400">Lade skills.md...</div>}>
          <SkillsTab />
        </Suspense>
      )
    },
    {
      id: 'projects.json',
      title: 'projects.json',
      icon: <SiIcons.SiJson className="text-yellow-500" />,
      content: (
        <Suspense fallback={<div className="p-4 text-gray-400">Lade projects.json...</div>}>
          <ProjectsTab />
        </Suspense>
      )
    },
    {
      id: 'experience.tsx',
      title: 'experience.tsx',
      icon: <SiIcons.SiReact className="text-[#61dafb]" />,
      content: (
        <Suspense fallback={<div className="p-4 text-gray-400">Lade experience.tsx...</div>}>
          <ExperienceTab />
        </Suspense>
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
    <div className="w-full h-full bg-[#1E1E1E] text-white rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
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
            {/* MacOS Titlebar */}
            <div className="h-7 bg-[#2D2D2D] flex items-center px-4 select-none border-b border-[#3c3c3c]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="flex-1 text-center text-sm text-gray-400">portfolio.app</div>
            </div>
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
    </div>
  );
}
