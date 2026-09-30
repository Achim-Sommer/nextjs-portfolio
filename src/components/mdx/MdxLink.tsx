import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

/** Hosts von Partnerprogrammen: Links dorthin sind Werbung und werden für Google gekennzeichnet */
const AFFILIATE_HOSTS = ['zap-hosting.com'];

/**
 * Links im Artikeltext: interne Links laufen über next/link, externe öffnen
 * in neuem Tab, Affiliate-Links bekommen rel="sponsored".
 */
export default function MdxLink({ href = '', children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  if (href.startsWith('#') || href.startsWith('mailto:')) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  let host = '';
  try {
    host = new URL(href).hostname.replace(/^www\./, '');
  } catch {
    // relative oder ungültige URL: wie ein normaler Link behandeln
  }
  const affiliate = AFFILIATE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));

  return (
    <a href={href} target="_blank" rel={affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'} {...rest}>
      {children}
    </a>
  );
}
