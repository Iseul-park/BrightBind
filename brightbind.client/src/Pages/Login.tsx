import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";

function Login() {
  // state variables for email and passwords
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  // state variable for error messages
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "rememberMe") setRememberMe(e.target.checked);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // handle submit event for the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate email and passwords
    if (!email || !password) {
      setError("Please fill in all fields.");
    } else {
      // clear error message
      setError("");
      // post data to the /register api

      let loginurl = "";
      if (rememberMe == true) loginurl = "/login?useCookies=true";
      else loginurl = "/login?useSessionCookies=true";

      fetch(loginurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((data) => {
          // handle success or error from the server
          console.log("data ok?", data.ok);
          if (data.ok) {
            console.log("Successful Login.");
            setError("Successful Login.");
            window.location.href = "/";
          } else setError("Error Logging In.");
        })
        .catch((error) => {
          // handle network error
          console.error(error);
          setError("Error Logging in.");
        });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h3" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={handleChange}
              name="rememberMe"
              color="primary"
            />
          }
          label="Remember Me"
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Login
        </Button>
        <Button
          onClick={handleRegisterClick}
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default Login;
