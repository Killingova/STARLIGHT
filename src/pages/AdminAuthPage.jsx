// src/pages/AdminAuthPage.jsx/verwaltet die Admin-Anmeldung.
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminPanel from '../hooks/useAdminPanel';

const AdminAuthPage = memo(() => {
  const [ipAddress, setIpAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state, dispatch } = useAdminPanel();

  const existingCredentials = JSON.parse(localStorage.getItem('adminCredentials'));

  useEffect(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const validateIpAddress = useCallback((ip) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  }, []);

  const handleLogin = useCallback((e) => {
    e.preventDefault();

    if (!validateIpAddress(ipAddress)) {
      setError('Ungültige IP-Adresse.');
      return;
    }

    if (existingCredentials) {
      if (existingCredentials.username === username && existingCredentials.password === password) {
        sessionStorage.setItem('isAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError('Ungültiger Benutzername oder Passwort.');
      }
    } else {
      localStorage.setItem('adminCredentials', JSON.stringify({ username, password }));
      localStorage.setItem('serverIp', ipAddress);
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    }
  }, [ipAddress, username, password, existingCredentials, navigate, validateIpAddress]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <InputField label="Server IP-Adresse" type="text" value={ipAddress} onChange={setIpAddress} />
          <InputField label="Benutzername" type="text" value={username} onChange={setUsername} />
          <InputField label="Passwort" type="password" value={password} onChange={setPassword} />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {existingCredentials ? 'Anmelden' : 'Erstmalige Einrichtung'}
          </button>
        </form>
      </div>
    </div>
  );
});

const InputField = memo(({ label, type, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      className="w-full p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
));

export default AdminAuthPage;
