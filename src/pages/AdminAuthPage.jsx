// src/pages/AdminAuthPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthPage = () => {
  const [ipAddress, setIpAddress] = useState(''); // Zustand für die IP-Adresse
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Zustand für Fehlernachrichten
  const navigate = useNavigate();

  // Überprüfe, ob bereits Zugangsdaten im localStorage vorhanden sind
  const existingCredentials = JSON.parse(localStorage.getItem('adminCredentials'));

  // Funktion für den Login oder die erstmalige Speicherung der Zugangsdaten
  const handleLogin = (e) => {
    e.preventDefault();

    if (existingCredentials) {
      // Prüfe Benutzername und Passwort
      if (
        existingCredentials.username === username &&
        existingCredentials.password === password
      ) {
        // Erfolgreiche Authentifizierung, speichere Session und navigiere zum AdminPanel
        sessionStorage.setItem('isAuthenticated', 'true');
        navigate('/admin');
      } else {
        // Setze Fehlermeldung bei ungültigen Zugangsdaten
        setError('Ungültiger Benutzername oder Passwort.');
      }
    } else {
      // Speichere neue Zugangsdaten und IP-Adresse bei erstmaliger Nutzung im localStorage
      localStorage.setItem(
        'adminCredentials',
        JSON.stringify({ username, password })
      );
      localStorage.setItem('serverIp', ipAddress); // IP-Adresse speichern
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/admin'); // Weiterleitung zum AdminPanel
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        
        {/* Fehlermeldung anzeigen, falls vorhanden */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Eingabefeld für IP-Adresse */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Server IP-Adresse</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              required
            />
          </div>

          {/* Eingabefeld für Benutzername */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Benutzername</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Eingabefeld für Passwort */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Passwort</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Schaltfläche zum Anmelden */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {existingCredentials ? 'Anmelden' : 'Erstmalige Einrichtung'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthPage;
