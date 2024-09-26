// src/services/api.jsx

import axios from 'axios';
import { AUTH_API_ENDPOINT, LOCAL_STORAGE_KEYS } from '../utils/constants';

// Basis-URL der API
const BASE_URL = 'https://api.example.com';

// Erstellen einer Axios-Instanz mit Konfigurationen
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout für Anfragen (10 Sekunden)
});

// Request-Interceptor: Fügt den Token-Header für autorisierte Anfragen hinzu
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response-Interceptor: Behandlung von Fehlern oder Weiterleitung bei 401-Status
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Weiterleitung zur Anmeldeseite, wenn die Authentifizierung fehlschlägt
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

// Funktionen für spezifische API-Aufrufe

// QR-Code-Verifizierung
export const verifyQRCode = async (qrCodeData) => {
  try {
    const response = await api.post('/qr-code', { data: qrCodeData });
    return response.data;
  } catch (error) {
    console.error('QR-Code-Verifizierung fehlgeschlagen:', error);
    throw error;
  }
};

// eGK-Daten verarbeiten
export const verifyEGK = async (cardData) => {
  try {
    const response = await api.post('/egk-verification', { data: cardData });
    return response.data;
  } catch (error) {
    console.error('eGK-Verifizierung fehlgeschlagen:', error);
    throw error;
  }
};

// Anamneseformular übermitteln
export const submitAnamneseForm = async (anamneseData) => {
  try {
    const response = await api.post('/anamnese', { data: anamneseData });
    return response.data;
  } catch (error) {
    console.error('Anamneseübermittlung fehlgeschlagen:', error);
    throw error;
  }
};

// Benutzeranmeldung
export const loginUser = async (username, password) => {
  try {
    const response = await api.post(`${AUTH_API_ENDPOINT}/login`, {
      username,
      password,
    });
    // Token im Local Storage speichern
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_TOKEN, response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login fehlgeschlagen:', error);
    throw error;
  }
};

// Benutzer abmelden
export const logoutUser = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_TOKEN);
  window.location.href = '/admin-login';
};

export default api;
