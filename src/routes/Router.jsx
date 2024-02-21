import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AboutUsPage from "./../pages/AboutUsPage";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import ProfilePage from "../pages/ProfilePage";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import AlreadyLoggedInGuard from "../guard/AlreadyLoggedInGuard";
const Router = () => {
  //http://localhost:3000/
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={
        <AlreadyLoggedInGuard>
          <LoginPage />
        </AlreadyLoggedInGuard>
      } />
      <Route path={ROUTES.REGISTER} element={
        <AlreadyLoggedInGuard>
          <RegisterPage />
        </AlreadyLoggedInGuard>
      } />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route
        path={`${ROUTES.EDITCARD}/:id`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />
      <Route
        path={`${ROUTES.CREATECARD}`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />

    </Routes>
  );
};
export default Router;
