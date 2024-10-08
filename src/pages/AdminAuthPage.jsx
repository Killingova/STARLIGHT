import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminPanelContext } from '../contexts/AdminPanelContext';

const AdminAuthPage = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AdminPanelContext);

  const existingCredentials = JSON.parse(localStorage.getItem('adminCredentials'));

  useEffect(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const validateIpAddress = (ip) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  };

  const handleLogin = (e) => {
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
  };

  const handleKioskModeChange = () => {
    dispatch({ type: 'TOGGLE_KIOSK_MODE' });
  };

  const handleModuleChange = (module) => {
    dispatch({ type: 'TOGGLE_MODULE', module });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {existingCredentials ? 'Anmelden' : 'Erstmalige Einrichtung'}
          </button>
        </form>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Aktive Module</h2>
          {state.selectedModules && Object.keys(state.selectedModules).map((module) => (
            <div key={module}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={state.selectedModules[module]}
                  onChange={() => handleModuleChange(module)}
                />
                <span className="ml-2 text-gray-700 capitalize">
                  {module.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={state.isKioskModeEnabled}
              onChange={handleKioskModeChange}
            />
            <span className="ml-2 text-gray-700">Kiosk-Modus aktivieren</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthPage;
