import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiderLayout from "../components/layouts/SiderLayout";
import AuthPage from "../pages/auth/AuthPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import PageNotFound from "../pages/notFound/PageNotFound";
import UserPage from "../pages/user/UserPage";
import PrivateRoute from "./PrivateRoute";
import { AUTH, DEFAUTL, HOME, LOGIN, USER } from "./routes";
import NoLayout from "../components/layouts/NoLayout";
import SliderFullLayout from "../components/layouts/SiderFullLayout";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={DEFAUTL} element={<AuthPage />} />
        <Route path={AUTH} element={<AuthPage />} />
        <Route
          path={HOME}
          element={
            <PrivateRoute layout={SliderFullLayout}>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path={USER}
          element={
            <PrivateRoute layout={NoLayout}>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
