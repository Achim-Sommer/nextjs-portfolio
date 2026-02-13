'use client';

import React, { useEffect, useState, useRef } from 'react';
import { AnimatedText } from './ui/animated-text';
import { Spotlight } from './ui/spotlight';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { IconBrandGithub, IconGitFork, IconStar } from '@tabler/icons-react';

// ─── Sprach-Farben (GitHub-Style) ────────────────────────────
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  Java: '#B07219',
  'C#': '#239120',
  'C++': '#F34B7D',
  Go: '#00ADD8',
  Rust: '#DEA584',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Lua: '#000080',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Dart: '#00B4AB',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Vue: '#41B883',
  SCSS: '#C6538C',
};

function getLangColor(lang: string | null): string {
  if (!lang) return '#6B7280';
  return LANG_COLORS[lang] || '#6B7280';
}

// ─── 3D-Tilt Repo Card ──────────────────────────────────────
function TiltRepoCard({ children, langColor }: { children: React.ReactNode; langColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 10, y: (px - 0.5) * 10 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative group rounded-xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm overflow-hidden hover:border-gray-700 hover:shadow-xl transition-[border-color,box-shadow] duration-300"
    >
      {/* Farbiger Top-Accent basierend auf Sprache */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${langColor}, transparent)` }}
      />
      {/* Dezenter Sprach-Glow */}
      <div
        className="absolute top-0 left-0 w-32 h-32 opacity-[0.04] blur-[40px] pointer-events-none"
        style={{ background: langColor }}
      />
      {children}
    </motion.div>
  );
}

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  private: boolean;
}

type GitHubApiResponse = {
  stats: {
    total: number;
    private: number;
    stars: number;
    repos: number;
    contributions: number;
    mainLanguages: Record<string, number>;
  };
  repos: Repository[];
};

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, private: 0 });

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github', {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data: GitHubApiResponse = await response.json();

        setStats({
          total: data.stats.total,
          private: data.stats.private,
        });

        const ownRepos = data.repos.filter((repo: Repository) => !repo.fork);
        const starredRepos = [...ownRepos]
          .sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3);
        
        const recentRepos = [...ownRepos]
          .sort((a: Repository, b: Repository) => 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .filter((repo: Repository) => 
            !starredRepos.find((r: Repository) => r.id === repo.id)
          )
          .slice(0, 3);
        
        setRepos([...starredRepos, ...recentRepos]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-dot-pattern dark:bg-dot-pattern-dark">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="rounded-2xl border border-gray-800/60 bg-gradient-to-br from-gray-900 via-gray-900/70 to-black p-10 shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800">
              <IconBrandGithub className="h-7 w-7 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">GitHub Projekte</h3>
            <p className="mt-2 text-sm text-gray-400">
              Meine Repositories sind gerade nicht verfügbar. Schau direkt auf meinem GitHub Profil vorbei!
            </p>
            <a
              href="https://github.com/Achim-Sommer"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-500/60 px-5 py-2.5 text-sm font-medium text-blue-100 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-500/10"
            >
              <IconBrandGithub className="h-4 w-4" />
              GitHub Profil besuchen
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <Spotlight className="py-20 bg-dot-pattern dark:bg-dot-pattern-dark">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText
            text="Meine GitHub Projekte"
            className="text-4xl font-bold mb-4"
            gradient
          />
          <div className="flex justify-center gap-6 mt-4 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z" clipRule="evenodd"/>
              </svg>
              <span className="text-gray-300">
                Gesamt: <span className="font-bold text-blue-400">{stats.total}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">
                Private: <span className="font-bold text-yellow-400">{stats.private}</span>
              </span>
            </div>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-[900px] bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
              <div className="min-w-max flex flex-col items-center">
                <GitHubCalendar
                  username="Achim-Sommer"
                  colorScheme="dark"
                  blockSize={10}
                  blockMargin={4}
                  fontSize={12}
                  year="last"
                  labels={{
                    totalCount: "{{count}} Beiträge im letzten Jahr",
                    months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                    weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                  }}
                  theme={{
                    dark: ['#1e2937', '#0e4429', '#006d32', '#26a641', '#39d353']
                  }}
                  style={{
                    color: '#9ca3af',
                  }}
                  showWeekdayLabels={true}
                  renderBlock={(block, activity) => React.cloneElement(block, {
                    'data-tooltip-id': 'github-calendar-tooltip',
                    'data-tooltip-content': `${activity.count} Beiträge am ${activity.date}`
                  })}
                />
                <Tooltip id="github-calendar-tooltip" />
              </div>
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: 800 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {repos.map((repo, i) => (
              <TiltRepoCard key={repo.id} langColor={getLangColor(repo.language)}>
                <div className="p-6">
                  {/* Header: Icon + Name + Private Badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center w-9 h-9 rounded-lg border"
                        style={{
                          backgroundColor: `${getLangColor(repo.language)}12`,
                          borderColor: `${getLangColor(repo.language)}25`,
                        }}
                      >
                        <IconBrandGithub className="w-4 h-4 text-gray-400" />
                      </div>
                      <Link
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-200 truncate max-w-[200px]"
                      >
                        {repo.name}
                      </Link>
                    </div>
                    {repo.private && (
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-medium">
                        Private
                      </span>
                    )}
                  </div>

                  {/* Beschreibung */}
                  <p className="text-sm text-gray-400 mb-5 line-clamp-2 text-left leading-relaxed">
                    {repo.description || 'Keine Beschreibung verfügbar'}
                  </p>

                  {/* Footer: Sprache + Stats + Link */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {repo.language && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
                          <span
                            className="w-2.5 h-2.5 rounded-full ring-2"
                            style={{
                              backgroundColor: getLangColor(repo.language),
                              boxShadow: `0 0 6px ${getLangColor(repo.language)}40`,
                              // @ts-ignore
                              '--tw-ring-color': `${getLangColor(repo.language)}30`,
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <IconStar className="w-3.5 h-3.5 text-yellow-500" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <IconGitFork className="w-3.5 h-3.5" />
                        {repo.forks_count}
                      </span>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-white transition-colors duration-200"
                    >
                      Ansehen
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </TiltRepoCard>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="https://github.com/Achim-Sommer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-[2px] rounded-lg overflow-hidden hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 transform"
            >
              <span className="relative inline-flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-lg group-hover:bg-opacity-80 transition-all duration-300">
                <IconBrandGithub className="w-5 h-5 text-white" />
                <span className="relative text-white font-medium">
                  Besuche mein GitHub Profil
                </span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </Spotlight>
  );
}
