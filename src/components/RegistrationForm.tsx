import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/authSchemas";
import { registerUser } from "../api/authApi";
import type z from "zod";
import { isAxiosError } from "axios";
import { setLocalStorage } from "../utils";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

type RegistrationFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  handleSnackbarOpen: () => void;
  handleSnackbarMessageChange: (message: string) => void;
}

const RegistrationForm = ({
  handleSnackbarOpen,
  handleSnackbarMessageChange,
}: RegisterFormProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    console.log("form submitted", data);
    try {
      const response = await registerUser(data);
      handleSnackbarMessageChange(response.data.message);
      setLocalStorage("user", response.data.user);
      login(response.data.user);
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
          label="Full Name"
          variant="outlined"
          fullWidth
          {...register("fullName")}
          helperText={errors.fullName?.message}
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          {...register("confirmPassword")}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Already have an account? Login here</Link>
      </Typography>
    </>
  );
};

export default RegistrationForm;
