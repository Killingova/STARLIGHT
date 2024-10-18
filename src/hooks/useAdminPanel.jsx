import { useContext, useCallback } from 'react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';
import { TOGGLE_KIOSK_MODE, TOGGLE_MODULE } from '../contexts/actionTypes';

// Custom Hook für AdminPanel-Kontext
const useAdminPanel = () => {
  // Destructure state und dispatch aus dem AdminPanel-Kontext
  const { state, dispatch } = useContext(AdminPanelContext);

  // Funktion zum Umschalten des Kiosk-Modus, memoisiert mit useCallback
  const toggleKioskMode = useCallback(() => {
    dispatch({ type: TOGGLE_KIOSK_MODE });
    console.log('Kiosk-Modus umgeschaltet:', state.isKioskModeEnabled);
  }, [dispatch, state.isKioskModeEnabled]);

  // Funktion zum Umschalten eines spezifischen Moduls, memoisiert mit useCallback
  const toggleModule = useCallback((module) => {
    dispatch({ type: TOGGLE_MODULE, module });
    console.log(`Modul umgeschaltet: ${module}`);
  }, [dispatch]);

  // Zustand und Funktionen als Rückgabewerte für den Hook
  return {
    state,           // Der aktuelle Zustand des AdminPanels
    toggleKioskMode, // Funktion zum Umschalten des Kiosk-Modus
    toggleModule,    // Funktion zum Umschalten der Module
  };
};

export default useAdminPanel;
