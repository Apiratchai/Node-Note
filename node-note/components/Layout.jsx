import Head from 'next/head';
import BgForceGraph from './BgForceGraph';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="../components/nodenoteicon.ico" type="image/x-icon"/>
      </Head>
      <BgForceGraph />
      {children}
    </>
  );
};

export default Layout;