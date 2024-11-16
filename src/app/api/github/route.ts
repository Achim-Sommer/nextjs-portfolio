import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json({
        error: true,
        message: 'GitHub token not configured'
      }, { status: 500 });
    }

    try {
      const octokit = new Octokit({ auth: token });
      
      // Validate token
      await octokit.rest.rateLimit.get();

      const { data: user } = await octokit.rest.users.getByUsername({
        username: 'Achim-Sommer'
      });

      const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
        type: 'all',
        per_page: 100,
        sort: 'updated'
      });

      const stats = {
        contributions: (user.public_gists ?? 0) + (user.total_private_repos ?? 0) + (user.public_repos ?? 0),
        stars: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
        repos: (user.public_repos ?? 0) + (user.total_private_repos ?? 0),
        mainLanguages: repos.reduce((acc: { [key: string]: number }, repo) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        }, {})
      };

      return NextResponse.json(stats);

    } catch (apiError: any) {
      return NextResponse.json({
        error: true,
        message: apiError.message,
        details: apiError.response?.data
      }, { status: apiError.status || 500 });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: error.message
    }, { status: 500 });
  }
}
