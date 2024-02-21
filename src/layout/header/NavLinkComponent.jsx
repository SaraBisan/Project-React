import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ to, children }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "text.headerActive" : "text.headerColor"}
          variant="p"
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};
{

}
export default NavLinkComponent;
