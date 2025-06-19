import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';  // Axios instance with proper config

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserLoggedIn(); // Check if user is logged in when the app starts
  }, []);

  // Check if user is logged in when the app starts
  const checkUserLoggedIn = async () => {
    try {
      // Fetch user info from the /auth/user route
      const res = await api.get('/auth/user');
      setUser(res.data);  // Set the user data received from the backend
      setLoading(false);
    } catch (error) {
      setUser(null);  // Set user to null if there's an error
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      
      // Assuming the response contains a JWT token and user data
      localStorage.setItem('token', res.data.token);  // Store JWT in localStorage
      setUser(res.data.user);  // Set user data

      window.location.href = "/profile";  // Redirect to profile after login
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.get('/auth/logout');  // Or clear token from backend if necessary
      localStorage.removeItem('token');  // Remove JWT from localStorage
      setUser(null);  // Clear user data
      window.location.href = "/login";  // Redirect to login after logout
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
