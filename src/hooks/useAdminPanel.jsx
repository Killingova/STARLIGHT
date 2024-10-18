// src/hooks/useAdminPanel.jsx
import { useContext, useCallback } from 'react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';
import { TOGGLE_KIOSK_MODE, TOGGLE_MODULE } from '../contexts/actionTypes';

// Custom Hook für den Zugriff auf den AdminPanel-Kontext
const useAdminPanel = () => {
  // Holen des Zustands und der Dispatch-Funktion aus dem Kontext
  const { state, dispatch } = useContext(AdminPanelContext);

  // Funktion zum Umschalten des Kiosk-Modus
  const toggleKioskMode = useCallback(() => {
    console.log('Toggling Kiosk Mode');
    dispatch({ type: TOGGLE_KIOSK_MODE });
  }, [dispatch]);

  // Funktion zum Umschalten eines bestimmten Moduls
  const toggleModule = useCallback((module) => {
    console.log(`Toggling module: ${module}`);
    dispatch({ type: TOGGLE_MODULE, module });
  }, [dispatch]);

  // Ausgabe des aktuellen Zustands zur Debugging-Zwecken
  console.log('Current state:', state);

  // Rückgabe des Zustands und der Umschaltfunktionen für die Verwendung in Komponenten
  return {
    state,           // Der aktuelle Zustand des AdminPanels
    toggleKioskMode, // Funktion zum Umschalten des Kiosk-Modus
    toggleModule,    // Funktion zum Umschalten der Module
  };
};

export default useAdminPanel;
