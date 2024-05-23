import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Components/template/Header.tsx";
import MySideBar from "../Components/template/SideBar.tsx";
import { Outlet } from "react-router-dom";
import AuthorizeView from "../Components/AuthorizeView.tsx";

export default function Template() {
  // it returns entire layout of the page, containing side bar and app bar
  const [open, setOpen] = React.useState(true);
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AuthorizeView>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header drawerWidth={drawerWidth} drawerOpen={open} onClick={handleDrawerOpen} />
        <MySideBar drawerWidth={drawerWidth} open={open} onClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* <DrawerHeader /> */}
          <Outlet />
        </Box>
      </Box>
    </AuthorizeView>
  );
}
