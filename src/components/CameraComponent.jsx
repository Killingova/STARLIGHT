// src/components/CameraComponent.jsx

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useCamera } from '../hooks/useCamera';

function CameraComponent({ onScan, setError }) {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { startCamera, stopCamera } = useCamera({
    videoRef,
    onScan: (data) => onScan(data, stopCamera), // Übergibt stopCamera an onScan
    setError,
  });

  // Startet die Kamera beim Laden der Komponente
  useEffect(() => {
    handleStartCamera();

    // Kamera stoppen beim Verlassen der Komponente
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Funktion zum Starten der Kamera
  const handleStartCamera = useCallback(() => {
    if (!cameraActive) {
      setCameraActive(true);
      startCamera();
    }
  }, [cameraActive, startCamera]);

  // Funktion zum Stoppen der Kamera
  const handleStopCamera = useCallback(() => {
    if (cameraActive) {
      setCameraActive(false);
      stopCamera();
    }
  }, [cameraActive, stopCamera]);

  // Überprüft, ob das Video bereits abgespielt wird
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handlePlaying = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      videoElement.addEventListener('playing', handlePlaying);
      videoElement.addEventListener('pause', handlePause);

      return () => {
        videoElement.removeEventListener('playing', handlePlaying);
        videoElement.removeEventListener('pause', handlePause);
      };
    }
  }, []);

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
        <p className="text-center mt-2 text-gray-500">
          Bitte positionieren Sie den QR-Code innerhalb des Rahmens, um den Scanvorgang zu starten.
        </p>

        {/* Kamera-Steuerungsbuttons */}
        <div className="text-center mt-4">
          {cameraActive ? (
            <button
              onClick={handleStopCamera}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Kamera stoppen
            </button>
          ) : (
            <button
              onClick={handleStartCamera}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Kamera starten
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(CameraComponent);
