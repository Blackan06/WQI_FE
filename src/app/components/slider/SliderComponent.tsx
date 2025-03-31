import Sider from "antd/es/layout/Sider";
import useSelector from "../../hooks/use-selector";
import { Menu, theme } from "antd";
import useDispatch from "../../hooks/use-dispatch";
import { MenuItem } from "../../utils/global";
import { setSliderMenuItemSelectedKey } from "../../slice/global";
import { useNavigate } from "react-router-dom";

const SliderComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { collapsed, sliderMenuItemSelectedKey } = useSelector(
    (state) => state.global
  );
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ background: colorBgContainer, marginTop: 10 }}
    >
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[sliderMenuItemSelectedKey]}
        items={MenuItem}
        onClick={async (item) => {
          await dispatch(setSliderMenuItemSelectedKey(item.key));
          // router.push(`/${item.key}`);
          navigate(`/${item.key}`);
        }}
      />
    </Sider>
  );
};

export default SliderComponent;
