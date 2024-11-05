// src/components/PrivateRoute.jsx

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { FlowContext } from '../contexts/FlowContext';

const PrivateRoute = ({ children, redirectPath = '/admin-login', errorMessage = null }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(FlowContext);

  if (!isAuthenticated) {
    if (errorMessage) {
      alert(errorMessage); // Zeigt eine Fehlermeldung an, falls übergeben
    }
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }

  return <>{children}</>; // Gibt die geschützten Kinderkomponenten zurück, falls authentifiziert
};

export default PrivateRoute;
