import React from 'react';
import Head from 'next/head';
import Header from './Header';

type Props = {
  children: JSX.Element,
}

export default function Layout({ children }: Props) {
  return (
    <div id="container">
      <Head>
        <title>Lego Inventory</title>
        <meta name="description" content="Lego inventory app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div id="wrapper">
        <div id="content">
          {children}
        </div>
      </div>
    </div>
  )
}
