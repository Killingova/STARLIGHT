import React, { createContext, useState, useCallback } from 'react';

export const ProgressBarContext = createContext();

export const ProgressBarProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState([
    { id: 'qrScan', name: 'QR-Code Scan', percentage: 25 },
    { id: 'egkRead', name: 'eGK Lesen', percentage: 50 },
    { id: 'anamnesis', name: 'Anamnese', percentage: 100 },
  ]);

  const updateProgress = useCallback((stepId) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      setProgress(step.percentage);
    }
  }, [steps]);

  const setActiveSteps = (newSteps) => {
    setSteps(newSteps);
  };

  return (
    <ProgressBarContext.Provider value={{ progress, steps, updateProgress, setActiveSteps }}>
      {children}
    </ProgressBarContext.Provider>
  );
};
