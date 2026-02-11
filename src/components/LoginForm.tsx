import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas/authSchemas";
import type z from "zod";
import { loginUser } from "../api/authApi";
import { isAxiosError } from "axios";
import { setLocalStorage } from "../utils";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

//zod infers a static type based on the defined schema. we use z.infer<> to extract the inferred type and then use it
type LoginFormData = z.infer<typeof loginSchema>;

//define a type for this component
interface LoginFormProps {
  handleSnackbarOpen: () => void;
  handleSnackbarMessageChange: (message: string) => void;
}

const LoginForm = ({
  handleSnackbarOpen,
  handleSnackbarMessageChange,
}: LoginFormProps) => {
  //useForm is a custom hook in React Hook Form (RHF). It takes one object as an optional argument.
  //https://react-hook-form.com/docs/useform
  const {
    //register is a method that registers an input in the form we want to validate
    //example: register("firstName")
    register,
    //handleSubmit is a function that will receive the form data if validation is successful.
    handleSubmit,
    //formState is an object that stores the information about the entire form state. It helps keep track with the user's interaction with the form. In this case, we want to know if and when the form is being submitted, and we want to know if there are any errors.
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    //resolver is a func that lets us perform external validation via any third party libraries, such as zod
    resolver: zodResolver(loginSchema),
  });

  //from react router, useNavigate is a custom hook, returns a navigate function for programmatic navigation
  const navigate = useNavigate();
  const { login } = useAuth();

  //func to handle what happens once the user submits the form
  const onSubmit = async (data: LoginFormData) => {
    try {
      //this is from the custom fake api
      const response = await loginUser(data);

      handleSnackbarMessageChange(response.data.message);
      setLocalStorage("user", response.data.user);

      login(response.data.user);
      //if everything is successful, we navigate the user to the dashboard
      navigate("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        handleSnackbarMessageChange(error.response?.data?.message);
      } else {
        handleSnackbarMessageChange("Unexpected error.");
      }
      //snackbar should open regardless of the outcome, to show the message to the user
    } finally {
      handleSnackbarOpen();
    }
  };

  return (
    <>
      <Box
        component="form"
        //using handleSubmit from RHF here
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          //using register method from RHF here
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
      <Typography variant="body2" gutterBottom sx={{ display: "block", mt: 2, textAlign: 'center' }}>
        <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>Already have an account? Login here</Link>
      </Typography>
    </>
  );
};

export default LoginForm;
