// src/contexts/AdminPanelContext.jsx
import React, { createContext, useReducer, useMemo } from 'react';
import { TOGGLE_KIOSK_MODE, TOGGLE_MODULE } from './actionTypes';

// Der initiale Zustand des AdminPanels
const initialState = {
  isKioskModeEnabled: false, // Zustand, ob der Kiosk-Modus aktiviert ist
  selectedModules: {
    qrCodeScan: true,        // QR-Code-Scan-Modul ist standardmäßig aktiviert
    eGKVerification: true,   // eGK-Verifizierung-Modul ist standardmäßig aktiviert
    anamneseForm: true,      // Anamnese-Formular-Modul ist standardmäßig aktiviert
    contactInfoForm: false,  // Kontaktinformations-Formular-Modul ist standardmäßig deaktiviert
  },
};

// Reducer-Funktion, um den Zustand basierend auf den Aktionen zu aktualisieren
const adminPanelReducer = (state, action) => {
  switch (action.type) {
    // Umschalten des Kiosk-Modus
    case TOGGLE_KIOSK_MODE:
      return {
        ...state,
        isKioskModeEnabled: !state.isKioskModeEnabled,
      };
    
    // Umschalten der Module
    case TOGGLE_MODULE:
      return {
        ...state,
        selectedModules: {
          ...state.selectedModules,
          [action.module]: !state.selectedModules[action.module], // Umschalten des spezifischen Moduls
        },
      };
    
    // Rückgabe des aktuellen Zustands, wenn keine passende Aktion vorliegt
    default:
      return state;
  }
};

// Erstellen des AdminPanel-Kontextes
export const AdminPanelContext = createContext();

// Provider-Komponente für den AdminPanel-Kontext
export function AdminPanelProvider({ children }) {
  // Verwenden von useReducer für das Zustandsmanagement
  const [state, dispatch] = useReducer(adminPanelReducer, initialState);

  // Memoisieren des Kontextwerts, um unnötige Re-Renders zu vermeiden
  const contextValue = useMemo(() => ({
    state,        // Der aktuelle Zustand des AdminPanels
    dispatch,     // Funktion zum Dispatchen von Aktionen an den Reducer
  }), [state, dispatch]);

  // Rückgabe des Kontext-Providers mit dem memoisierten Wert und den Kindern
  return (
    <AdminPanelContext.Provider value={contextValue}>
      {children}
    </AdminPanelContext.Provider>
  );
}
