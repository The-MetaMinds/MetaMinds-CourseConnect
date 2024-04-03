import { useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://courseconnect-delta.vercel.app/api/users/login', { email, password });
      const { authToken } = response.data;
      setAuthToken(authToken);
      localStorage.setItem('authToken', authToken);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = () => {
    setAuthToken(null);
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
