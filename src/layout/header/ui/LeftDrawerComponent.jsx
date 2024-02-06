import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Drawer,
  ListItemIcon,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";
const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const list = () => (
    <Box
      sx={{ width: { auto: 250 } }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <List>

        <ListItem disablePadding>
          <ListItemButton >
            <Link path={ROUTES.HOME} to={ROUTES.HOME}>Home</Link>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton >
            <Link path={ROUTES.LOGIN} to={ROUTES.LOGIN}>LOGIN</Link>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton >
            <Link path={ROUTES.REGISTER} to={ROUTES.REGISTER}>REGISTER</Link>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton >
            <Link path={ROUTES.ABOUT} to={ROUTES.ABOUT}>ABOUT US </Link>
            <ListItemText />
          </ListItemButton>
        </ListItem>

      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      {list()}
    </Drawer>
  );
};

export default LeftDrawerComponent;

