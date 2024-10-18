import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute-Komponente
function PrivateRoute({ children, redirectPath = '/admin-login', errorMessage = null }) {
  // Memoization des Authentifizierungsstatus aus sessionStorage
  const isAuthenticated = useMemo(() => Boolean(sessionStorage.getItem('isAuthenticated')), []);

  // Bedingte Rückgabe basierend auf der Authentifizierung
  if (!isAuthenticated) {
    // Zeigt eine Fehlermeldung an, falls angegeben
    if (errorMessage) {
      alert(errorMessage);
    }
    return <Navigate to={redirectPath} />; // Leitet zu einer anderen Route weiter
  }

  // Rückgabe der Kindkomponenten bei Authentifizierung
  return children;
}

export default PrivateRoute;
