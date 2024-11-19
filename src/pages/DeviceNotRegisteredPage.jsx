import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceNotRegisteredPage = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Gerät nicht registriert
        </h2>
        <p className="text-lg text-center mb-6 text-gray-700">
          Dieses Gerät ist nicht registriert oder der Kiosk-Modus ist nicht aktiv.
          Bitte wenden Sie sich an das Praxispersonal oder melden Sie sich als Admin an, um das Gerät zu registrieren.
        </p>
        <button
          onClick={handleAdminLogin}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Gerät registrieren
        </button>
      </div>
    </div>
  );
};

export default DeviceNotRegisteredPage;
