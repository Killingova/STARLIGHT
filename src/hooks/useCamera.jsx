import { useCallback, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

export function useCamera({ videoRef, onScan, setError }) {
  // Referenz für den Barcode-Reader
  const codeReaderRef = useRef(null);

  // Effekt, der beim Mounten und Unmounten der Komponente ausgeführt wird
  useEffect(() => {
    console.log('useCamera-Effekt wird ausgeführt');
    return () => {
      console.log('useCamera-Effekt wird bereinigt');
      // Barcode-Reader zurücksetzen, wenn die Komponente unmountet wird
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  // Funktion zum Starten der Kamera
  const startCamera = useCallback(async () => {
    console.log('Kamera wird gestartet...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      console.log('Kamerastream erhalten');
      // Video-Element mit dem Kamerastream verbinden
      videoRef.current.srcObject = stream;

      // Initialisierung des Barcode-Readers, falls noch nicht geschehen
      if (!codeReaderRef.current) {
        console.log('BrowserMultiFormatReader wird initialisiert');
        codeReaderRef.current = new BrowserMultiFormatReader();
      }

      // Starten des Decodierens vom Videogerät
      console.log('Decodierung vom Videogerät wird gestartet');
      codeReaderRef.current.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          console.log('Scan-Ergebnis:', result.text);
          onScan(result.text); // Ergebnis des Scans weitergeben
        }
        if (error && !(error instanceof NotFoundException)) {
          // Bei anderen Fehlern als "Not Found"
          console.error('Scan-Fehler:', error);
          setError(error); // Fehler weitergeben
        }
      });

      console.log('Kamera erfolgreich gestartet');
    } catch (err) {
      console.error('Fehler beim Starten der Kamera:', err);
      setError(err); // Fehler weitergeben
    }
  }, [videoRef, onScan, setError]);

  // Funktion zum Stoppen der Kamera
  const stopCamera = useCallback(() => {
    console.log('Kamera wird gestoppt...');
    const stream = videoRef.current?.srcObject;
    if (stream) {
      console.log('Alle Tracks werden gestoppt');
      stream.getTracks().forEach(track => track.stop());
    }
    if (codeReaderRef.current) {
      console.log('Barcode-Reader wird zurückgesetzt');
      codeReaderRef.current.reset();
    }
    console.log('Kamera gestoppt');
  }, [videoRef]);

  return { startCamera, stopCamera };
}
