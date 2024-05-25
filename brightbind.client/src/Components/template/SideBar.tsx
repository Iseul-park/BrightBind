import { useNavigate } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ReviewsIcon from "@mui/icons-material/Reviews";
import EventNoteIcon from "@mui/icons-material/EventNote";

interface SideBarProps {
  drawerWidth: number;
  open: boolean;
  onClose: () => void;
}
const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
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
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`, //8px
  },
  borderRight: `1px solid ${theme.palette.primary.main}`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  borderRight: "none",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth" })(
  ({ theme, open, drawerWidth }: { theme: Theme; open: boolean; drawerWidth: number }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme, drawerWidth),
      "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export default function SideBar({ drawerWidth, open, onClose }: SideBarProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleDrawerClose = () => {
    onClose();
  };

  const items = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Books", icon: <LibraryBooksIcon />, path: "./books" },
    { text: "Reviews", icon: <ReviewsIcon />, path: "./reviews" },
    { text: "Activity", icon: <EventNoteIcon />, path: "./activities" },
  ];

  return (
    <Drawer variant="permanent" drawerWidth={drawerWidth} open={open} theme={theme}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      {/* <Divider /> */}
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
    </Drawer>
  );
}
