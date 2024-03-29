import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../store/loginContext";
import ROUTES from "../routes/ROUTES";

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useUser()
  if (isLoggedIn()) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

export default AuthGuard;
