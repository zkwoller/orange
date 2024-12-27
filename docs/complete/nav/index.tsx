import { Layout } from 'antd';

import BaseSider, { type Route } from './baseSider';

const routes: Route[] = [];
const LayoutSider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <BaseSider menuItems={routes} />
      <Layout.Content className="umax-content">{children}</Layout.Content>
    </Layout>
  );
};

export default LayoutSider;
