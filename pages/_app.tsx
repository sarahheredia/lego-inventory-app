import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Card, CircularProgress, CssBaseline, Typography } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import Header from '../components/Header';
import { LegoSet } from '../types/LegoSet.d';
import { PhotoRow } from '../types/Photos.d';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const [legoSets, setLegoSets] = React.useState<Array<LegoSet>>([]);
  const [photos, setPhotos] = React.useState<Array<PhotoRow>>([]);

  React.useEffect(() => {
    Promise.all([
      fetch(`/api/lego`).then(r => r.json()),
      fetch(`/api/photos`).then(r => r.json()),
    ]).then(([ls, p]) => {
      // setLegoSets(ls);
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
        {!!legoSets.length ? (
          <Component {...componentProps} />
        ): (
          <Box display="flex" justifyContent="center" alignItems="center" style={{marginTop: '48px'}}>
            <Card
              sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
              style={{
                marginRight: 24,
                marginLeft: 24,
                border: 'rgb(32, 29, 72) solid 24px',
                textAlign: 'center',
                marginBottom: '24px',
                padding: 24,
              }}
            >
              <img
                style={{height: '100%', width: '100%', objectFit: 'contain'}}
                src="/emmett.png"
                alt="Lego Man - Emmet From The Lego Movie@pngkey.com"
              />
              <Typography style={{fontFamily: 'monospace', fontWeight: 700 }}>Everything will be awesome soon...</Typography>
              <CircularProgress color="warning" />
            </Card>
          </Box>
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}
