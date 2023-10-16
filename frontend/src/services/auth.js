import axios from "axios";

const TOKEN_KEY = "auau_auth_token";

const API_BASE_URL = "http://localhost:8000/api"; // Update with your API URL

const AuthService = (navigate) => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  const login = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  // Get the stored token from local storage
  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  // Set the token to local storage
  const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    const token = this.getToken();
    return !!token;
  };

  return {
    login,
    removeToken,
    isAuthenticated,
    setToken,
    getToken,
  };
};

export default AuthService;
