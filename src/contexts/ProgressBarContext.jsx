// src/contexts/ProgressBarContext.jsx
import React, { createContext, useState, useCallback, useMemo } from 'react';

// Erstellen des ProgressBarContext
export const ProgressBarContext = createContext();

// Provider-Komponente für den ProgressBarContext
export function ProgressBarProvider({ children }) {
  // Zustand für den Fortschritt und die Schritte der Progress-Bar
  const [progress, setProgress] = useState(0);
  const [steps] = useState([
    { id: 'qrScan', name: 'QR-Code Scan', percentage: 25 },
    { id: 'egkRead', name: 'eGK Lesen', percentage: 50 },
    { id: 'anamnesis', name: 'Anamnese', percentage: 75 },
    { id: 'complete', name: 'Fertig', percentage: 100 },
  ]);

  // Funktion zum Aktualisieren des Fortschritts basierend auf dem Schritt
  const updateProgress = useCallback((stepId) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      setProgress(step.percentage);
    }
  }, [steps]);

  // Funktion zum Zurücksetzen des Fortschritts
  const resetProgress = useCallback(() => {
    setProgress(0);
  }, []);

  // Memoisieren des Kontextwerts für Performance-Optimierung
  const contextValue = useMemo(() => ({
    progress,
    steps,
    updateProgress,
    resetProgress,
  }), [progress, steps, updateProgress, resetProgress]);

  // Rückgabe des Providers mit dem Kontextwert und den Kindern
  return (
    <ProgressBarContext.Provider value={contextValue}>
      {children}
    </ProgressBarContext.Provider>
  );
}
