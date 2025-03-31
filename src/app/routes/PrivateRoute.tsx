import { ElementType, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN } from "./routes";
import useAuth from "../hooks/use-auth";

interface IProps {
  layout: ElementType;
}

const PrivateRoute: React.FC<PropsWithChildren<IProps>> = (props) => {
  const { isAuthenticated } = useAuth(); //get all function in useAuth()
  const { pathname } = useLocation();
  const { children, layout: Layout } = props;
  const isAuth = isAuthenticated(); //use this function isAuthenticated()
  return isAuth ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate
      to={{
        pathname: LOGIN,
        search:
          pathname && pathname !== "/" ? `?redirect=${pathname}` : undefined,
      }}
    />
  );
};

export default PrivateRoute;
