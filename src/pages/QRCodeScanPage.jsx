import React, { useState, useContext, useCallback } from 'react';
import CameraComponent from '../components/CameraComponent';
import Notification from '../components/Notification';
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
    <div>
      <h2>QR-Code scannen</h2>

      <CameraComponent onScan={handleScan} setError={setError} />

      {error && (
        <p>Fehler: {error.message}</p>
      )}

      {showNotification && scanResult && (
        <Notification
          title="Scan erfolgreich"
          message={`QR-Code Daten: ${scanResult}`}
        />
      )}
    </div>
  );
};

export default QRCodeScanPage;