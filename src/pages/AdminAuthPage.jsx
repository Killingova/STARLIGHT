import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminPanel from '../hooks/useAdminPanel';

// Funktion zur Verwaltung des Formularzustands, übergibt Funktionen als Werte
function useInputState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback(function (e) {
    setValue(e.target.value);
  }, []);
  return [value, handleChange];
}

// AdminAuthPage Komponente als Funktion
function AdminAuthPage() {
  const [ipAddress, handleIpChange] = useInputState('');
  const [username, handleUsernameChange] = useInputState('');
  const [password, handlePasswordChange] = useInputState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state, dispatch } = useAdminPanel();

  // Effekt zur Prüfung, ob der Benutzer bereits authentifiziert ist
  useEffect(function () {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

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
      navigate('/admin');
    } else {
      localStorage.setItem('adminCredentials', JSON.stringify({ username, password }));
      localStorage.setItem('serverIp', ipAddress);
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <InputField label="Server IP-Adresse" type="text" value={ipAddress} onChange={handleIpChange} />
          <InputField label="Benutzername" type="text" value={username} onChange={handleUsernameChange} />
          <InputField label="Passwort" type="password" value={password} onChange={handlePasswordChange} />
          <button type="submit">Anmelden</button>
        </form>
      </div>
    </div>
  );
}

// Wiederverwendbare Eingabekomponente mit generischen Funktionen
function InputField({ label, type, value, onChange }) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default AdminAuthPage;