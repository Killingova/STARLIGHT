import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';
import CameraComponent from '../components/CameraComponent';
import Notification from '../components/Notification';
import { ProgressBarContext } from '../contexts/ProgressBarContext';
import appointmentService from '../services/appointmentService';

const QRCodeScanPage = () => {
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const { updateProgress } = useContext(ProgressBarContext);
  const navigate = useNavigate();

  // Callback-Funktion zum Verarbeiten des QR-Codes
  const handleScan = useCallback(
    async (qrCodeData, stopCamera) => {
      try {
        const appointment = await appointmentService.confirmAppointment(qrCodeData);
        updateProgress('qrScan');
        stopCamera();
        setShowNotification(true);
        setTimeout(() => navigate('/egk-verification'), 2000);
      } catch (err) {
        setError(err.message || 'Fehler beim Scannen des QR-Codes.');
        console.error('QR-Code-Verarbeitung fehlgeschlagen:', err);
      }
    },
    [appointmentService, updateProgress, navigate]
  );

  return (
    <ContentWrapper>
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Bitte scannen Sie Ihren QR-Code</h2>

      {/* Fehleranzeige */}
      {error && (
        <Notification
          title="Fehler"
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}

      {/* Erfolgsbenachrichtigung */}
      {showNotification && (
        <Notification
          title="Scan erfolgreich"
          message="Ihr QR-Code wurde erfolgreich gescannt."
          type="success"
          onClose={() => setShowNotification(false)}
          duration={2000}
        />
      )}

      {/* Kamera-Komponente */}
      {!showNotification && (
        <CameraComponent onScan={handleScan} setError={setError} />
      )}
    </ContentWrapper>
  );
};

export default QRCodeScanPage;
