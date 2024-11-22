// src/pages/AdminAuthPage.jsx
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';
import { FlowContext } from '../contexts/FlowContext';

// Funktion zur Verwaltung des Formularzustands
function useInputState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handleChange];
}

// Wiederverwendbare Eingabekomponente
function InputField({ label, type, value, onChange }) {
  return (
    <div className="flex flex-col mb-4 w-full">
      <label className="mb-2 text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
    </div>
  );
}

function AdminAuthPage() {
  const [ipAddress, handleIpChange] = useInputState('');
  const [username, handleUsernameChange] = useInputState('');
  const [password, handlePasswordChange] = useInputState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(FlowContext);

  useEffect(() => {
    if (isAuthenticated || sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate('/admin');
    }
  }, [navigate, isAuthenticated]);

  function validateIpAddress(ip) {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!validateIpAddress(ipAddress)) {
      setError('Ungültige IP-Adresse.');
      return;
    }

    const existingCredentials = JSON.parse(localStorage.getItem('adminCredentials') || 'null');

    if (existingCredentials && existingCredentials.username === username && existingCredentials.password === password) {
      sessionStorage.setItem('isAuthenticated', 'true');
      login();
      navigate('/admin');
    } else {
      localStorage.setItem('adminCredentials', JSON.stringify({ username, password }));
      localStorage.setItem('serverIp', ipAddress);
      sessionStorage.setItem('isAuthenticated', 'true');
      login();
      navigate('/admin');
    }
  }

  return (
    <ContentWrapper>
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Admin Login</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-6 w-full max-w-md">
        <InputField label="Server IP-Adresse" type="text" value={ipAddress} onChange={handleIpChange} />
        <InputField label="Benutzername" type="text" value={username} onChange={handleUsernameChange} />
        <InputField label="Passwort" type="password" value={password} onChange={handlePasswordChange} />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Anmelden
        </button>
      </form>
    </ContentWrapper>
  );
}

export default AdminAuthPage;
