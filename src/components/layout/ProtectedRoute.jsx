import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect them to the / page, but you could also trigger the auth modal to open here
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
