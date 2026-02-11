import { Box, Paper, Typography } from "@mui/material";
import RegistrationForm from "../components/RegistrationForm";
import { useOutletContext } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface OutletContext {
  handleSnackbarOpen: () => void,
  handleSnackbarMessageChange: (message:string) => void
}

const RegisterPage = () => {

  //use the context from the parent component - Outlet, react router
  const {handleSnackbarOpen, handleSnackbarMessageChange} = useOutletContext<OutletContext>()
  const { isAuthenticated } = useAuth();
  //programmatic navigation, react router
  const navigate = useNavigate();

  //a hook that performs side effects based on the dependency array
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
          Create an account
        </Typography>

        <RegistrationForm
          handleSnackbarOpen={handleSnackbarOpen}
          handleSnackbarMessageChange={handleSnackbarMessageChange}
        />
      </Paper>
    </Box>
  );
};

export default RegisterPage;
