// src/hooks/useProgressBar.jsx
import { useContext } from 'react';
import { ProgressBarContext } from '../contexts/ProgressBarContext';

const useProgressBar = () => {
  const { progress, steps, updateProgress, resetProgress } = useContext(ProgressBarContext);

  return { progress, steps, updateProgress, resetProgress };
};

export default useProgressBar;
