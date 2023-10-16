import React, { useEffect, useState } from "react";

import "../css/Login.css";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthService from "../services/auth";

import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const sendLogin = async () => {
    if (loadingLogin) return;

    let data = {
      email: email,
      password: password,
    };

    setLoadingLogin(true);

    try {
      let response = await AuthService(navigate).login(data);

      AuthService().setToken(response.token);

      // go to dash
    } catch (e) {
      toast("Credenciais incorretas!");
    } finally {
      setLoadingLogin(false);
    }
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div className="login-container">
      <ToastContainer />
      <Card className="login-card" variant="outlined">
        <CardContent>
          <img src="assets/logo.svg" alt="Logo" className="logo" />

          <TextField
            label="Login"
            variant="outlined"
            fullWidth
            value={email}
            onChange={onChangeEmail}
            className="login-input"
          />
          <TextField
            label="Senha"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
            type={showPassword ? "text" : "password"}
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

          <Button
            variant="contained"
            color="primary"
            disabled={loadingLogin}
            onClick={sendLogin}
          >
            {loadingLogin ? "Entrando" : "Entrar"}
            <LoginIcon style={{ marginLeft: 5 }} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
