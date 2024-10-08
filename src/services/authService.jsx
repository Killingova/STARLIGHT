// src/services/authService.jsx

import axios from 'axios';

// Funktion, um die Server-IP-Adresse aus dem Local Storage zu holen
const getServerIp = () => {
  return localStorage.getItem('serverIp') || 'localhost'; // Fallback zu 'localhost' falls nicht gesetzt
};

// Funktion, um die Basis-URL zu erstellen
const getApiUrl = () => {
  const serverIp = getServerIp();
  return `http://${serverIp}:5000`; // Port anpassen, falls erforderlich
};

// Axios-Instanz mit dynamischer Basis-URL
const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
});

// Login-Funktion
export const login = async (username, password) => {
  try {
    const response = await api.post('/admins', { username, password });

    // Überprüfen, ob die Anmeldedaten korrekt sind
    const admin = response.data.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (admin) {
      // Speichern des Tokens oder eines Indikators im Local Storage
      localStorage.setItem('authToken', 'dummyToken');
      return { success: true };
    } else {
      throw new Error('Ungültige Anmeldedaten');
    }
  } catch (error) {
    console.error('Login fehlgeschlagen:', error);
    throw error;
  }
};

// Logout-Funktion
export const logout = () => {
  localStorage.removeItem('authToken');
};

// Überprüfen, ob der Benutzer authentifiziert ist
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// Token abrufen (falls benötigt)
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Beispiel für eine authentifizierte Anfrage
export const getUserProfile = async () => {
  try {
    const token = getToken();

    const response = await api.get('/user/profile', {
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
