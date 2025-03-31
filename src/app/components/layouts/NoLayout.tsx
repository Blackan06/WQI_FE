import { Layout, theme } from "antd";

const { Content } = Layout;
interface Props {
  children?: React.ReactNode;
}
const NoLayout: React.FC<Props> = (prop) => {
  const { children } = prop;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      <Layout>
        <Content style={{ background: colorBgContainer }}>
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NoLayout;
