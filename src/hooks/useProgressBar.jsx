import { useContext, useMemo } from 'react';
import { ProgressBarContext } from '../contexts/ProgressBarContext';

const useProgressBar = () => {
  // Holen des ProgressBarContext
  const context = useContext(ProgressBarContext);

  // Fehlerbehandlung, falls der Hook außerhalb des Providers verwendet wird
  if (!context) {
    throw new Error('useProgressBar must be used within a ProgressBarProvider');
  }

  // Destrukturierung der Werte aus dem Context
  const { progress, steps, updateProgress, resetProgress } = context;

  // Memoisieren der Rückgabewerte, um unnötige Re-Renders zu verhindern
  const memoizedValues = useMemo(() => ({
    progress,
    steps,
    updateProgress,
    resetProgress,
  }), [progress, steps, updateProgress, resetProgress]);

  return memoizedValues;
};

export default useProgressBar;
