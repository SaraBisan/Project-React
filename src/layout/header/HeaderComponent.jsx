import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import LoginOutlined from "@mui/icons-material/LoginRounded"
import RegisterOutlined from "@mui/icons-material/AppRegistrationRounded"

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Switch } from "@mui/material";
import Links, { LinksMobile } from "./ui/Links";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import { useState } from "react";
import FilterComponent from "./ui/FilterComponent";
import { useUser } from "../../store/loginContext";
import { useNavigate } from 'react-router-dom'
import ROUTES from "../../routes/ROUTES";
const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useUser()
  const navigate = useNavigate()

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? <>
        <MenuItem onClick={() => {
          navigate("/profile")
          handleMenuClose()
        }}>Profile</MenuItem>
        <MenuItem onClick={() => {
          handleMenuClose()
          logOut()
          navigate(ROUTES.LOGIN)
          toast.success("🦄 Logged out Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }}>Sign out</MenuItem>
      </> : <>
        <MenuItem onClick={() => {
          navigate(ROUTES.LOGIN)
          handleMenuClose()
        }}>Sign in</MenuItem>
        <MenuItem onClick={() => {
          navigate(ROUTES.REGISTER)
          handleMenuClose()
        }}>Sign up</MenuItem>
      </>}


    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <LinksMobile handleMobileMenuClose={handleMobileMenuClose} />
      {user ? <>
        <MenuItem onClick={() => {
          handleMobileMenuClose()
          logOut()
          navigate(ROUTES.LOGIN)
          toast.success("🦄 Logged out Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          })

        }}>
          <p>Sign out</p>
        </MenuItem>
      </> : <>
        <MenuItem onClick={() => {
          navigate(ROUTES.LOGIN)
          handleMobileMenuClose()
        }}>

          <p>Sign in</p>
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(ROUTES.REGISTER)
          handleMobileMenuClose()
        }}>
          <p>Sign up</p>
        </MenuItem>

      </>}


    </Menu>
  );


  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography
            onClick={() => navigate(ROUTES.HOME)}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Drift School
          </Typography>
          <Links />
          <FilterComponent />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? "Dark" : "Light"} Mode
            </Typography>
            <Switch checked={isDarkTheme} onChange={handleThemeChange} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              style={{ display: 'flex', flexDirection: 'row', columnGap: '.25rem' }}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user && <p style={{ fontSize: '14px' }}>{user.name.first + " " + user.name.last}</p>}
              {user ? <AccountCircle /> : <LoginOutlined />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/*<LeftDrawerComponent
        isOpen={isOpen}
        onCloseDrawer={handleCloseDrawerClick}
          />*/}
    </Box>
  );
};
export default HeaderComponent;
