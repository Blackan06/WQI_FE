import { Button, Form, Input, message } from "antd";
import "./loginStyle.css";
import authService from "../../services/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH, LOGIN } from "../../routes/routes";
import useAuth from "../../hooks/use-auth";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { logoutFunc, login, loginLoading } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onFinish = async (values: any) => {
    try {
      await login(values.username, values.password);
      setIsLoggedIn(true); // Trigger re-render
    } catch (error) {
      // Error is already handled in useAuth hook
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Login Fail!!");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(AUTH); //routing to authPage to check token validation
      message.success("Login successfully!");
    }
  }, [isLoggedIn, navigate]);

  // Only show welcome message when component first mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Only show message if user is not already logged in
      message.info("Vui lòng đăng nhập để tiếp tục");
    }
  }, []);
  return (
    <div className="container-login-form">
      <h1>WELCOME</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loginLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
