import Head from 'next/head';
import NotFoundContent from '@/components/notfound/NotFoundContent';

/** 404 für den Pages-Router (z. B. unbekannte Blog-Artikel). Header und Footer kommen aus dem Layout. */
export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Seite nicht gefunden | Achim Sommer</title>
        <meta name="robots" content="noindex" />
      </Head>
      <NotFoundContent />
    </>
  );
}
