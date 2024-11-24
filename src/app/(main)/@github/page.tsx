import { unstable_cache } from 'next/cache';
import { Octokit } from '@octokit/rest';
import dynamic from 'next/dynamic';

// Dynamischer Import der GitHub-Komponenten
const GitHubRepos = dynamic(() => import('@/components/GitHubRepos'), {
  ssr: true
});

// Optimierte GitHub Daten-Fetching Funktion mit verbessertem Caching
const getGitHubData = unstable_cache(
  async () => {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const { data: repos } = await octokit.repos.listForUser({
      username: 'AchimSee',
      sort: 'updated',
      per_page: 6,
    });

    // Daten-Transformation mit Null-Checks
    return repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description ?? null,
      html_url: repo.html_url,
      language: repo.language ?? null,
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      fork: repo.fork,
      updated_at: repo.updated_at || new Date().toISOString(),
      private: repo.private,
    }));
  },
  ['github-data'],
  {
    revalidate: 3600, // 1 Stunde Cache
    tags: ['github'],
  }
);

// Performance Konfiguration
export const fetchCache = 'force-cache';
export const revalidate = 3600;
export const runtime = 'edge';
export const preferredRegion = 'fra1';

// Verbesserte Fehlerbehandlung
export default async function GitHubFeed() {
  try {
    const repos = await getGitHubData();

    return (
      <section className="py-20">
        <GitHubRepos initialRepos={repos} />
      </section>
    );
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return (
      <section className="py-20">
        <div className="text-center text-gray-500">
          GitHub Repositories temporär nicht verfügbar
        </div>
      </section>
    );
  }
}
