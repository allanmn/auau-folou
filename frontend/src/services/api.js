import axios from 'axios';
import AuthService from './AuthService';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Update with your API URL
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(config => {
  const token = AuthService.getToken();

  // If the token exists, add it to the request parameters
  if (token) {
    config.params = {
      ...config.params,
      token,
    };
  }

  return config;
});

const ApiService = {
  async get(endpoint, params = {}) {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },

  async post(endpoint, data) {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating resource: ${error.message}`);
    }
  },

  async put(endpoint, data) {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating resource: ${error.message}`);
    }
  },

  async delete(endpoint) {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting resource: ${error.message}`);
    }
  },
};

export default ApiService;
