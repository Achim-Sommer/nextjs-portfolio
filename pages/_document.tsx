import { Html, Head, Main, NextScript, type DocumentProps } from 'next/document';

export default function Document(props: DocumentProps) {
  // Englische Seiten liegen unter /en, alles andere ist deutsch
  const lang = props.__NEXT_DATA__.page.startsWith('/en') ? 'en' : 'de';

  return (
    <Html lang={lang} className="dark">
      <Head />
      <body className="bg-[#0f0f0f] text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
