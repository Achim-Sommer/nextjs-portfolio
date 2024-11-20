import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import seoConfig from '../src/config/seo.config';
import JsonLd from '../src/components/JsonLd';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from '../src/components/Layout';
import Head from 'next/head';
import '../styles/globals.css';

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
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultSeo {...seoConfig} />
      <JsonLd />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
