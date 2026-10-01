'use client';

import React, { useEffect, useState } from 'react';
import { ActivityCalendar, type Activity } from 'react-activity-calendar';
import { Tooltip } from 'react-tooltip';

type ContributionsResponse = {
  contributions: Activity[];
  totals: { github: number; gitlab: number };
  sources: { github: boolean; gitlab: boolean };
};

/** Beitragskalender in Abstufungen der Akzentfarbe */
const CALENDAR_THEME = { dark: ['#161615', '#3d1f12', '#6b3014', '#b04a1c', '#ff6a2b'] };

const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

const formatDay = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' });

/**
 * Aktivität aus GitHub und GitLab in einem Kalender, Tag für Tag addiert.
 * Daten kommen von /api/contributions.
 */
export default function ContributionCalendar() {
  const [data, setData] = useState<ContributionsResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/contributions')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((json: ContributionsResponse) => active && setData(json))
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, []);

  if (failed) {
    return <p className="text-sm text-muted">Der Aktivitätskalender lässt sich gerade nicht laden.</p>;
  }

  return (
    <div>
      <ActivityCalendar
        data={data?.contributions ?? []}
        loading={!data}
        colorScheme="dark"
        blockSize={10}
        blockMargin={3}
        blockRadius={0}
        fontSize={11}
        theme={CALENDAR_THEME}
        labels={{
          totalCount: '{{count}} Beiträge im letzten Jahr',
          months: MONTHS,
          weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
          legend: { less: 'Weniger', more: 'Mehr' },
        }}
        style={{ color: '#8e8d89' }}
        renderBlock={(block, activity) =>
          React.cloneElement(block, {
            'data-tooltip-id': 'contribution-tooltip',
            'data-tooltip-content': `${activity.count} ${activity.count === 1 ? 'Beitrag' : 'Beiträge'} am ${formatDay(activity.date)}`,
          })
        }
      />
      <Tooltip id="contribution-tooltip" />
      {data && (
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <span>
            GitHub <span className="text-fg">{data.sources.github ? data.totals.github : 'nicht erreichbar'}</span>
          </span>
          <span>
            GitLab <span className="text-fg">{data.sources.gitlab ? data.totals.gitlab : 'nicht erreichbar'}</span>
          </span>
        </p>
      )}
    </div>
  );
}
