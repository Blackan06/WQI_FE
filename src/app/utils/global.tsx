import { ReactNode } from "react";
import { HomeOutlined, EnvironmentOutlined, MessageOutlined, DatabaseOutlined } from "@ant-design/icons";

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
    key: "station",
    icon: <EnvironmentOutlined />,
    label: "WQI Data",
  },
  {
    key: "monitoring-station",
    icon: <DatabaseOutlined />,
    label: "Monitoring Station",
  },
  {
    key: "kafka",
    icon: <MessageOutlined />,
    label: "Kafka",
  },
] as SliderMenuItem[];
