// src/hooks/useCamera.jsx
import { useCallback, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export const useCamera = (videoRef, onScan) => {
  const codeReaderRef = useRef(null);

  // Initialisiert und startet den QR-Code-Reader
  const startCamera = useCallback(async () => {
    // Prüfen, ob der `codeReader` bereits initialisiert wurde
    if (!codeReaderRef.current) {
      codeReaderRef.current = new BrowserMultiFormatReader();
    }
    try {
      // Kamera-Feed starten und QR-Code kontinuierlich scannen
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;

      codeReaderRef.current.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          // Ergebnis an die übergebene Callback-Funktion weitergeben
          onScan(result.text);
        }
        if (error) {
          console.error('Scan-Fehler:', error);
        }
      });
    } catch (err) {
      console.error('Kamera konnte nicht gestartet werden:', err);
    }
  }, [videoRef, onScan]);

  // Stoppt die Kamera und den Scanner
  const stopCamera = useCallback(() => {
    // Kamera-Stream stoppen
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    // QR-Code-Reader zurücksetzen
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
  }, [videoRef]);

  // Reinigung bei Komponentenauslagerung
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return { startCamera, stopCamera };
};
