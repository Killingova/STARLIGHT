import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { FlowContext } from '../contexts/FlowContext';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';

const StartPage = () => {
  const { isDeviceRegistered } = useContext(FlowContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const hasCheckedRegistration = useRef(false);

  const checkRegistration = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!isDeviceRegistered) {
        navigate('/device-not-registered');
      }
    }, 1000);
  }, [isDeviceRegistered, navigate]);

  useEffect(() => {
    if (!hasCheckedRegistration.current) {
      checkRegistration();
      hasCheckedRegistration.current = true;
    }
  }, [checkRegistration]);

  if (loading) {
    return (
      <ContentWrapper>
        <h2 className="text-2xl font-bold text-gray-800">Überprüfen der Registrierung...</h2>
        <p className="text-gray-600">Bitte warten Sie einen Moment.</p>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Willkommen zum Check-In</h1>
      <button
        onClick={() => navigate('/qr-code-scan')}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transition transform active:scale-95"
      >
        Check-In starten
      </button>
    </ContentWrapper>
  );
};

export default StartPage;
