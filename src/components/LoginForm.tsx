import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas/authSchemas";
import type z from "zod";
import { loginUser } from "../api/authApi";
import { isAxiosError } from "axios";
import { setLocalStorage } from "../utils";
import { Link, useNavigate } from "react-router";

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  handleSnackbarOpen: () => void;
  handleSnackbarMessageChange: (message: string) => void;
}

const LoginForm = ({
  handleSnackbarOpen,
  handleSnackbarMessageChange,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);
      handleSnackbarMessageChange(response.data.message);
      setLocalStorage("user", response.data.user);
      navigate("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        handleSnackbarMessageChange(error.response?.data?.message);
      } else {
        handleSnackbarMessageChange("Unexpected error.");
      }
    } finally {
      handleSnackbarOpen();
    }
  };

  return (
    <>
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
          defaultValue="test@test.com"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          {...register("password")}
          helperText={errors.password?.message}
          defaultValue="Password1"
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
      <Typography variant="body2" gutterBottom sx={{ display: "block" }}>
        <Link to="/register">Already have an account? Login here</Link>
      </Typography>
    </>
  );
};

export default LoginForm;
