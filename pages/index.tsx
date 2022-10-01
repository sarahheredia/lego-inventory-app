import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import LeftNav from '../components/LeftNav'

const Home: NextPage = () => {
  return (
    <div id="container">
      <Head>
        <title>Lego Inventory</title>
        <meta name="description" content="Lego inventory app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div id="wrapper">
        <MainContent />

        <LeftNav />
      </div>
    </div>
  )
}

export default Home
