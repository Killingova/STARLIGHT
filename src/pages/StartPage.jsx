// src/pages/StartPage.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBarContext } from '../contexts/ProgressBarContext';
import { AdminPanelContext } from '../contexts/AdminPanelContext';

const StartPage = () => {
  const { updateProgress } = useContext(ProgressBarContext);
  const { state } = useContext(AdminPanelContext);
  const navigate = useNavigate();

  useEffect(() => {
    updateProgress('qrScan');
  }, [updateProgress]);

  const handleStart = () => {
    if (state.selectedModules.qrCodeScan) {
      navigate('/qr-code-scan');
    } else {
      navigate('/egk-verification');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Willkommen zum Check-In</h1>
      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Check-In starten
      </button>
    </div>
  );
};

export default StartPage;
