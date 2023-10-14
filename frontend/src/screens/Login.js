import React from "react";

import { FaSignInAlt } from 'react-icons/fa';

export default () => (
  <div className="login-container">
    <div className="login-card">
      <img src="logo.png" alt="Logo" className="logo" />
      <input type="text" placeholder="Username" className="login-input" />
      <input type="password" placeholder="Password" className="login-input" />
      <button className="login-button">
        <FaSignInAlt />
        Login
      </button>
    </div>
  </div>
);
