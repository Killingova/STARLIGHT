// src/hooks/useAdminPanel.jsx

import { useContext, useCallback } from 'react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';

// Custom Hook für AdminPanel-Kontext
const useAdminPanel = () => {
  // Destrukturiere state und dispatch aus dem AdminPanel-Kontext
  const { state, dispatch } = useContext(AdminPanelContext);

  // Funktion zum Umschalten eines spezifischen Moduls, memoisiert mit useCallback
  const toggleModule = useCallback(
    (module) => {
      dispatch({ type: 'TOGGLE_MODULE', module });
      console.log(`Modul umgeschaltet: ${module}`);
    },
    [dispatch]
  );

  // Zustand und Funktionen als Rückgabewerte für den Hook
  return {
    selectedModules: state.selectedModules, // Die ausgewählten Module
    toggleModule, // Funktion zum Umschalten der Module
  };
};

export default useAdminPanel;
