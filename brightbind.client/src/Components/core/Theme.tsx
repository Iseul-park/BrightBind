import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f57c00",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#fff3e0",
    },
    secondary: {
      main: "#fbe9e7",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
