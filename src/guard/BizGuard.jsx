import { useUser } from "../store/loginContext";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const BizGuard = ({ children }) => {
  const { user } = useUser()
  if (user && (user.isBusiness || user.isAdmin)) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};

export default BizGuard;
