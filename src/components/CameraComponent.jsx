import React, { useEffect, useRef } from 'react';
import { useCamera } from '../hooks/useCamera';

const CameraComponent = ({ onScan }) => {
  // Referenz für das Video-Element
  const videoRef = useRef(null);

  // Hook für Kameraaktivitäten
  const { startCamera, stopCamera } = useCamera(videoRef, onScan);

  // Startet die Kamera, wenn die Komponente gemountet wird, und stoppt sie bei Unmount
  useEffect(() => {
    // Kamera wird gestartet
    startCamera();

    // Stoppt die Kamera, wenn die Komponente unmountet wird
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  return (
    <div className="camera-container w-full max-w-lg">
      {/* Das Video-Element zeigt den Kamera-Feed */}
      <video
        ref={videoRef}
        className="camera-feed w-full h-auto border border-gray-300 rounded-md shadow-md"
        autoPlay
        playsInline
        muted
      />
      <p className="text-center mt-2 text-gray-500">
        Bitte positionieren Sie den QR-Code innerhalb des Rahmens, um den Scanvorgang zu starten.
      </p>
    </div>
  );
};

export default CameraComponent;
