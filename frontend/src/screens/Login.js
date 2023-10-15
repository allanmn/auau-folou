import React, { useState } from "react";

import "../css/Login.css";
import { Button, Card, CardContent, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import LoginIcon from "@mui/icons-material/Login";

export default () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <Card className="login-card" variant="outlined">
        <CardContent>
          <img src="assets/logo.svg" alt="Logo" className="logo" />

          <TextField
            label="Login"
            variant="outlined"
            fullWidth
            className="login-input"
          />
          <TextField
            label="Senha"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            className="login-input"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" color="primary">
            Entrar
            <LoginIcon style={{ marginLeft: 5 }} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
