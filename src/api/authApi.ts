import type { AxiosError } from "axios";
import { nanoid } from "nanoid";

type LoginPayload = {
  email: string;
  password: string;
};

type RegistrationPayload = {
  fullName: string;
  email: string;
  password: string;
};

// this function simulates network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginUser = async (data: LoginPayload) => {
  await delay(1000);

  if (data.email !== "test@test.com" || data.password !== "Password1") {
    const error: AxiosError = {
      name: "AxiosError",
      message: "Invalid credentials.",
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
      response: {
        status: 401,
        statusText: "Unauthorized",
        headers: {},
        config: {},
        data: {
          message: "Invalid email or password.",
        },
      },
    };

    return Promise.reject(error);
  }

  return {
    data: {
      message: "Successful Login",
      user: {
        id: nanoid(),
        email: data.email,
        fullName: "Test Test",

      },
    },
  };
};

export const registerUser = async (data: RegistrationPayload) => {
  await delay(1000);

  if (data.email === "test@test.com") {
    const error: AxiosError = {
      name: "AxiosError",
      message: "An account with this email address already exists.",
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
      response: {
        status: 409,
        statusText: "Conflict",
        headers: {},
        config: {},
        data: {
          message: "An account with this email address already exists.",
        },
      },
    };

    return Promise.reject(error);
  }

  return {
    data: {
      message: "User registered successfully",
      user: {
        id: nanoid(),
        email: data.email,
        fullName: data.fullName,
      },
    },
  };
};
