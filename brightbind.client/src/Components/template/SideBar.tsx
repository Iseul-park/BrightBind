import { useNavigate } from "react-router-dom";
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

const drawerWidth = 210;
const headerHeight = 60;

const openedMixin = (theme: Theme): CSSObject => ({
  marginTop: headerHeight,
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  borderRight: `1px solid ${theme.palette.primary.main}`,
});

const closedMixin = (theme: Theme): CSSObject => ({
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
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    borderRight: `1px solid ${theme.palette.primary.main}`,
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export default function SideBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const items = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Books", icon: <LibraryBooksIcon />, path: "./books" },
    { text: "Reviews", icon: <ReviewsIcon />, path: "./reviews" },
    { text: "Activity", icon: <EventNoteIcon />, path: "./activities" },
  ];

  return (
    <Drawer variant="permanent" open={open} theme={theme}>
      <List>
        {items.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                p: 0,
                minHeight: 55,
                justifyContent: open ? "initial" : "center",
                px: 4.0,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  //borderRadius: "15px",
                  //boxShadow: "0px 4px 12px rgba(0, 0.1, 0, 0.2)",
                  // transform: "scale(1.1)",
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
                  color: theme.palette.primary.main,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, color: theme.palette.primary.dark }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <DrawerHandler open={open} onClick={handleDrawerToggle} />
    </Drawer>
  );
}
