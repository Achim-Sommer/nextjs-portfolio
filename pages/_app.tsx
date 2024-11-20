import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import seoConfig from '../src/config/seo.config';
import JsonLd from '../src/components/JsonLd';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <JsonLd />
      <Component {...pageProps} />
    </>
  );
}
