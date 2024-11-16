'use client';
import { useState, useEffect, useRef } from 'react';
import { AnimatedText } from './ui/animated-text';
import { motion } from 'framer-motion';
import { SparklesCore } from './ui/sparkles-core';
import Image from 'next/image';
import { Octokit } from '@octokit/rest';

// TypeScript Interfaces
interface GitHubStats {
  contributions?: number;
  stars?: number;
  repos?: number;
  mainLanguages?: { [key: string]: number };
}

interface WakaTimeStats {
  totalHours?: number;
  languages?: { name: string; percent: number }[];
}

interface TerminalCommand {
  description: string;
  action: () => string;
}

export default function AboutMe() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Welcome to my portfolio terminal! Type "help" for available commands.']);
  const [githubStats, setGithubStats] = useState<GitHubStats>({});
  const [wakaStats, setWakaStats] = useState<WakaTimeStats>({});
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, TerminalCommand> = {
    help: {
      description: 'List all available commands',
      action: () => `Available commands:
  help - Show this help message
  about - Display personal information
  github - Show GitHub statistics
  wakatime - Display coding statistics
  skills - List technical skills
  clear - Clear terminal`
    },
    about: {
      description: 'Display personal information',
      action: () => `Name: Achim Sommer
Role: Dualer Wirtschaftsinformatik-Student & Full Stack Developer
Location: Aachen, Deutschland
Focus: TypeScript, React, FiveM Development`
    },
    github: {
      description: 'Show GitHub statistics',
      action: () => `GitHub Statistics:
Contributions: ${githubStats.contributions || 'Loading...'}
Stars: ${githubStats.stars || 'Loading...'}
Repositories: ${githubStats.repos || 'Loading...'}
Top Languages: ${Object.entries(githubStats.mainLanguages || {}).map(([lang, count]) => `${lang}: ${count}`).join(', ')}`
    },
    wakatime: {
      description: 'Display coding statistics',
      action: () => `WakaTime Statistics (Last 7 Days):
Total Coding Hours: ${wakaStats.totalHours?.toFixed(1) || 'Loading...'}
Top Languages: ${wakaStats.languages?.map(l => `${l.name}: ${l.percent.toFixed(1)}%`).join(', ') || 'Loading...'}`
    },
    skills: {
      description: 'List technical skills',
      action: () => `Technical Skills:
Frontend: React, Next.js, TypeScript, TailwindCSS
Backend: Node.js, Express, Django
Database: MongoDB, MySQL, PostgreSQL
Languages: Python, JavaScript, Lua`
    },
    clear: {
      description: 'Clear terminal output',
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
      setOutput(prev => [...prev, `> ${cmd}`, `Command not found: ${cmd}`]);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  useEffect(() => {
    // GitHub Stats Fetching
    const fetchGitHubStats = async () => {
      const octokit = new Octokit({
        auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
      });
      try {
        const { data: user } = await octokit.users.getByUsername({
          username: 'AchimSommer'
        });
        
        const { data: repos } = await octokit.repos.listForUser({
          username: 'AchimSommer'
        });
        
        const languages: { [key: string]: number } = {};
        for (const repo of repos) {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        }

        setGithubStats({
          repos: user.public_repos,
          stars: repos.reduce((acc, repo) => acc + repo.stargazers_count, 0),
          mainLanguages: languages
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    // WakaTime Stats Fetching
    const fetchWakaTimeStats = async () => {
      try {
        console.log('Fetching WakaTime stats...');
        const response = await fetch('/api/wakatime');
        
        if (!response.ok) {
          throw new Error(`WakaTime API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('WakaTime response:', data);
        
        if (data && data.data) {
          setWakaStats({
            totalHours: Number((data.data.total_seconds_including_other_language / 3600).toFixed(1)),
            languages: Array.isArray(data.data.languages) ? data.data.languages.map((lang: any) => ({
              name: lang.name,
              percent: Number(lang.percent.toFixed(1))
            })) : []
          });
        } else {
          throw new Error('Invalid WakaTime API response format');
        }
      } catch (error) {
        console.error('Error fetching WakaTime stats:', error);
        setWakaStats({
          totalHours: 0,
          languages: []
        });
      }
    };

    fetchGitHubStats();
    fetchWakaTimeStats();
    
    // Periodically refresh stats
    const interval = setInterval(() => {
      fetchWakaTimeStats();
    }, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <section id="about-me" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedText
              text="Developer Terminal"
              className="text-4xl font-bold mb-4"
              gradient
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-gray-900 rounded-lg p-4 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div 
                ref={terminalRef}
                className="font-mono text-sm h-[400px] overflow-auto bg-black/50 rounded p-4 mb-2"
              >
                {output.map((line, i) => (
                  <div key={i} className="whitespace-pre-wrap">
                    {line}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-green-400">portfolio$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0">
                <SparklesCore
                  id="aboutme-sparkles"
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={10}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <Image
                  src="/img/boy.png"
                  alt="Achim Sommer"
                  width={400}
                  height={400}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
