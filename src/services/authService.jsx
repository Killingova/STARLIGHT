// src/services/authService.jsx

import axios from 'axios';

// Basis-URL für das Backend
const API_URL = 'https://your-backend-url/api/auth'; // Bitte passe die URL an

// Login-Funktion: Sendet Anmeldedaten an das Backend und speichert das Token
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });

    // Wenn die Anmeldung erfolgreich ist, speichere das Token im Local Storage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Login fehlgeschlagen:', error);
    throw error;
  }
};

// Logout-Funktion: Entfernt das Token aus dem Local Storage
export const logout = () => {
  localStorage.removeItem('authToken');
};

// Authentifizierungsstatus prüfen: Überprüft, ob ein Token vorhanden ist
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// Token abrufen: Nützlich, um das Token für HTTP-Anfragen zu verwenden
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Beispiel für eine Authentifizierungsanfrage mit Token im Header
export const getUserProfile = async () => {
  try {
    const token = getToken();

    // Anfrage mit Token im Authorization-Header
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen des Benutzerprofils:', error);
    throw error;
  }
};
