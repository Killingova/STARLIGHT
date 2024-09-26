// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

// Geschützte Route
const PrivateRoute = ({ children }) => {
  // Überprüfe nur die Authentifizierung (ohne Kiosk-Modus-Prüfung)
  const isAuthenticated = Boolean(sessionStorage.getItem('isAuthenticated'));

  // Wenn authentifiziert, zeige die Kinderkomponenten an
  // Wenn nicht authentifiziert, leite zur Admin-Login-Seite weiter
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
