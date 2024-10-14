// src/hooks/useCamera.js
import { useCallback, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export const useCamera = (videoRef, onScan, setError) => {
  console.log('useCamera hook initialized');

  const codeReaderRef = useRef(null);

  useEffect(() => {
    console.log('useCamera effect running');
    return () => {
      console.log('useCamera effect cleaning up');
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  const startCamera = useCallback(async () => {
    console.log('Starting camera...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      console.log('Camera stream obtained');
      videoRef.current.srcObject = stream;

      if (!codeReaderRef.current) {
        console.log('Initializing BrowserMultiFormatReader');
        codeReaderRef.current = new BrowserMultiFormatReader();
      }

      console.log('Starting decoding from video device');
      codeReaderRef.current.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          console.log('Scan result:', result.text);
          onScan(result.text);
        }
        if (error && error.name !== 'NotFoundException') {
          console.error('Scan error:', error);
          setError(error);
        }
      });

      console.log('Camera started successfully');
    } catch (err) {
      console.error('Error starting camera:', err);
      setError(err);
    }
  }, [videoRef, onScan, setError]);

  const stopCamera = useCallback(() => {
    console.log('Stopping camera...');
    const stream = videoRef.current?.srcObject;
    if (stream) {
      console.log('Stopping all tracks');
      stream.getTracks().forEach(track => track.stop());
    }
    if (codeReaderRef.current) {
      console.log('Resetting code reader');
      codeReaderRef.current.reset();
    }
    console.log('Camera stopped');
  }, [videoRef]);

  return { startCamera, stopCamera };
};
