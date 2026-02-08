import { Box, Paper, Typography, Button, Avatar } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

interface OutletContext {
  handleSnackbarOpen: () => void;
  handleSnackbarMessageChange: (message: string) => void;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { handleSnackbarOpen, handleSnackbarMessageChange } =
    useOutletContext<OutletContext>();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    handleSnackbarMessageChange("Logged out");
    handleSnackbarOpen();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 720,
        mx: "auto",
        my: 4,
        px: 2,
      }}
    >
      <Paper
        sx={{ p: 4, display: "flex", gap: 3, alignItems: "center" }}
        elevation={6}
      >
        <Avatar sx={{ width: 72, height: 72 }}>
          {user
            ? user.fullName?.charAt(0).toUpperCase() ??
              user.email?.charAt(0)?.toUpperCase() ??
              "U"
            : "U"}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">
            Welcome, {user?.fullName ?? user?.email}
          </Typography>
          {user?.email && (
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          )}
          {user?.id && (
            <Typography variant="body2" color="text.secondary">
              ID: {user.id}
            </Typography>
          )}
        </Box>

        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default DashboardPage;
