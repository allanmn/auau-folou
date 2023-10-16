import React from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./auth";

const API_BASE_URL = "http://localhost:8000/api"; // Update with your API URL

const ApiService = () => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const token = AuthService().getToken();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          AuthService.logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []); // Empty dependency array means this effect will only run once

  const get = async (endpoint, params = {}) => {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  };

  const post = async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating resource: ${error.message}`);
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
      throw new Error(`Error deleting resource: ${error.message}`);
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
