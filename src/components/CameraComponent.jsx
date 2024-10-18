import React, { useRef, useState, useCallback } from 'react';
import { useCamera } from '../hooks/useCamera';

function CameraComponent({ onScan, children }) {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState(null);

  // Kamera starten und stoppen, entnommen aus dem useCamera Hook
  const { startCamera, stopCamera } = useCamera({ videoRef, onScan, setError });

  // Kamera-Start-Funktion
  const handleStartCamera = useCallback(() => {
    setCameraActive(true);
    startCamera();
  }, [startCamera]);

  // Kamera-Stop-Funktion
  const handleStopCamera = useCallback(() => {
    setCameraActive(false);
    stopCamera();
  }, [stopCamera]);

  return (
    <>
      <div className="camera-container w-full max-w-lg">
        <video
          ref={videoRef}
          className="camera-feed w-full h-auto border border-gray-300 rounded-md shadow-md"
          autoPlay
          playsInline
          muted
        />
        {error ? (
          <p className="text-center mt-2 text-red-500">
            Fehler beim Starten der Kamera: {error.message}
          </p>
        ) : (
          <p className="text-center mt-2 text-gray-500">
            Bitte positionieren Sie den QR-Code innerhalb des Rahmens, um den Scanvorgang zu starten.
          </p>
        )}

        <div className="text-center mt-4">
          {!cameraActive ? (
            <button
              onClick={handleStartCamera}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Kamera starten
            </button>
          ) : (
            <button
              onClick={handleStopCamera}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Kamera stoppen
            </button>
          )}
        </div>

        {/* Hier können children zwischen den Buttons verwendet werden */}
        {children}
      </div>
    </>
  );
}

export default React.memo(CameraComponent);
