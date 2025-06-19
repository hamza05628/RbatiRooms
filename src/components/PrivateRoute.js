import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;  // Show loading while checking auth state

  // If user is authenticated, render the children components
  return user ? children : <Navigate to="/login" />;  // Redirect to login if not authenticated
};

export default PrivateRoute;
