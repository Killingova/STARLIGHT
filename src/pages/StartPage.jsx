import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useProgressBar from '../hooks/useProgressBar';

const StartPage = () => {
  const { resetProgress } = useProgressBar();
  const navigate = useNavigate();

  useEffect(() => {
    resetProgress();
  }, [resetProgress]);

  const handleStart = useCallback(() => {
    navigate('/qr-code-scan');
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Willkommen zum Check-In</h1>
      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-300 shadow-md text-lg"
      >
        Check-In starten
      </button>
    </div>
  );
};

export default StartPage;
