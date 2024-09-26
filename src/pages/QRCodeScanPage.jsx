// src/pages/QRCodeScanPage.jsx

import React, { useState, useContext, useEffect } from 'react';
import CameraComponent from '../components/CameraComponent';
import Notification from '../components/Notification';
import ProgressBar from '../components/Progressbar'; // ProgressBar-Komponente importieren
import { ProgressBarContext } from '../contexts/ProgressBarContext';

const QRCodeScanPage = () => {
  const [scanResult, setScanResult] = useState(null); // QR-Code Scan-Ergebnis
  const [showNotification, setShowNotification] = useState(false); // Status für die Benachrichtigung
  
  // Zugriff auf den ProgressBar-Kontext für Fortschrittsaktualisierung
  const { updateProgress } = useContext(ProgressBarContext);

  // Callback-Funktion für das Scannen des QR-Codes
  const handleScan = (qrCodeData) => {
    setScanResult(qrCodeData); // Speichern des Scan-Ergebnisses
    setShowNotification(true); // Benachrichtigung anzeigen
    updateProgress('qrScan'); // Fortschritt aktualisieren auf den QR-Code Scan Schritt

    // Weiterverarbeitung des QR-Codes, z.B. API-Aufruf zur Verifizierung
    console.log('QR-Code Daten:', qrCodeData);
  };

  // Effekt zum automatischen Ausblenden der Benachrichtigung nach 5 Sekunden
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000); // 5 Sekunden Timeout
      return () => clearTimeout(timer); // Timer bereinigen
    }
  }, [showNotification]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">QR-Code scannen</h2>

      {/* ProgressBar-Komponente anzeigen */}
      <ProgressBar />

      {/* Kamera-Komponente zur Erfassung des QR-Codes */}
      <div className="w-full flex flex-col items-center justify-center">
        <CameraComponent onScan={handleScan} />
      </div>

      {/* Benachrichtigungsanzeige bei erfolgreichem Scan */}
      {showNotification && scanResult && (
        <div className="mt-6">
          <Notification
            title="Scan erfolgreich"
            message={`QR-Code Daten: ${scanResult}`}
            iconColor="green" // Erfolgsfarbe für die Benachrichtigung
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeScanPage;
