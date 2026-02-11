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

//extract the inferred type
type RegistrationFormData = z.infer<typeof registerSchema>;

//define type for the component
interface RegisterFormProps {
  handleSnackbarOpen: () => void;
  handleSnackbarMessageChange: (message: string) => void;
}

const RegistrationForm = ({
  handleSnackbarOpen,
  handleSnackbarMessageChange,
}: RegisterFormProps) => {

  //for programmatic navigation - react router
  const navigate = useNavigate();
  const { login } = useAuth();

  //custom hook from RHF
  const {
    //method that registers a certain input from the form
    register,
    //function that will receive the form data if successfully submitted
    handleSubmit,
    //object that stores the entire form state info.
    formState: { errors },
  } = useForm<RegistrationFormData>({
    //function that lets us perform validation using external libraries such as zod
    resolver: zodResolver(registerSchema),
  });

  //func that handles what happens once the user submits the form
  const onSubmit = async (data: RegistrationFormData) => {

    try {
      //from custom fake api
      const response = await registerUser(data);
      //sets the snackbar message and adds the user to local storage
      handleSnackbarMessageChange(response.data.message);
      setLocalStorage("user", response.data.user);

      login(response.data.user);
      //if login is successful, we programmatically navigate the user to the dashboard page
      navigate("/dashboard");
    } catch (error) {
      //error handling
      if (isAxiosError(error)) {
        handleSnackbarMessageChange(error.response?.data?.message);
      } else {
        handleSnackbarMessageChange("Unexpected error.");
      }
      //show the snackbar regardless of the outcome
    } finally {
      handleSnackbarOpen();
    }
  };

  return (
    <>
      <Box
        component="form"
        //using RHF here
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          //using RHF here
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
