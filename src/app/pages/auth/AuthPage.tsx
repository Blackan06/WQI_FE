import { Spin } from "antd";
import { useEffect } from "react";
import useAuth from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { HOME, LOGIN } from "../../routes/routes";

const AuthPage: React.FC = () => {
  const { isAuthenticated, logoutFunc } = useAuth();
  const isAuth = isAuthenticated();
  let navigate = useNavigate(); // dùng cho routing page

  useEffect(() => {
    if (isAuth) {
      navigate(HOME);
    } else {
      logoutFunc();
      navigate(LOGIN);
    }
  }, [isAuth, logoutFunc]);

  return (
    <div style={{ marginTop: "10%" }}>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default AuthPage;
