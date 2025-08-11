import { Button, Layout, theme, Dropdown, Badge, List, Typography, Empty, Space } from "antd";
import useDispatch from "../../hooks/use-dispatch";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, BellOutlined, DeleteOutlined } from "@ant-design/icons";
import { setCollapsed } from "../../slice/global";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import { LOGIN } from "../../routes/routes";
import { MenuItem } from "../../utils/global";
import { markAsRead, clearAllNotifications, clearOldNotifications } from "../../slice/notification";
import notificationService from "../../services/notification";
import { Notification } from "../../models/notification";
import { useEffect, useState } from "react";

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponents: React.FC = () => {
  const dispatch = useDispatch();
  const { logoutFunc } = useAuth();
  const navigate = useNavigate();
  const { collapsed, sliderMenuItemSelectedKey } = useSelector(
    (state) => state.globalSlice
  );
  const { notifications, unreadCount } = useSelector(
    (state) => state.notificationSlice
  );
  const [, forceUpdate] = useState({});

  useEffect(() => {
    console.log('Current notifications:', notifications);
    console.log('Current unread count:', unreadCount);
  }, [notifications, unreadCount]);

  useEffect(() => {
    const handleNotification = () => {
      console.log('Notification received, forcing update');
      forceUpdate({});
    };

    notificationService.addEventListener(handleNotification);

    return () => {
      notificationService.removeEventListener(handleNotification);
    };
  }, []);

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

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: logouFunction,
    },
  ];

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      dispatch(markAsRead(notification.id));
      notificationService.markAsRead(notification.id);
    }
    // Có thể thêm logic để mở chi tiết notification hoặc thực hiện hành động khác
  };

  const handleBellClick = () => {
    notificationService.resetUnreadCount();
  };

  const handleClearAllNotifications = () => {
    dispatch(clearAllNotifications());
  };

  const handleClearOldNotifications = () => {
    dispatch(clearOldNotifications());
  };

  const notificationItems = {
    items: [
      {
        key: 'notifications',
        label: (
          <div style={{ width: 300, maxHeight: 400, overflow: 'auto' }}>
            {notifications.length > 0 ? (
              <>
                <div style={{ padding: '8px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography.Text strong>Notifications ({notifications.length})</Typography.Text>
                  <Space>
                    <Button 
                      size="small" 
                      icon={<DeleteOutlined />} 
                      onClick={handleClearOldNotifications}
                      title="Clear old notifications"
                    />
                    <Button 
                      size="small" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={handleClearAllNotifications}
                      title="Clear all notifications"
                    />
                  </Space>
                </div>
                <List<Notification>
                  dataSource={notifications}
                  renderItem={(item: Notification) => (
                    <List.Item
                      onClick={() => handleNotificationClick(item)}
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: item.isRead ? 'transparent' : '#f0f0f0',
                        padding: '8px',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      <List.Item.Meta
                        title={
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text strong>{item.title}</Text>
                            {!item.isRead && (
                              <div style={{ 
                                width: '8px', 
                                height: '8px', 
                                borderRadius: '50%', 
                                backgroundColor: '#1890ff' 
                              }} />
                            )}
                          </div>
                        }
                        description={
                          <div>
                            <Text>{item.message}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {new Date(item.timestamp).toLocaleString()}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </>
            ) : (
              <Empty 
                description="No notifications" 
                style={{ padding: '20px' }}
              />
            )}
          </div>
        ),
      },
    ],
  };

  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="flex justify-between items-center"
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
      <div className="w-1/3 flex justify-end pr-4 items-center space-x-4">
        <Dropdown menu={notificationItems} placement="bottomRight" trigger={['click']} onOpenChange={handleBellClick}>
          <Badge count={unreadCount} size="small">
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: '20px' }} />}
              className="flex items-center justify-center"
            />
          </Badge>
        </Dropdown>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Button
            type="text"
            icon={<UserOutlined style={{ fontSize: '20px' }} />}
            className="flex items-center justify-center"
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderComponents;
