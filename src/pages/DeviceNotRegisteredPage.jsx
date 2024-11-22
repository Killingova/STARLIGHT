// src/pages/DeviceNotRegisteredPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper'; // Wrapper-Komponente, falls vorhanden

const DeviceNotRegisteredPage = () => {
  const navigate = useNavigate();

  // Funktion zur Navigation zur Admin-Login-Seite
  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <ContentWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          Gerät nicht registriert
        </h2>
        <p className="text-center text-white mb-6">
          Dieses Gerät ist nicht registriert oder der Kiosk-Modus ist nicht aktiv.
          Bitte wenden Sie sich an das Praxispersonal oder melden Sie sich als Admin an, um das Gerät zu registrieren.
        </p>
        <button
          onClick={handleAdminLogin}
          className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Gerät registrieren
        </button>
      </div>
    </ContentWrapper>
  );
};

export default DeviceNotRegisteredPage;
