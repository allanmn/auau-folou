const TOKEN_KEY = 'auau_auth_token';

const AuthService = {
  // Get the stored token from local storage
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Set the token to local storage
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Remove the token from local storage
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if the user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  },

  // Login: Set the token to local storage
  login(token) {
    this.setToken(token);
  },

  // Logout: Remove the token from local storage
  logout() {
    this.removeToken();
  },
};

export default AuthService;
