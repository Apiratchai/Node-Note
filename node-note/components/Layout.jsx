import BgForceGraph from './BgForceGraph';

const Layout = ({ children }) => {
  return (
    <div>
      <BgForceGraph />
      {children}
    </div>
  );
};

export default Layout;