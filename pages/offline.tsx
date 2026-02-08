import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';

export default function Offline() {
  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Offline - Achim Sommer',
          noindex: true,
        })}
      </Head>
      <div className="max-w-3xl mx-auto py-10">
        <div className="text-center py-10 px-6">
          <h1 className="inline-block text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
            Offline
          </h1>
          <p className="text-lg mb-6 text-gray-300">
            Es scheint, dass Sie offline sind. Bitte überprüfen Sie Ihre Internetverbindung.
          </p>
        </div>
      </div>
    </>
  );
}
