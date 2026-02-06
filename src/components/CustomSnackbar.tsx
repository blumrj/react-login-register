import { IconButton, Snackbar, type SnackbarCloseReason } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface CustomSnackbarType {
  message?: string;
  isOpen: boolean;
  onClose: () => void;
}

const CustomSnackbar = ({ message, isOpen, onClose }: CustomSnackbarType) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose()
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message || "Something went wrong"}
      action={action}
    />
  );
};

export default CustomSnackbar;
