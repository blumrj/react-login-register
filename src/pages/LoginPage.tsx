import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useOutletContext } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface OutletContext {
  handleSnackbarOpen: () => void,
  handleSnackbarMessageChange: (message:string) => void
}

const LoginPage = () => {
  const {handleSnackbarOpen, handleSnackbarMessageChange} = useOutletContext<OutletContext>()
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 440,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign in to your account
        </Typography>

        <LoginForm
          handleSnackbarOpen={handleSnackbarOpen}
          handleSnackbarMessageChange={handleSnackbarMessageChange}
        />
      </Paper>
    </Box>
  );
};

export default LoginPage;
