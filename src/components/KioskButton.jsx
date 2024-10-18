import React from 'react';
import useFullscreen from '../hooks/useFullscreen';

const KioskButton = () => {
  // Verwende das ganze Dokument, um den Vollbildmodus für die gesamte Seite zu aktivieren
  const { requestFullscreen } = useFullscreen(document.documentElement);

  const handleKioskMode = () => {
    requestFullscreen(); // Aktiviere den Vollbildmodus für das gesamte Fenster
    // Weitere Einstellungen für den Kiosk-Modus (falls benötigt)
  };

  return (
    <button onClick={handleKioskMode} className="bg-blue-600 text-white p-2 rounded">
      Kiosk-Modus aktivieren
    </button>
  );
};

export default KioskButton;
