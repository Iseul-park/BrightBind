import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
  //  styled 함수는 두 개의 인수를 받음. 첫 번째 인수는 스타일이 적용될 컴포넌트이고, 두 번째 인수는 스타일을 정의하는데 사용
  // shouldForwardProp: Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
  // We are specifying here how the styleOverrides are being applied based on props
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.primary.light,
  boxShadow: "none",
  borderBottom: "1px solid #ccc",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`, // 사이드바가 열린 상태에서 AppBar의 너비를 사이드바의 너비를 제외한 값으로 설정
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ drawerWidth, drawerOpen, onClick }: HeaderProps) {
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
            ...(drawerOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{}}>
          Bright Bind
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
