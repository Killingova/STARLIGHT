//src\services\authService.jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
});

// Login-Funktion
export const login = async (username, password) => {
  try {
    const response = await api.get(`/admins?username=${username}&password=${password}`);
    const admin = response.data[0]; // Weil json-server ein Array zurückgibt
    if (admin) {
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
