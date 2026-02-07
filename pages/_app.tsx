import type { AppProps } from 'next/app';
import { generateDefaultSeo } from 'next-seo/pages';
import seoConfig from '../src/config/seo.config';
import dynamic from 'next/dynamic';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/gta.css';

// Dynamically import components that are not needed for initial render
const Layout = dynamic(() => import('../src/components/Layout'), {
  ssr: true
});

const JsonLd = dynamic(() => import('../src/components/JsonLd'), {
  ssr: true
});

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#0f0f0f',
        color: 'whiteAlpha.900',
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        {generateDefaultSeo(seoConfig)}
      </Head>
      <JsonLd />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
