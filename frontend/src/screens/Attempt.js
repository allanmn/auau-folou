import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "../css/Attempt.css";


const AttemptPage = () => {
  const navigate = useNavigate();

  const [loading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 3000);
    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="attempt-container">
      {loading ? (
        <div className="loader">
          <CircularProgress size={80} />
        </div>
      ) : (
        <div className="attempt-card">
          <h2>Login Attempt Page</h2>
          <p>
            Not logged in yet? <a href="/login">Go to Login</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AttemptPage;
