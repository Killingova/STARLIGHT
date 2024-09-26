// src/components/CardReaderComponent.jsx

import React from 'react';

const CardReaderComponent = ({ onCardRead, isReading }) => {
  return (
    <div className="card-reader-component text-center">
      {/* Button, um das Lesen der Karte manuell zu starten */}
      <button
        onClick={onCardRead}
        disabled={isReading}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isReading ? 'eGK wird gelesen...' : 'eGK einlesen'}
      </button>

      {/* Statusanzeige */}
      {isReading && <p className="text-gray-600 mt-4">Bitte warten, eGK wird eingelesen...</p>}
    </div>
  );
};

export default CardReaderComponent;
