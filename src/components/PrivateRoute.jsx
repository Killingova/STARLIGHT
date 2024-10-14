import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, redirectPath = '/admin-login', errorMessage = null }) => {
  const isAuthenticated = Boolean(sessionStorage.getItem('isAuthenticated'));

  if (!isAuthenticated) {
    if (errorMessage) {
      alert(errorMessage);
    }
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default PrivateRoute;
