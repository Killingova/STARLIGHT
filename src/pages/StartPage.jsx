import React, { useContext, useState, useRef } from 'react';
import { FlowContext } from '../contexts/FlowContext';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const { isDeviceRegistered } = useContext(FlowContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasCheckedRegistration = useRef(false);

  const checkRegistration = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!isDeviceRegistered) {
        navigate('/device-not-registered');
      }
    }, 1000);
  };

  if (!hasCheckedRegistration.current) {
    checkRegistration();
    hasCheckedRegistration.current = true;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Überprüfen der Registrierung...</h2>
          <p className="text-gray-600">Bitte warten Sie einen Moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Willkommen zum Check-In</h1>
        <button
          onClick={() => navigate('/qr-code-scan')}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Check-In starten
        </button>
      </div>
    </div>
  );
};

export default StartPage;
