import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import seoConfig from '../src/config/seo.config';
import dynamic from 'next/dynamic';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import '../styles/globals.css';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Dynamically import components that are not needed for initial render
const Layout = dynamic(() => import('../src/components/Layout'), {
  ssr: true
});

const JsonLd = dynamic(() => import('../src/components/JsonLd'), {
  ssr: true
});

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof (window as any).umami !== 'undefined') {
        (window as any).umami.trackView(url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        async
        src={process.env.NEXT_PUBLIC_UMAMI_URL}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        data-auto-track="true"
        data-domains="achimsommer.com"
        strategy="afterInteractive"
      />
      <DefaultSeo {...seoConfig} />
      <JsonLd />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
