import { AppProps } from "next/dist/next-server/lib/router/router";
import Layout from '../components/layout/layout'

import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
