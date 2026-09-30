import Link from 'next/link';

const socialLinks = [
  { href: 'https://www.linkedin.com/in/achim-sommer-b898a2185/', label: 'LinkedIn' },
  { href: 'https://github.com/Achim-Sommer', label: 'GitHub' },
  { href: 'https://www.youtube.com/@achimsommer', label: 'YouTube' },
  { href: 'https://twitch.tv/achim1337', label: 'Twitch' },
  { href: 'https://www.instagram.com/achim.sommer/', label: 'Instagram' },
];

const pageLinks = [
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/blog', label: 'Blog' },
  { href: '/services', label: 'Services' },
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas text-muted">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-[15px] font-medium text-fg">
              <span className="h-2 w-2 bg-accent" aria-hidden="true" />
              Achim Sommer
            </Link>
            <p className="mt-3 text-sm">Head of IT bei amber Tech GmbH · Aachen</p>
            <a
              href="mailto:dev@achimsommer.com"
              className="mt-1 inline-block text-sm transition-colors duration-200 hover:text-fg"
            >
              dev@achimsommer.com
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-2 font-mono text-xs uppercase tracking-[0.12em]">
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors duration-200 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-line pt-6 font-mono text-[11px] text-faint">
          © {currentYear} Achim Sommer
        </p>
      </div>
    </footer>
  );
}
