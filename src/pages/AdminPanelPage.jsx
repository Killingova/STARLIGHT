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

  // Funktion zum Registrieren des Geräts und Starten des Check-ins
  const handleRegisterAndStartCheckIn = () => {
    setIsDeviceRegistered(true);
    setIsKioskModeActive(true);
    alert('Gerät erfolgreich registriert und Kiosk-Modus aktiviert!');
    navigate('/'); // Navigiere zur Startseite des Check-ins
  };

  // Funktion zum Deregistrieren des Geräts
  const handleDeregisterDevice = () => {
    setIsDeviceRegistered(false);
    setIsKioskModeActive(false);
    alert('Gerät erfolgreich deregistriert und Kiosk-Modus deaktiviert!');
  };

  // Funktion zum Abmelden des Geräts (Logout)
  const handleDeviceLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Panel</h2>

        {/* Bedingte Darstellung basierend auf dem Registrierungsstatus des Geräts */}
        {!isDeviceRegistered ? (
          // Wenn das Gerät nicht registriert ist, zeige den Button zum Registrieren und Starten des Check-ins
          <button
            onClick={handleRegisterAndStartCheckIn}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full mb-6"
          >
            Gerät registrieren und Check-in starten
          </button>
        ) : (
          // Wenn das Gerät registriert ist, zeige Optionen zum Deregistrieren und Abmelden
          <>
            {/* Button zum Deregistrieren des Geräts */}
            <button
              onClick={handleDeregisterDevice}
              className="bg-red-600 text-white px-4 py-3 rounded-lg w-full mb-6"
            >
              Gerät deregistrieren
            </button>

            {/* Button zum Abmelden des Geräts */}
            <button
              onClick={handleDeviceLogout}
              className="bg-gray-600 text-white px-4 py-3 rounded-lg w-full mb-6"
            >
              Gerät abmelden
            </button>
          </>
        )}

        {/* Modulverwaltung bleibt erhalten */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Module verwalten</h3>
          {Object.keys(selectedModules).map((module) => (
            <div key={module} className="mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedModules[module]}
                  onChange={() => toggleModule(module)}
                  className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded"
                />
                <span className="capitalize text-gray-700">{module}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
