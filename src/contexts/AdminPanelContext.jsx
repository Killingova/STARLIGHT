// src/contexts/AdminPanelContext.jsx
import React, { createContext, useReducer, useMemo } from 'react';
import { TOGGLE_KIOSK_MODE, TOGGLE_MODULE } from './actionTypes';

// Initialer Zustand für das AdminPanel
const initialState = {
  isKioskModeEnabled: false,
  selectedModules: {
    qrCodeScan: true,
    eGKVerification: true,
    anamneseForm: true,
    contactInfoForm: false,
  },
};

// Reducer-Funktion zur Verarbeitung der Aktionen
const adminPanelReducer = (state, action) => {
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
          [action.module]: !state.selectedModules[action.module],
        },
      };
    default:
      return state;
  }
};

// Erstellen des AdminPanel-Kontextes
export const AdminPanelContext = createContext();

// Provider-Komponente für das AdminPanel
export const AdminPanelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminPanelReducer, initialState);

  // Memoisieren des Kontextwertes für Performance-Optimierung
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AdminPanelContext.Provider value={contextValue}>
      {children}
    </AdminPanelContext.Provider>
  );
};
