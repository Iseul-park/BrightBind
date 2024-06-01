import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Components/template/Header.tsx";
import SideBar from "../Components/template/SideBar.tsx";
import { Outlet } from "react-router-dom";
import AuthorizeView from "../Components/AuthorizeView.tsx";

export default function Template() {
  // it returns entire layout of the page, containing side bar and app bar
  const headerHeight = 70;

  return (
    <AuthorizeView>
      <Box sx={{ display: "flex", backgroundColor: "#f0f0f0" }}>
        <CssBaseline />
        <Header headerHeight={headerHeight} />
        <SideBar headerHeight={headerHeight} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: `${headerHeight}px` }}>
          <Outlet />
        </Box>
      </Box>
    </AuthorizeView>
  );
}
