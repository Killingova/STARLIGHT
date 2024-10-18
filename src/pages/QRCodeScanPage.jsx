import React, { useState, useContext, useCallback } from 'react';
import CameraComponent from '../components/CameraComponent';
import Notification from '../components/Notification';
import ProgressBar from '../components/Progressbar';
import { ProgressBarContext } from '../contexts/ProgressBarContext';

const QRCodeScanPage = () => {
  const [scanResult, setScanResult] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState(null);
  const { updateProgress } = useContext(ProgressBarContext);

  const handleScan = useCallback((qrCodeData) => {
    setScanResult(qrCodeData);
    setShowNotification(true);
    updateProgress('qrScan');
  }, [updateProgress]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">QR-Code scannen</h2>

      <ProgressBar />

      <CameraComponent onScan={handleScan} setError={setError} />

      {error && (
        <p className="text-red-500 mt-2">Fehler: {error.message}</p>
      )}

      {showNotification && scanResult && (
        <Notification
          title="Scan erfolgreich"
          message={`QR-Code Daten: ${scanResult}`}
          iconColor="green"
        />
      )}
    </div>
  );
};

export default QRCodeScanPage;
