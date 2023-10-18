import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "../css/Attempt.css";
import AuthService from "../services/auth";

const AttemptPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timeout = setTimeout(() => {
      const token = AuthService().getToken();

      if (token) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }, 3000);
    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="attempt-container">
      <div className="loader">
        <CircularProgress size={80} />
      </div>
    </div>
  );
};

export default AttemptPage;
