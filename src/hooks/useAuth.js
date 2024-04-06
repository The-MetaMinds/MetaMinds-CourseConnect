import { useState } from 'react';
import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // Set the token in the x-auth-token header
    axios.defaults.headers.common['x-auth-token'] = `${token}`;
  } else {
    // If no token provided, remove the x-auth-token header
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

const useAuth = () => {
  const [authToken, setAuthTokenState] = useState(localStorage.getItem('authToken'));

  const login = async (email, password) => {
    try { //change this to auth api
      const response = await axios.post('https://courseconnect-delta.vercel.app/api/auth', { email, password });
      const { authToken } = response.data;

      // Set the authentication token in Axios defaults and state
      setAuthToken(authToken);
      setAuthTokenState(authToken);

      localStorage.setItem('authToken', authToken);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear authentication token in Axios defaults and state
    setAuthToken(null);
    setAuthTokenState(null);

    localStorage.removeItem('authToken');
  };

  const isAuthenticated = () => {
    return !!authToken;
  };

  return {
    authToken,
    login,
    logout,
    isAuthenticated
  };
};

export default useAuth;
