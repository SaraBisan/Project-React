import { Box } from "@mui/material";
import {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  bizLinks,
} from "../../myLinks";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from 'react-router-dom'
import NavLinkComponent from "../NavLinkComponent";
import { useContext } from "react";
import LoginContext, { useUser } from "../../../store/loginContext";

const Links = () => {
  const { user } = useUser();
  const loggedIn = user;
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: '16px', paddingInline: '8px' }}>
      {alwaysLinks.map((myItem, index) => (
        <NavLinkComponent to={myItem.to} key={"linksnav" + index}>
          {myItem.children}
        </NavLinkComponent>
      ))}
      {loggedIn &&
        loggedInLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav2" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {loggedIn &&
        loggedIn.isBusiness &&
        bizLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav2" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {!loggedIn &&
        loggedOutLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav3" + index}>
            {myItem.children}
          </NavLinkComponent>
        ))}
    </Box>
  );
};

export const LinksMobile = ({ handleMobileMenuClose }) => {
  const { user } = useUser();
  const nav = useNavigate()
  const loggedIn = user;
  return (
    <>
      {alwaysLinks.map((myItem, index) => (
        <MenuItem
          key={"linksnav22" + index}
          onClick={() => {
            handleMobileMenuClose()
            nav(myItem.to)
          }}>
          <p>{myItem.children}</p>
        </MenuItem>
      ))}
      {loggedIn &&
        loggedInLinks.map((myItem, index) => (
          <MenuItem
            key={"linksnav33" + index}
            onClick={() => {
              handleMobileMenuClose()
              nav(myItem.to)
            }}>
            <p>{myItem.children}</p>
          </MenuItem>
        ))}
      {loggedIn &&
        loggedIn.isBusiness &&
        bizLinks.map((myItem, index) => (
          <MenuItem
            key={"linksnav44" + index}
            onClick={() => {
              handleMobileMenuClose()
              nav(myItem.to)
            }}>
            <p>{myItem.children}</p>
          </MenuItem>
        ))}
      {!loggedIn &&
        loggedOutLinks.map((myItem, index) => (
          <MenuItem
            key={"linksnav44" + index}
            onClick={() => {
              handleMobileMenuClose()
              nav(myItem.to)
            }}>
            <p>{myItem.children}</p>
          </MenuItem>
        ))}
    </>
  );
};


export default Links;
