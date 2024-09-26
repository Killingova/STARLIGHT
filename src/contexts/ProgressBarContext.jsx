// src/contexts/ProgressBarContext.jsx
import React, { createContext, useState, useCallback, useEffect } from 'react';

// Erstellt den ProgressBar-Kontext
export const ProgressBarContext = createContext();

// Der ProgressBarProvider stellt den Fortschritt des Check-In-Prozesses zur Verfügung
const ProgressBarProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState([
    { id: 'qrScan', name: 'QR-Code Scan', percentage: 25 },
    { id: 'egkRead', name: 'eGK Lesen', percentage: 50 },
    { id: 'anamnesis', name: 'Anamnese', percentage: 100 },
  ]);

  // Lädt die Praxiseinstellungen (Schritte) aus dem Local Storage
  useEffect(() => {
    const storedSteps = localStorage.getItem('activeSteps');
    if (storedSteps) {
      setSteps(JSON.parse(storedSteps));
    }
  }, []);

  // Speichert die aktiven Schritte im Local Storage
  useEffect(() => {
    localStorage.setItem('activeSteps', JSON.stringify(steps));
  }, [steps]);

  const updateProgress = useCallback((stepId) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      setProgress(step.percentage);
      setCurrentStep(steps.indexOf(step) + 1);
    }
  }, [steps]);

  return (
    <ProgressBarContext.Provider value={{ progress, currentStep, steps, updateProgress, setSteps }}>
      {children}
    </ProgressBarContext.Provider>
  );
};

export default ProgressBarProvider;
