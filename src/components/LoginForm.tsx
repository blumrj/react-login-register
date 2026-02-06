import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas/authSchemas";
import type z from "zod";
import { login } from "../api/authApi";
import { isAxiosError } from "axios";
import { useState } from "react";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [snackbarMessage, setSnackbarMessage] = useState<string>(
    "This is the default value of a snackbar message",
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("form submitted", data);

    try {
      const response = await login(data);
      setSnackbarMessage(response.data.message);
      console.log(response.data.message, response.data.user);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data?.message || "Something went wrong.");
        setSnackbarMessage(
          error.response?.data?.message || "Something went wrong.",
        );
      } else {
        console.error("Unexpected error.");
        setSnackbarMessage("Unexpected error.");
      }
    }
  };

  return (
    <>
      <Snackbar
        open={true}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="error"
          variant="filled"
        >
         {snackbarMessage}
        </Alert>
      </Snackbar>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Welcome Back!
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            {...register("email")}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password")}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing" : "Log In"}
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default LoginForm;
