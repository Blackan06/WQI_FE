import { Button, Layout, theme } from "antd";
import useDispatch from "../../hooks/use-dispatch";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { setCollapsed } from "../../slice/global";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import { LOGIN } from "../../routes/routes";
import { MenuItem } from "../../utils/global";

const { Header } = Layout;

const HeaderComponents: React.FC = () => {
  const dispatch = useDispatch();
  const { logoutFunc } = useAuth();
  const navigate = useNavigate();
  const { collapsed, sliderMenuItemSelectedKey } = useSelector(
    (state) => state.global
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logouFunction = () => {
    logoutFunc();
    navigate(LOGIN);
  };

  const itemMenuSelected = MenuItem.find(
    (item) => item.key === sliderMenuItemSelectedKey
  );
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="flex justify-between"
    >
      <div className="w-1/3">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(setCollapsed(!collapsed))}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <div className="flex w-1/3 justify-center">
        <span className="text-red-500 text-xl self-center font-bold">
          {itemMenuSelected?.label}
        </span>
      </div>
      <div className="w-1/3 flex justify-end pr-4 self-center">
        <Button
          onClick={() => {
            logouFunction();
          }}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default HeaderComponents;
