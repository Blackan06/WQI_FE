import { ReactNode } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

export interface SliderMenuItem {
  key: string;
  icon: ReactNode;
  label: string;
}

export const MenuItem = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "user",
    icon: <UserOutlined />,
    label: "User",
  },
] as SliderMenuItem[];
