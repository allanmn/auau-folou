import axios from "axios";
import AuthService from "./auth";

const API_BASE_URL = "https://localhost/api"; // Update with your API URL

const ApiService = (navigate) => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use((config) => {
    const token = AuthService().getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        AuthService.logout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  const get = async (endpoint, params = {}) => {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const post = async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const put = async (endpoint, data) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating resource: ${error.message}`);
    }
  };

  const remove = async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    remove,
  };
};

export default ApiService;
