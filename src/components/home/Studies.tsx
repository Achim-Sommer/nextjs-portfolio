'use client';

import { papers } from '@/data/papers';
import { Section, SectionHeading } from './primitives';

export default function Studies() {
  return (
    <Section id="studium">
      <SectionHeading index="03" label="Studium" title="Theorie, die im Betrieb standhält.">
        <p>
          B.Sc. Wirtschaftsinformatik an der FOM Hochschule in Köln, berufsbegleitend seit 2023. Die
          Bachelorarbeit läuft gerade. Eine Auswahl meiner Arbeiten:
        </p>
      </SectionHeading>

      <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-10">
        <table className="w-full border-collapse text-left lg:col-span-8 lg:col-start-5">
          <thead>
            <tr className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              <th scope="col" className="w-20 pb-4 font-normal">
                Note
              </th>
              <th scope="col" className="pb-4 font-normal">
                Thema
              </th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.title} className="border-t border-line align-baseline last:border-b">
                <td className="py-5 font-mono text-lg text-fg">{paper.grade}</td>
                <td className="py-5 text-[15px] leading-relaxed text-muted sm:text-base">{paper.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
