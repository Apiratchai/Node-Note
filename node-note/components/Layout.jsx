import { redirect } from 'next/dist/server/api-utils';
import BgForceGraph from './BgForceGraph';

const Layout = ({ children }) => {
  return (
    <>
      <BgForceGraph />
      {children}
    </>
  );
};

export default Layout;