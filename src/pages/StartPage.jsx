import React, { useContext, useEffect, useState } from 'react';
import { FlowContext } from '../contexts/FlowContext'; // FlowContext importieren
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const { isDeviceRegistered } = useContext(FlowContext); // Gerät registriert?
  const [loading, setLoading] = useState(true); // Ladezustand
  const navigate = useNavigate();

  useEffect(() => {
    // Simuliere einen Ladevorgang, um den Status der Registrierung zu überprüfen
    const checkRegistration = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (!isDeviceRegistered) {
          navigate('/device-not-registered'); // Umleiten, falls nicht registriert
        }
      }, 1000); // Simuliertes Laden
    };

    checkRegistration();
  }, [isDeviceRegistered, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl">Überprüfen der Registrierung...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Willkommen zum Check-In</h1>
      <button
        onClick={() => navigate('/qr-code-scan')}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-300 shadow-md text-lg"
      >
        Check-In starten
      </button>
    </div>
  );
};

export default StartPage;
