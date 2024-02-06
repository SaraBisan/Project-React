import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import FavoriteIcon from '@mui/icons-material/Favorite';
import PortraitIcon from '@mui/icons-material/Portrait';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ROUTES from '../../routes/ROUTES';

const FooterComponent = () => {
  return (
    <Paper elevation={4} sx={{ position: "sticky", mt: 2 }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="About" icon={<ReportGmailerrorredIcon />} />
        <BottomNavigationAction label="Faverits" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="My Cards" icon={<PortraitIcon />} />
      </BottomNavigation>
    </Paper>
  );
};
export default FooterComponent;
