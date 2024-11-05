import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

// Schritte des Check-in-Prozesses als konstante Daten
const stepsData = [
  { id: 'start', name: 'Start', percentage: 10, icon: 'StartIcon' },
  { id: 'qrScan', name: 'QR-Code Scan', percentage: 25, icon: 'QrCode' },
  { id: 'egkRead', name: 'eGK Lesen', percentage: 40, icon: 'CreditCard' },
  { id: 'anamnesis', name: 'Anamnese', percentage: 60, icon: 'ClipboardList' },
  { id: 'contactInfo', name: 'Kontaktinformationen', percentage: 75, icon: 'UserCheck' },
  { id: 'complete', name: 'Fertig', percentage: 100, icon: 'CheckCircle' },
];

// ProgressBar-Kontext erstellen
export const ProgressBarContext = createContext();

export function ProgressBarProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem('progress');
    return savedProgress ? parseInt(savedProgress, 10) : 0;
  });

  const [steps] = useState(stepsData);

  const updateProgress = useCallback((stepId) => {
    const step = steps.find((s) => s.id === stepId);
    if (step && step.percentage !== progress) {
      setProgress(step.percentage);
    }
  }, [steps, progress]);

  const resetProgress = useCallback(() => {
    setProgress(0);
  }, []);

  useEffect(() => {
    localStorage.setItem('progress', progress);
  }, [progress]);

  const contextValue = useMemo(() => ({
    progress,
    steps,
    updateProgress,
    resetProgress,
  }), [progress, steps, updateProgress, resetProgress]);

  return (
    <ProgressBarContext.Provider value={contextValue}>
      {children}
    </ProgressBarContext.Provider>
  );
}
