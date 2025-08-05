import { Spin } from "antd";
import { useEffect } from "react";
import useAuth from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { HOME, LOGIN } from "../../routes/routes";

const AuthPage: React.FC = () => {
  const { isAuthenticated, logoutFunc } = useAuth();
  let navigate = useNavigate(); // dùng cho routing page

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      if (isAuth) {
        navigate(HOME);
      } else {
        // Only logout and redirect once
        logoutFunc();
        navigate(LOGIN);
      }
    };

    // Check immediately
    checkAuth();
  }, [isAuthenticated, logoutFunc, navigate]);

  return (
    <div style={{ marginTop: "10%" }}>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default AuthPage;
