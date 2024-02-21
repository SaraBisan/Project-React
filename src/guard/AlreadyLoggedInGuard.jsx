import { Navigate } from "react-router-dom";
import { useUser } from "../store/loginContext";
import ROUTES from "../routes/ROUTES";

const AlreadyLoggedInGuard = ({ children }) => {
  const { isLoggedIn } = useUser()

  if (!isLoggedIn()) {
    return children;
  } else {
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default AlreadyLoggedInGuard;
