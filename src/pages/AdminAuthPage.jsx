// src/pages/AdminAuthPage.jsx

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowContext } from '../contexts/FlowContext';
import { AdminPanelContext } from '../contexts/AdminPanelContext'; // Importiere AdminPanelContext, falls benötigt

// Funktion zur Verwaltung des Formularzustands, übergibt Funktionen als Werte
function useInputState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback(function (e) {
    setValue(e.target.value);
  }, []);
  return [value, handleChange];
}

// Wiederverwendbare Eingabekomponente mit generischen Funktionen
function InputField({ label, type, value, onChange }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// AdminAuthPage Komponente als Funktion
function AdminAuthPage() {
  const [ipAddress, handleIpChange] = useInputState('');
  const [username, handleUsernameChange] = useInputState('');
  const [password, handlePasswordChange] = useInputState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(FlowContext);
  const { state, dispatch } = useContext(AdminPanelContext); // Verwende den AdminPanelContext, falls benötigt

  // Effekt zur Prüfung, ob der Benutzer bereits authentifiziert ist
  useEffect(function () {
    if (isAuthenticated || sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate('/admin');
    }
  }, [navigate, isAuthenticated]);

  // Funktion zur Validierung der IP-Adresse
  function validateIpAddress(ip) {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  }

  // Funktion zur Handhabung des Anmeldeprozesses
  function handleLogin(e) {
    e.preventDefault();
    if (!validateIpAddress(ipAddress)) {
      setError('Ungültige IP-Adresse.');
      return;
    }

    const existingCredentials = JSON.parse(localStorage.getItem('adminCredentials') || 'null');

    if (existingCredentials && existingCredentials.username === username && existingCredentials.password === password) {
      sessionStorage.setItem('isAuthenticated', 'true');
      login(); // Aktualisiere den Authentifizierungszustand im FlowContext
      navigate('/admin');
    } else {
      // Neue Anmeldeinformationen speichern und authentifizieren
      localStorage.setItem('adminCredentials', JSON.stringify({ username, password }));
      localStorage.setItem('serverIp', ipAddress);
      sessionStorage.setItem('isAuthenticated', 'true');
      login(); // Aktualisiere den Authentifizierungszustand im FlowContext
      navigate('/admin');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <InputField label="Server IP-Adresse" type="text" value={ipAddress} onChange={handleIpChange} />
          <InputField label="Benutzername" type="text" value={username} onChange={handleUsernameChange} />
          <InputField label="Passwort" type="password" value={password} onChange={handlePasswordChange} />
          <button 
            type="submit" 
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAuthPage;
