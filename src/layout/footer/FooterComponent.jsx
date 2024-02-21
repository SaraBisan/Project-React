import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import FavoriteIcon from '@mui/icons-material/Favorite';
import PortraitIcon from '@mui/icons-material/Portrait';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ROUTES from '../../routes/ROUTES';

const FooterComponent = ({
  onTabSelect = () => { }, selectedTab = "About"
}) => {
  return (
    <Paper elevation={4} sx={{ position: "sticky", mt: 2 }}>
      <BottomNavigation showLabels value={selectedTab}>
        <BottomNavigationAction
          onClick={() => {
            onTabSelect("About")
          }}
          value={"About"} label="About" icon={<ReportGmailerrorredIcon />} />
        <BottomNavigationAction
          onClick={() => {
            onTabSelect("Favorites")
          }}
          value={"Favorites"} label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction
          onClick={() => {
            onTabSelect("My-Cards")
          }}
          value={"My-Cards"} label="My Cards" icon={<PortraitIcon />} />
      </BottomNavigation>
    </Paper>
  );
};
export default FooterComponent;
