// src/pages/DeviceNotRegisteredPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification'; // Annahme, dass du eine Notification-Komponente hast

const DeviceNotRegisteredPage = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Hauptbenachrichtigung */}
      <Notification
        type="warning"
        message="Wichtiger Hinweis: Gerät nicht registriert!"
        className="mb-6"
      />
      
      <h1 className="text-3xl font-bold mb-4 text-red-600">Gerät nicht registriert</h1>
      <p className="text-center mb-6 max-w-lg">
        Dieses Gerät ist nicht registriert oder der Kiosk-Modus ist nicht aktiv.
        Bitte wenden Sie sich an das Praxispersonal oder melden Sie sich als Admin an, um das Gerät zu registrieren.
      </p>

      <button
        onClick={handleAdminLogin}
        className="bg-blue-600 text-white text-lg px-8 py-3 rounded hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Gerät registrieren
      </button>
    </div>
  );
};

export default DeviceNotRegisteredPage;
