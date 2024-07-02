import { useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ReviewsIcon from "@mui/icons-material/Reviews";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useState } from "react";
import DrawerHandler from "./DrawerHandler";
import { Box, Divider } from "@mui/material";
import LogoutButton from "./LogoutButton.tsx";

const drawerWidth = 210;

interface DrawerProps {
  theme: Theme;
  open: boolean;
  headerHeight: number;
}

const openedMixin = (theme: Theme, headerHeight: number): CSSObject => ({
  marginTop: headerHeight,
  width: drawerWidth,
  borderRight: `1px solid ${theme.palette.primary.main}`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme, headerHeight: number): CSSObject => ({
  // handle the style of the side bar whtn it's closed
  marginTop: headerHeight,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  borderRight: `1px solid ${theme.palette.primary.main}`,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`, //8px
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, headerHeight }: DrawerProps) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "&.MuiDrawer-root": { border: "none" },
    ...(open && {
      ...openedMixin(theme, headerHeight),
      "& .MuiDrawer-paper": openedMixin(theme, headerHeight),
    }),
    ...(!open && {
      ...closedMixin(theme, headerHeight),
      "& .MuiDrawer-paper": closedMixin(theme, headerHeight),
    }),
  })
);

interface SideBarProps {
  headerHeight: number;
}

export default function SideBar({ headerHeight }: SideBarProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const items = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Books", icon: <LibraryBooksIcon />, path: "/books" },
    { text: "Reviews", icon: <ReviewsIcon />, path: "/reviews" },
    { text: "Activity", icon: <EventNoteIcon />, path: "/activities" },
  ];

  return (
    <Drawer sx={{ display: "flex" }} variant="permanent" open={open} theme={theme} headerHeight={headerHeight}>
      <List>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  p: 0,
                  minHeight: 55,
                  justifyContent: open ? "initial" : "center",
                  px: 4.0,
                  backgroundColor: isActive ? theme.palette.primary.main : "inherit",
                  "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: isActive ? theme.palette.primary.contrastText : theme.palette.primary.main,
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                      color: theme.palette.primary.contrastText,
                    },
                  },
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                    color: isActive ? theme.palette.primary.contrastText : theme.palette.primary.main,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, color: theme.palette.primary.dark }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <DrawerHandler open={open} onClick={handleDrawerToggle} />
      <Box mt="10">
        <Divider />
        <LogoutButton open={open} />
      </Box>
    </Drawer>
  );
}
