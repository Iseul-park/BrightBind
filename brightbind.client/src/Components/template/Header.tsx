import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  drawerWidth: number;
  drawerOpen: boolean;
  onClick: () => void;
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
}
const AppBar = styled(MuiAppBar, {
  // shouldForwardProp: Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
  // We are specifying here how the styleOverrides are being applied based on props
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "white",
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ drawerWidth, drawerOpen, onClick }: HeaderProps) {
  const theme = useTheme();
  const handleDrawerOpen = () => {
    onClick();
  };

  return (
    <AppBar position="fixed" drawerWidth={drawerWidth} open={drawerOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            color: theme.palette.primary.main,
            ...(drawerOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <img src="../../public/logo.png" alt="Logo" style={{ height: "43px", marginLeft: "5px" }} />
      </Toolbar>
    </AppBar>
  );
}
