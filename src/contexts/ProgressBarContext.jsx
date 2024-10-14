// src/contexts/ProgressBarContext.jsx
import React, { createContext, useState, useCallback, useMemo } from 'react';

export const ProgressBarContext = createContext();

export const ProgressBarProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [steps] = useState([
    { id: 'qrScan', name: 'QR-Code Scan', percentage: 25 },
    { id: 'egkRead', name: 'eGK Lesen', percentage: 50 },
    { id: 'anamnesis', name: 'Anamnese', percentage: 75 },
    { id: 'complete', name: 'Fertig', percentage: 100 },
  ]);

  const updateProgress = useCallback((stepId) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      setProgress(step.percentage);
    }
  }, [steps]);

  const resetProgress = useCallback(() => {
    setProgress(0);
  }, []);

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
};
