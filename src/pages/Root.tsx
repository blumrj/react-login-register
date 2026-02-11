import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//the purpose of this page is to limit user's access to pages depending of their login state - if they are logged in, we prevent them from accessing /login and /register
//if they are not logged in, we prevent them from accessing /dashboard

const Root = () => {
  const { isAuthenticated } = useAuth();
  //programmatic navigation with react router
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default Root;