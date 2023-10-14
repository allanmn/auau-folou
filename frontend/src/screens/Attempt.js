import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../css/Attempt.css";

const AttemptPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginAttempt = () => {
    // Simulate successful login for demonstration purposes
    setIsLoggedIn(true);
  };

  return (
    <div className="attempt-container">
      {isLoggedIn ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="attempt-card">
          <h2>Login Attempt Page</h2>
          <button onClick={handleLoginAttempt} className="attempt-button">
            Try Login
          </button>
          <p>
            Not logged in yet? <a href="/login">Go to Login</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AttemptPage;
