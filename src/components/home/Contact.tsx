'use client';

import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { Eyebrow, Reveal, Section } from './primitives';

const EMAIL = 'dev@achimsommer.com';

export default function Contact() {
  return (
    <Section id="kontakt">
      <Reveal className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:pt-4">
          <Eyebrow index="06">Kontakt</Eyebrow>
        </div>
        <div className="lg:col-span-8">
          <h2 className="text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-fg">
            Lass uns sprechen.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Ob IT-Infrastruktur, ein Webprojekt oder einfach Erfahrungsaustausch: Schreib mir, ich
            melde mich zeitnah.
          </p>

          <a
            href={`mailto:${EMAIL}`}
            className="group mt-10 inline-flex items-center gap-3 border-b border-[#3a3a37] pb-2 text-2xl text-fg transition-colors duration-200 hover:border-accent sm:text-3xl"
          >
            {EMAIL}
            <FiArrowUpRight
              className="h-6 w-6 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              aria-hidden="true"
            />
          </a>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 bg-fg px-5 py-3 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
            >
              Zum Kontaktformular
              <FiArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="https://www.linkedin.com/in/achim-sommer-b898a2185/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-[#2e2e2c] px-5 py-3 text-sm text-fg transition-colors duration-200 hover:border-fg"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
