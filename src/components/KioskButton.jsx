// src/components/KioskButton.jsx
import React, { useRef } from 'react';
import useFullscreen from '../hooks/useFullscreen';

const KioskButton = () => {
  const containerRef = useRef(null); // Referenz auf das HTML-Element, das in den Vollbildmodus versetzt wird
  const { requestFullscreen } = useFullscreen(containerRef);

  const handleKioskMode = () => {
    requestFullscreen(); // Aktiviere Vollbildmodus
    // Weitere Einstellungen für den Kiosk-Modus (falls benötigt)
  };

  return (
    <div ref={containerRef}>
      <button onClick={handleKioskMode} className="bg-blue-600 text-white p-2 rounded">
        Kiosk-Modus aktivieren
      </button>
    </div>
  );
};

export default KioskButton;
