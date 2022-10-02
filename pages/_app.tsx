import * as React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import Header from '../components/Header';

const clientSideEmotionCache = createEmotionCache();
const { publicRuntimeConfig } = getConfig();

MyApp.getInitialProps = async () => {
  const response = await fetch(`${publicRuntimeConfig.basePath}/api/lego`);
  const legoSets = await response.json();
  return {
    pageProps: {
      legoSets,
    }
  };
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
