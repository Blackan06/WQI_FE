import { Layout, theme } from "antd";
import SliderComponent from "../slider/SliderComponent";
import HeaderComponents from "../header/HeaderComponent";

const { Content, Footer } = Layout;
interface IProps {
  children?: React.ReactNode;
}

const SliderFullLayout: React.FC<IProps> = (props) => {
  const { children } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      <SliderComponent />
      <Layout>
        <HeaderComponents />
        <Content
          style={{ background: colorBgContainer, margin: "10px 10px 0px 10px" }}
        >
          <div>{children}</div>
        </Content>
        <Footer className="flex justify-center">©Copyright Trongnt</Footer>
      </Layout>
    </Layout>
  );
};

export default SliderFullLayout;
