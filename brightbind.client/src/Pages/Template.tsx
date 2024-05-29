import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Components/template/Header.tsx";
import SideBar from "../Components/template/SideBar.tsx";
import { Outlet } from "react-router-dom";
import AuthorizeView from "../Components/AuthorizeView.tsx";

export default function Template() {
  // it returns entire layout of the page, containing side bar and app bar
  return (
    <AuthorizeView>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <SideBar />
        <Box sx={{ pt: 8, bgcolor: "#fbe9e7" }}>
          <Outlet />
        </Box>
      </Box>
    </AuthorizeView>
  );
}
