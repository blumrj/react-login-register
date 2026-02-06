import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import { getFromLocalStorage } from "./utils.ts";

const isAuthenticated = !!getFromLocalStorage("user");

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "login",
        element: isAuthenticated ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <LoginPage />
        ),
      },
      {
        path: "register",
        element: isAuthenticated ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <RegisterPage />
        ),
      },
      {
        path: "dashboard",
        element: isAuthenticated ? (
          <DashboardPage />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
      {
        path: "/",
        element: (
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
