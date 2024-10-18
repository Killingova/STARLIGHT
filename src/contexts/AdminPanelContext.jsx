// src/contexts/AdminPanelContext.jsx
import React, { createContext, useReducer, useMemo } from 'react';
import { TOGGLE_KIOSK_MODE, TOGGLE_MODULE } from './actionTypes';

// Der initiale Zustand des AdminPanels
const initialState = {
  isKioskModeEnabled: false, // Kiosk-Modus ist standardmäßig deaktiviert
  selectedModules: {
    qrCodeScan: true,        // QR-Code-Scan ist standardmäßig aktiviert
    eGKVerification: true,   // eGK-Verifizierung ist standardmäßig aktiviert
    anamneseForm: true,      // Anamnese-Formular ist standardmäßig aktiviert
    contactInfoForm: false,  // Kontaktinformations-Formular ist standardmäßig deaktiviert
  },
};

// Reducer zur Verarbeitung von Aktionen für den AdminPanel-Zustand
function adminPanelReducer(state, action) {
  switch (action.type) {
    case TOGGLE_KIOSK_MODE:
      return {
        ...state,
        isKioskModeEnabled: !state.isKioskModeEnabled,
      };

    case TOGGLE_MODULE:
      return {
        ...state,
        selectedModules: {
          ...state.selectedModules,
          [action.module]: !state.selectedModules[action.module], // Umschalten des Moduls
        },
      };

    default:
      return state;
  }
}

// AdminPanel-Kontext erstellen
export const AdminPanelContext = createContext();

// AdminPanelProvider-Komponente zum Bereitstellen des Kontexts
export function AdminPanelProvider({ children }) {
  // Verwende useReducer, um den Zustand und Dispatch bereitzustellen
  const [state, dispatch] = useReducer(adminPanelReducer, initialState);

  // Verwende useMemo, um den Kontextwert zu optimieren und unnötige Re-Renders zu verhindern
  const contextValue = useMemo(() => ({
    state,
    dispatch,
  }), [state, dispatch]);

  // Provider-Komponente zurückgeben
  return (
    <AdminPanelContext.Provider value={contextValue}>
      {children}
    </AdminPanelContext.Provider>
  );
}
