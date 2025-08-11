import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiderLayout from "../components/layouts/SiderLayout";
import AuthPage from "../pages/auth/AuthPage";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import PageNotFound from "../pages/notFound/PageNotFound";
import UserPage from "../pages/user/UserPage";
import StationPage from "../pages/station/StationPage";
import MonitoringStationPage from "../pages/monitoring-station/MonitoringStationPage";
import KafkaPage from "../pages/kafka/KafkaPage";
import PrivacyPolicyPage from "../pages/privacy-policy/PrivacyPolicyPage";
import TermsOfServicePage from "../pages/terms-of-service/TermsOfServicePage";
import AboutPage from "../pages/about/AboutPage";
import PrivateRoute from "./PrivateRoute";
import { AUTH, DEFAUTL, HOME, LOGIN, USER, STATION, MONITORING_STATION, KAFKA, PRIVACY_POLICY, TERMS_OF_SERVICE, ABOUT } from "./routes";
import NoLayout from "../components/layouts/NoLayout";
import SliderFullLayout from "../components/layouts/SiderFullLayout";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={DEFAUTL} element={<AuthPage />} />
        <Route path={AUTH} element={<AuthPage />} />
        <Route path={PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
        <Route path={TERMS_OF_SERVICE} element={<TermsOfServicePage />} />
        <Route path={ABOUT} element={<AboutPage />} />
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
        <Route
          path={STATION}
          element={
            <PrivateRoute layout={SliderFullLayout}>
              <StationPage />
            </PrivateRoute>
          }
        />
        <Route
          path={MONITORING_STATION}
          element={
            <PrivateRoute layout={SliderFullLayout}>
              <MonitoringStationPage />
            </PrivateRoute>
          }
        />
        <Route
          path={KAFKA}
          element={
            <PrivateRoute layout={SliderFullLayout}>
              <KafkaPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
