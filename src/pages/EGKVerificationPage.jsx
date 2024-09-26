// src/pages/EGKVerificationPage.jsx

import React, { useState, useContext } from 'react';
import CardReaderComponent from '../components/CardReaderComponent'; // Komponente für das Einlesen der eGK
import Notification from '../components/Notification'; // Benachrichtigungs-Komponente
import ProgressBar from '../components/Progressbar'; // Fortschrittsbalken-Komponente
import { ProgressBarContext } from '../contexts/ProgressBarContext'; // ProgressBar-Kontext für die Fortschrittskontrolle

const EGKVerificationPage = () => {
  const [cardData, setCardData] = useState(null); // Zustand für die Daten der eGK
  const [showNotification, setShowNotification] = useState(false); // Kontrolle für Benachrichtigungsanzeige
  const { setCurrentStep } = useContext(ProgressBarContext); // Zugriff auf den ProgressBar-Kontext

  // Callback-Funktion, die aufgerufen wird, wenn die eGK erfolgreich eingelesen wird
  const handleCardRead = (data) => {
    setCardData(data);
    setShowNotification(true);
    setCurrentStep(3); // Fortschritt aktualisieren (z.B. Schritt "Verifizierung abgeschlossen")
    console.log('eGK Daten:', data); // Debugging oder Weiterverarbeitung der eGK-Daten
  };

  // Automatisches Ausblenden der Benachrichtigung nach einer bestimmten Zeit
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000); // 5 Sekunden Verzögerung
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="egk-verification-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Überschrift */}
      <h2 className="text-center text-2xl font-bold mb-6">eGK Verifikation</h2>

      {/* Fortschrittsleiste */}
      <div className="w-full max-w-md mb-6">
        <ProgressBar />
      </div>

      {/* eGK-Lesegerät-Komponente */}
      <div className="w-full max-w-md">
        <CardReaderComponent onCardRead={handleCardRead} />
      </div>

      {/* Benachrichtigung bei erfolgreichem Einlesen der Karte */}
      {showNotification && cardData && (
        <div className="mt-6">
          <Notification
            title="eGK erfolgreich eingelesen"
            message={`Kartendaten: ${JSON.stringify(cardData)}`}
            iconColor="green" // Erfolgsfarbe
          />
        </div>
      )}
    </div>
  );
};

export default EGKVerificationPage;
