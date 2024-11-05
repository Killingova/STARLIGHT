// src/pages/AdminPanelPage.jsx

import React, { useContext } from 'react';
import { FlowContext } from '../contexts/FlowContext';
import useAdminPanel from '../hooks/useAdminPanel';
import { useNavigate } from 'react-router-dom';

const AdminPanelPage = () => {
  const { 
    isKioskModeActive, 
    setIsKioskModeActive, 
    isDeviceRegistered, 
    setIsDeviceRegistered,
    logout 
  } = useContext(FlowContext);
  
  const { selectedModules, toggleModule } = useAdminPanel();
  const navigate = useNavigate();

  const toggleKioskMode = () => {
    setIsKioskModeActive(!isKioskModeActive);
  };

  const toggleDeviceRegistration = () => {
    setIsDeviceRegistered(!isDeviceRegistered);
    alert(
      isDeviceRegistered
        ? 'Gerät erfolgreich deregistriert!'
        : 'Gerät erfolgreich registriert!'
    );
  };

  const handleCheckIn = () => {
    navigate('/');
  };

  const handleDeviceLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Panel</h2>

        {/* Kiosk-Modus-Umschalter */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isKioskModeActive}
              onChange={toggleKioskMode}
              className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-lg text-gray-700">Kiosk-Modus aktivieren</span>
          </label>
        </div>

        {/* Geräte-Registrierung */}
        <button
          onClick={toggleDeviceRegistration}
          className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full mb-6 hover:bg-blue-700 transition duration-300"
        >
          {isDeviceRegistered ? 'Gerät deregistrieren' : 'Gerät registrieren'}
        </button>

        {/* Module */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Module</h3>
          {Object.keys(selectedModules).map((module) => (
            <div key={module} className="mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedModules[module]}
                  onChange={() => toggleModule(module)}
                  className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="capitalize text-gray-700">{module}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Check-in */}
        <button
          onClick={handleCheckIn}
          className="bg-green-500 text-white px-4 py-3 rounded-lg w-full mt-8 hover:bg-green-600 transition duration-300"
        >
          Check-in starten
        </button>

        {/* Device Logout */}
        <button
          onClick={handleDeviceLogout}
          className="bg-red-600 text-white px-4 py-3 rounded-lg w-full mt-4 hover:bg-red-700 transition duration-300"
        >
          Gerät abmelden
        </button>
      </div>
    </div>
  );
};

export default AdminPanelPage;
