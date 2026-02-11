import * as z from "zod";

//zod is a validation library. we define schema we want to use to validate data.
//in this case, we need schema to validate data for registration and login form


export const registerSchema = z
  .object({
    fullName: z.string().min(4, "Full Name must be at least 4 characters"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  //refinements are a way to perform custom validation that zod doesn't have an api for
  //check to see if the passwords match
  .refine((data) => data.password === data.confirmPassword, {
    //for customizing the error path. only useful in the context of object schemas
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
