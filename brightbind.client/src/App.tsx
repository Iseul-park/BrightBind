import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Components/core/Theme.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import BookListPage from "./Pages/BookListPage.tsx";
import ReviewListPage from "./Pages/ReviewListPage.tsx";
import Template from "./Pages/Template.tsx";
import Home from "./Pages/Home.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />\
          <Route path="/" element={<Template />}>
            <Route index element={<Home />} />
            <Route path="books" element={<BookListPage />} />
            <Route path="reviews" element={<ReviewListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
