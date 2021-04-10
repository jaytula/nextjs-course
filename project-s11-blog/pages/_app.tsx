import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from 'next/head'
import Layout from '../components/layout/layout'

import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-with, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
