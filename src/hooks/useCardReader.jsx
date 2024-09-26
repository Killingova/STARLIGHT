// src/hooks/useCardReader.jsx

import { useState, useEffect } from 'react';

// Simuliert den Prozess des Einlesens der eGK-Daten
const useCardReader = () => {
  const [isReading, setIsReading] = useState(false);
  const [cardData, setCardData] = useState(null);

  // Funktion zum Starten des Einlesens der Karte
  const readCard = () => {
    setIsReading(true);
    // Simuliert das Einlesen der eGK-Daten
    setTimeout(() => {
      // Beispiel-Daten der eGK
      const fakeCardData = {
        cardNumber: '1234567890',
        patientName: 'Max Mustermann',
        insurance: 'Sample Health Insurance',
      };
      setCardData(fakeCardData);
      setIsReading(false);
    }, 2000); // Simulierte Verzögerung von 2 Sekunden
  };

  return { isReading, cardData, readCard };
};

export default useCardReader;
