'use client';
import React, { useEffect, useState } from 'react';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedText } from './ui/animated-text';
import { Spotlight } from './ui/spotlight';
import { ShimmerButton } from './ui/shimmer-button';
import { MagneticButton } from './ui/magnetic-button';
import { motion } from 'framer-motion';
import GitHubCalendar from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  private: boolean;
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, private: 0 });

  const getContributionColor = (count: number): string => {
    if (count === 0) return 'bg-gray-800';
    if (count <= 3) return 'bg-green-900';
    if (count <= 6) return 'bg-green-700';
    if (count <= 9) return 'bg-green-500';
    return 'bg-green-300';
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Fetch all repositories including private ones
        const response = await fetch('https://api.github.com/user/repos', {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        
        // Calculate stats
        setStats({
          total: data.length,
          private: data.filter((repo: Repository) => repo.private).length
        });

        // Filter out forks if needed
        const ownRepos = data.filter((repo: Repository) => !repo.fork);
        
        // Get top starred repos (up to 3)
        const starredRepos = [...ownRepos]
          .sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3);
        
        // Get recently updated repos (up to 3), excluding those already in starredRepos
        const recentRepos = [...ownRepos]
          .sort((a: Repository, b: Repository) => 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .filter((repo: Repository) => 
            !starredRepos.find((r: Repository) => r.id === repo.id)
          )
          .slice(0, 3);
        
        // Combine and set repos
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
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <Spotlight className="py-20 bg-dot-pattern dark:bg-dot-pattern-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  hideColorLegend={false}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {repos.map((repo) => (
              <AnimatedCard key={repo.id} className="relative group hover:shadow-xl transition-all duration-300 border border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {repo.name}
                    </h3>
                    {repo.private && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-2 text-left">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {repo.language && (
                      <span className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-900 to-purple-900 text-blue-100 font-medium border border-blue-700/30">
                        {repo.language}
                      </span>
                    )}
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1 text-gray-300">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-300">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                        </svg>
                        <span className="font-medium">{repo.forks_count}</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 text-left">
                    Last updated: {new Date(repo.updated_at).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <MagneticButton>
                      <ShimmerButton className="transform transition-transform duration-300 hover:scale-105 hover:bg-gray-800" asChild>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2"
                        >
                          View Project
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </ShimmerButton>
                    </MagneticButton>
                  </div>
                </div>
              </AnimatedCard>
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
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z" clipRule="evenodd"/>
                </svg>
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
