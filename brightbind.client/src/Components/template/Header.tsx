import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

interface HeaderProps extends MuiAppBarProps {
  headerHeight: number;
}
const AppBar = styled(MuiAppBar)<HeaderProps>(({ theme, headerHeight }) => ({
  zIndex: theme.zIndex.drawer + 1,
  //width: "100%",
  backgroundColor: "white",
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  height: `${headerHeight}px`,
}));

export default function Header({ headerHeight }: HeaderProps) {
  // const theme = useTheme();

  return (
    <AppBar position="fixed" headerHeight={headerHeight}>
      <Toolbar>
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{
            marginRight: 5,
            color: theme.palette.primary.main,
          }}
        >
          <img src="../../slogo.png" alt="Logo" style={{ height: "45px", marginLeft: "5px" }} />
        </IconButton> */}
        <img src="../../blogo3.JPG" alt="Logo" style={{ height: "43px", marginTop: "5px", marginLeft: "0px" }} />
      </Toolbar>
    </AppBar>
  );
}
