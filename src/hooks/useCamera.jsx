// src/hooks/useCamera.js

import { useCallback, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

export function useCamera({ videoRef, onScan, setError }) {
  const codeReaderRef = useRef(null);

  // Funktion zum Starten der Kamera
  const startCamera = useCallback(async () => {
    try {
      if (codeReaderRef.current) {
        // Falls bereits ein Reader vorhanden ist, nichts tun
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      videoRef.current.srcObject = stream;

      codeReaderRef.current = new BrowserMultiFormatReader();

      await codeReaderRef.current.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, error) => {
          if (result) {
            onScan(result.text);
          }
          if (error && !(error instanceof NotFoundException)) {
            console.error('Scan-Fehler:', error);
            setError(error);
          }
        }
      );
    } catch (err) {
      console.error('Fehler beim Starten der Kamera:', err);
      setError(err);
    }
  }, [videoRef, onScan, setError]);

  // Funktion zum Stoppen der Kamera
  const stopCamera = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }

    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [videoRef]);

  // Aufräumen beim Unmounten der Komponente
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return { startCamera, stopCamera };
}
