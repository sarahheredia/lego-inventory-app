import '../styles/globals.css';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import Layout from '../components/Layout';
import { LegoSet } from '../types/LegoSet';

const { publicRuntimeConfig } = getConfig();

MyApp.getInitialProps = async () => {
  const response = await fetch(`${publicRuntimeConfig.host}/api/lego`);
  const legoSets = await response.json();
  return {
    pageProps: {
      legoSets,
    }
  }
};

function MyApp({ Component, pageProps }: AppProps & { pageProps: { legoSets: Array<LegoSet> } }) {
  return (
    <Layout legoSets={pageProps.legoSets}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
