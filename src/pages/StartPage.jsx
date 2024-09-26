import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Verwende useNavigate statt useHistory
import Notification from '../components/Notification'; // Import der Notification-Komponente
import { ProgressBarContext } from '../contexts/ProgressBarContext'; // Import des ProgressBar-Kontexts
import { AdminPanelContext } from '../contexts/AdminPanelContext'; // Import des AdminPanel-Kontexts

const StartPage = () => {
  // Zugriff auf den Zustand des AdminPanel-Kontexts (optional, falls benötigt)
  const { isKioskModeEnabled } = useContext(AdminPanelContext);

  // Zugriff auf den Zustand und Funktionen des ProgressBar-Kontexts
  const { setCurrentStep } = useContext(ProgressBarContext);

  // Verwendung von useNavigate für die Navigation
  const navigate = useNavigate();

  // Funktion zum Starten des Registrierungsprozesses
  const handleStart = () => {
    // Setzen des aktuellen Schritts in der ProgressBar auf Schritt 2 (QR-Code-Scan)
    setCurrentStep(2);

    // Navigieren zur QR-Code-Scan-Seite
    navigate('/qr-code-scan');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-hintergrund">
      {/* Notification-Komponente */}
      <Notification
        title="Willkommen"
        message="Bitte starten Sie den Check-In-Prozess."
        iconColor="blue"
        actionButton={
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600"
          >
            QR-Code scannen
          </button>
        }
      />
    </div>
  );
};

export default StartPage;
