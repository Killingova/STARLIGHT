// src/pages/QRCodeScanPage.jsx

import React, { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraComponent from '../components/CameraComponent';
import Notification from '../components/Notification';
import { ProgressBarContext } from '../contexts/ProgressBarContext';
import appointmentService from '../services/appointmentService';

const QRCodeScanPage = () => {
  const [error, setError] = useState(null); // Zustand für Fehlernachrichten
  const [showNotification, setShowNotification] = useState(false); // Zustand für die Erfolgsbenachrichtigung
  const { updateProgress } = useContext(ProgressBarContext);
  const navigate = useNavigate();

  // Callback-Funktion, die aufgerufen wird, wenn der QR-Code erfolgreich gescannt wurde
  const handleScan = useCallback(
    async (qrCodeData, stopCamera) => {
      try {
        // Senden der QR-Code-Daten an den appointmentService zur Terminbestätigung
        const appointment = await appointmentService.confirmAppointment(qrCodeData);

        // Fortschritt aktualisieren
        updateProgress('qrScan');

        // Kamera stoppen
        stopCamera();

        // Erfolgsbenachrichtigung anzeigen
        setShowNotification(true);

        // Nach einer kurzen Verzögerung zur nächsten Seite navigieren
        setTimeout(() => {
          navigate('/egk-verification');
        }, 2000); // 2 Sekunden Verzögerung (kann angepasst werden)
      } catch (err) {
        // Fehler setzen und in der Konsole ausgeben
        setError(err.message);
        console.error('QR-Code-Verarbeitung fehlgeschlagen:', err);
      }
    },
    [updateProgress, navigate]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Bitte scannen Sie Ihren QR-Code</h2>

        {/* Fehleranzeige */}
        {error && (
          <Notification
            title="Fehler"
            message={error}
            type="error"
            onClose={() => setError(null)} // Ermöglicht das Schließen der Fehlermeldung
          />
        )}

        {/* Erfolgsbenachrichtigung */}
        {showNotification && (
          <Notification
            title="Scan erfolgreich"
            message="Ihr QR-Code wurde erfolgreich gescannt."
            type="success"
          />
        )}

        {/* Kamera-Komponente zum Scannen des QR-Codes */}
        {!showNotification && (
          <CameraComponent onScan={handleScan} setError={setError} />
        )}
      </div>
    </div>
  );
};

export default QRCodeScanPage;
