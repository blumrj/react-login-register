import { useState } from "react";
import { CssBaseline } from "@mui/material";
import CustomSnackbar from "./components/CustomSnackbar";
import { Outlet } from "react-router";

function App() {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleSnackbarOpen = () => {
    setIsSnackbarOpen(true);
  };

  const handleSnackbarMessageChange = (newMessage: string) => {
    setSnackbarMessage(newMessage);
  };

  return (
    <>
      <CssBaseline />
      <CustomSnackbar
        isOpen={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
      {/* adding context to pass values to all child components in outlet */}
      <Outlet context={{ handleSnackbarOpen, handleSnackbarMessageChange }} />
    </>
  );
}

export default App;
