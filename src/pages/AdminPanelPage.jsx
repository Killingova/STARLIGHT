// src/pages/AdminPanelPage.jsx
import React, { useContext } from 'react';
import { FlowContext } from '../contexts/FlowContext';
import useAdminPanel from '../hooks/useAdminPanel';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';

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
    <ContentWrapper>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Admin Panel</h2>

        {/* Bedingte Darstellung basierend auf dem Registrierungsstatus des Geräts */}
        {!isDeviceRegistered ? (
          <button
            onClick={handleRegisterAndStartCheckIn}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full mb-4 transition active:scale-95"
          >
            Gerät registrieren und Check-in starten
          </button>
        ) : (
          <>
            <button
              onClick={handleDeregisterDevice}
              className="bg-red-600 text-white px-4 py-2 rounded-lg w-full mb-4 transition active:scale-95"
            >
              Gerät deregistrieren
            </button>
            <button
              onClick={handleDeviceLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg w-full mb-4 transition active:scale-95"
            >
              Gerät abmelden
            </button>
          </>
        )}

        {/* Modulverwaltung */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Module verwalten</h3>
          {Object.keys(selectedModules).map((module) => (
            <div key={module} className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={selectedModules[module]}
                onChange={() => toggleModule(module)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded mr-3"
              />
              <span className="capitalize text-gray-700">{module}</span>
            </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default AdminPanelPage;
