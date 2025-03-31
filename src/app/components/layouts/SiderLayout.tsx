import { Layout, theme } from "antd";
import React from "react";
import HeaderComponents from "../header/HeaderComponent";
import SliderComponent from "../slider/SliderComponent";

const { Footer, Content } = Layout;

interface IProps {
  children?: React.ReactNode;
}

const SiderLayout: React.FC<IProps> = (props) => {
  const { children } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <HeaderComponents />
      <Layout>
        <SliderComponent />
        <Content
          style={{ background: colorBgContainer, margin: "10px 10px 0px 10px" }}
        >
          <div>{children}</div>
        </Content>
      </Layout>
      <Footer className="flex justify-center">©Copyright Trongnt</Footer>
    </Layout>
  );
};

export default SiderLayout;
