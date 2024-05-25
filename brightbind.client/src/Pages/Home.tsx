import LogoutLink from "../Components/LogoutLink.tsx";
import AuthorizeView, { AuthorizedUser } from "../Components/AuthorizeView.tsx";
import Button from "@mui/material/Button";
import theme from "../Components/core/Theme.tsx";
import { Box } from "@mui/material";

function Home() {
  return (
    <AuthorizeView>
      <Box sx={{ pl: 10, pr: 10, pt: 8, bgcolor: "#fbe9e7" }}>
        <span>
          <LogoutLink>Logout</LogoutLink>
        </span>
        <h1>
          Hello! <AuthorizedUser value="email"></AuthorizedUser>{" "}
        </h1>
        <Button variant="contained" color="success">
          Test
        </Button>
        <Button variant="contained" color="primary">
          main
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.light,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          light
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.dark,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          dark
        </Button>
        <Button variant="contained" color="secondary">
          secondary
        </Button>
        <Button variant="contained" color="error">
          error
        </Button>
      </Box>
    </AuthorizeView>
  );
}

export default Home;
