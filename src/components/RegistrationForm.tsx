import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/authSchemas";
import type z from "zod";

type registrationFormData = z.infer<typeof registerSchema>

const RegistrationForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registrationFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data:registrationFormData) => {
    console.log("form submitted", data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Create an Account
      </Typography>
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
    </Paper>
  );
};

export default RegistrationForm;
