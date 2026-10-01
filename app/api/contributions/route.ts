import { NextResponse } from 'next/server';

/**
 * Beitragskalender aus GitHub und GitLab, pro Tag zusammengezählt.
 * GitHub kommt über die öffentliche Kalender-API (dieselbe Quelle wie vorher
 * react-github-calendar), GitLab über die Kalenderdaten des Profils.
 * Fällt eine Quelle aus, liefert die Route die andere allein.
 */

const GITHUB_USER = 'Achim-Sommer';
const GITLAB_USER = 'AchimSommer';
const REVALIDATE_SECONDS = 60 * 60 * 6;

export const revalidate = 21600;

type Activity = { date: string; count: number; level: number };
type DayCounts = Map<string, number>;

async function fetchGitHub(): Promise<DayCounts | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data: { contributions?: { date: string; count: number }[] } = await res.json();
    if (!Array.isArray(data.contributions)) return null;
    return new Map(data.contributions.map((d) => [d.date, d.count]));
  } catch {
    return null;
  }
}

async function fetchGitLab(): Promise<DayCounts | null> {
  try {
    const res = await fetch(`https://gitlab.com/users/${GITLAB_USER}/calendar.json`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data: Record<string, number> = await res.json();
    return new Map(Object.entries(data).filter(([, count]) => typeof count === 'number'));
  } catch {
    return null;
  }
}

/** Letzte 365 Tage bis heute (UTC) als YYYY-MM-DD */
function lastYearDates(): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

/** Stufen 0 bis 4 nach Quartilen der aktiven Tage, ähnlich wie bei GitHub */
function toLevels(entries: { date: string; count: number }[]): Activity[] {
  const active = entries.map((e) => e.count).filter((c) => c > 0).sort((a, b) => a - b);
  const q = (p: number) => active[Math.min(active.length - 1, Math.floor(p * active.length))] ?? 0;
  const [q1, q2, q3] = [q(0.25), q(0.5), q(0.75)];
  return entries.map(({ date, count }) => ({
    date,
    count,
    level: count === 0 ? 0 : count <= q1 ? 1 : count <= q2 ? 2 : count <= q3 ? 3 : 4,
  }));
}

export async function GET() {
  const [github, gitlab] = await Promise.all([fetchGitHub(), fetchGitLab()]);

  if (!github && !gitlab) {
    return NextResponse.json({ error: 'Keine Quelle erreichbar' }, { status: 502 });
  }

  const dates = lastYearDates();
  const sum = (source: DayCounts | null) => dates.reduce((acc, date) => acc + (source?.get(date) ?? 0), 0);

  const contributions = toLevels(
    dates.map((date) => ({ date, count: (github?.get(date) ?? 0) + (gitlab?.get(date) ?? 0) }))
  );

  return NextResponse.json(
    {
      contributions,
      totals: { github: sum(github), gitlab: sum(gitlab) },
      sources: { github: Boolean(github), gitlab: Boolean(gitlab) },
    },
    { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } }
  );
}
