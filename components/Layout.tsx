import React from 'react';
import Head from 'next/head';
import { LegoSet } from '../types/LegoSet';
import Header from './Header';

type Props = {
  legoSets: Array<LegoSet>;
  children: JSX.Element,
}

export default function Layout({ children, legoSets }: Props) {
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
