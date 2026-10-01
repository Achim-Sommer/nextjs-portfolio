'use client';

import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiStar } from 'react-icons/fi';
import { Reveal, Section, SectionHeading } from './home/primitives';
import ContributionCalendar from './home/ContributionCalendar';

const PROFILE_URL = 'https://github.com/Achim-Sommer';
const GITLAB_URL = 'https://gitlab.com/AchimSommer';

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
  };
  repos: Repository[];
};

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [stats, setStats] = useState<GitHubApiResponse['stats'] | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  // Kalender hängt vom heutigen Datum ab und wird daher erst im Browser gezeichnet
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const load = async () => {
      try {
        const response = await fetch('/api/github', {
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error('GitHub nicht erreichbar');
        const data: GitHubApiResponse = await response.json();

        // Die drei beliebtesten eigenen Repos plus die drei zuletzt aktualisierten
        const own = data.repos.filter((repo) => !repo.fork);
        const starred = [...own].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
        const recent = [...own]
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .filter((repo) => !starred.some((s) => s.id === repo.id))
          .slice(0, 3);

        setStats(data.stats);
        setRepos([...starred, ...recent]);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };
    load();
  }, []);

  return (
    <Section id="github-section">
      <SectionHeading index="04" label="Projekte" title="Was nach Feierabend entsteht.">
        <p>Web-Apps, Werkzeuge für Server und Skripte für FiveM. Öffentliches auf GitHub, Privates auf GitLab.</p>
      </SectionHeading>

      <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="mb-8 lg:col-span-4 lg:mb-0">
          {stats && (
            <dl className="flex gap-10 lg:block lg:space-y-8">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Repositories</dt>
                <dd className="mt-1 text-4xl font-medium tracking-[-0.03em] text-fg">{stats.total}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Stars</dt>
                <dd className="mt-1 text-4xl font-medium tracking-[-0.03em] text-fg">{stats.stars}</dd>
              </div>
            </dl>
          )}
        </div>

        <div className="lg:col-span-8">
          {status === 'loading' && (
            <ul aria-hidden="true">
              {Array.from({ length: 4 }, (_, i) => (
                <li key={i} className="border-t border-line py-7 last:border-b">
                  <div className="h-4 w-40 animate-pulse bg-[#171716]" />
                  <div className="mt-3 h-3 w-3/4 animate-pulse bg-[#131312]" />
                </li>
              ))}
            </ul>
          )}

          {status === 'error' && (
            <p className="border-y border-line py-7 text-[15px] text-muted">
              Die Repositories lassen sich gerade nicht laden.{' '}
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-[#3a3a37] underline-offset-4 hover:decoration-accent"
              >
                Direkt zu GitHub
              </a>
            </p>
          )}

          {status === 'ready' && (
            <ul>
              {repos.map((repo, i) => (
                <li key={repo.id} className="border-t border-line last:border-b">
                  <Reveal delay={i * 0.04}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:gap-8"
                    >
                      <span className="min-w-0">
                        <span className="flex items-center gap-3">
                          <span className="truncate font-mono text-[15px] text-fg transition-colors duration-200 group-hover:text-accent">
                            {repo.name}
                          </span>
                          {repo.private && (
                            <span className="border border-[#2e2e2c] px-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                              Privat
                            </span>
                          )}
                        </span>
                        <span className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
                          {repo.description || 'Ohne Beschreibung'}
                        </span>
                      </span>
                      <span className="flex items-center gap-5 font-mono text-xs text-faint sm:items-start sm:pt-1">
                        {repo.language && <span>{repo.language}</span>}
                        <span className="inline-flex items-center gap-1">
                          <FiStar className="h-3 w-3" aria-hidden="true" />
                          {repo.stargazers_count}
                        </span>
                        <FiArrowUpRight
                          className="h-4 w-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}

          <Reveal className="mt-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              Aktivität im letzten Jahr · GitHub und GitLab
            </p>
            <div className="mt-5 min-h-[150px] overflow-x-auto pb-2 text-muted">
              {mounted && <ContributionCalendar />}
            </div>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-[#2e2e2c] px-5 py-3 text-sm text-fg transition-colors duration-200 hover:border-fg"
            >
              GitHub-Profil
              <FiArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={GITLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-[#2e2e2c] px-5 py-3 text-sm text-fg transition-colors duration-200 hover:border-fg"
            >
              GitLab-Profil
              <FiArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
