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
import { LegoSet } from '../types/LegoSet.d';
import { PhotoRow } from '../types/Photos.d';

const clientSideEmotionCache = createEmotionCache();
const { publicRuntimeConfig } = getConfig();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const [legoSets, setLegoSets] = React.useState<Array<LegoSet>>([]);
  const [photos, setPhotos] = React.useState<Array<PhotoRow>>([]);
  console.log('props', props);

  React.useEffect(() => {
    Promise.all([
      fetch(`${publicRuntimeConfig.basePath}/api/lego`).then(r => r.json()),
      fetch(`${publicRuntimeConfig.basePath}/api/photos`).then(r => r.json()),
    ]).then(([ls, p]) => {
      setLegoSets(ls);
      setPhotos(p);
    });
  }, []);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const componentProps = { ...pageProps, legoSets, photos };
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {!!legoSets.length && (
          <Component {...componentProps} />
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}
