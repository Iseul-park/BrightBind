import { useNavigate } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
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

interface MySideBarProps {
  drawerWidth: number;
  open: boolean;
  onClose: () => void;
}
const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  // handle the style of the side bar when it's opened
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden", // 가로 방향으로 오버플로우가 발생했을 때의 처리를 설정
});

const closedMixin = (theme: Theme): CSSObject => ({
  // handle the style of the side bar whtn it's closed
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`, //8px
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  // the top part of the side bar so it dispay the hamburger button, which is cheron button here?
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
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
      "& .MuiDrawer-paper": closedMixin(theme), // MuiDrawer 컴포넌트 내부의 MuiDrawer-paper 클래스에 대한 스타일을 설정하는 것. MuiDrawer-paper는 이 사이드바의 내용을 감싸는 부분.이 부분은 사이드바가 닫힌 상태일 때에도 특정 스타일을 MuiDrawer-paper 클래스에 적용하기 위해 사용
    }),
  })
);

export default function MySideBar({ drawerWidth, open, onClose }: MySideBarProps) {
  // it returns entire layout of the page, containing side bar and app bar
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
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
