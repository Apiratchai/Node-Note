import BgForceGraph from './BgForceGraph';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="../src/public/nodenoteicon.ico" type="image/x-icon" />
      </Head>
      <BgForceGraph />
      {children}
    </>
  );
};

export default Layout;