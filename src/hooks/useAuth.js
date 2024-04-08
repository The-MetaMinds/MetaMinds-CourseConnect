import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

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

  useEffect(() => {
    const validateToken = async () => {
      if (authToken) {
        try {
          // Set the authentication token in Axios defaults
          setAuthToken(authToken);

          // Make a request to validate the token
          await axios.post('https://courseconnect-delta.vercel.app/api/auth/validate', { authToken });
          // If the token is valid, set it in the state
          setAuthTokenState(authToken);
        } catch (error) {
          // If the token is invalid, log out the user
          console.error('Invalid token:', error);
          logout();
        }
      }
    };

    validateToken();
  });
  

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
