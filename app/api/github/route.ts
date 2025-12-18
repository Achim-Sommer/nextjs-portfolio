import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import cache from '@/lib/cache';

const CACHE_KEY = 'github_stats_v1';
const USERNAME = 'Achim-Sommer';

type RepoSummary = {
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
};

export async function GET() {
  try {
    const cached = cache.get<any>(CACHE_KEY);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'Cache-Control': 'private, no-store',
        },
      });
    }

    const token = process.env.GITHUB_TOKEN;

    try {
      const octokit = token ? new Octokit({ auth: token }) : new Octokit();

      const { data: user } = await octokit.rest.users.getByUsername({
        username: USERNAME,
      });

      const reposResponse = token
        ? await octokit.rest.repos.listForAuthenticatedUser({
            type: 'all',
            per_page: 100,
            sort: 'updated',
          })
        : await octokit.rest.repos.listForUser({
            username: USERNAME,
            type: 'owner',
            per_page: 100,
            sort: 'updated',
          });

      const repos: RepoSummary[] = reposResponse.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language ?? null,
        stargazers_count: repo.stargazers_count ?? 0,
        forks_count: repo.forks_count ?? 0,
        fork: repo.fork ?? false,
        updated_at: repo.updated_at ?? new Date(0).toISOString(),
        private: repo.private ?? false,
      }));

      const stats = {
        total: repos.length,
        private: repos.filter((r) => r.private).length,
        stars: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
        repos: repos.length,
        mainLanguages: repos.reduce((acc: Record<string, number>, repo) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>),
        contributions:
          (user.public_gists ?? 0) +
          (token ? (user.total_private_repos ?? 0) : 0) +
          (user.public_repos ?? 0),
      };

      const payload = { stats, repos };
      cache.set(CACHE_KEY, payload);

      return NextResponse.json(payload, {
        headers: {
          'Cache-Control': 'private, no-store',
        },
      });

    } catch (apiError: any) {
      return NextResponse.json({
        error: true,
        message: apiError.message,
        details: apiError.response?.data
      }, {
        status: apiError.status || 500,
        headers: {
          'Cache-Control': 'private, no-store',
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: error.message
    }, {
      status: 500,
      headers: {
        'Cache-Control': 'private, no-store',
      },
    });
  }
}
