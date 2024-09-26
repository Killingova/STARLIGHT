// src/contexts/AdminPanelContext.jsx

import React, { createContext, useReducer } from 'react';
import { TOGGLE_KIOSK_MODE, TOGGLE_MODULE } from './actionTypes'; // Importiere die Aktionstypen

// Definiere den initialen Zustand des Admin-Panels
const initialState = {
  isKioskModeEnabled: false, // Kiosk-Modus initial deaktiviert
  selectedModules: {
    qrCodeScan: true, // QR-Code-Scan-Modul aktiviert
    eGKVerification: true, // eGK-Verifikations-Modul aktiviert
    anamneseForm: true, // Standardmäßig aktiviertes Anamneseformular
    contactInfoForm: false, // Kann optional aktiviert werden
  },
};

// Erstelle den Kontext für das Admin-Panel
export const AdminPanelContext = createContext(initialState);

// Definiere den Reducer zur Verwaltung der Zustandsänderungen
const adminPanelReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_KIOSK_MODE: // Umschalten des Kiosk-Modus
      return { ...state, isKioskModeEnabled: !state.isKioskModeEnabled };
    case TOGGLE_MODULE: // Umschalten eines bestimmten Moduls
      return {
        ...state,
        selectedModules: {
          ...state.selectedModules,
          [action.module]: !state.selectedModules[action.module],
        },
      };
    default:
      return state; // Gib den aktuellen Zustand zurück, wenn keine passenden Aktionen gefunden wurden
  }
};

// Definiere den Provider, der den Zustand des Admin-Panels bereitstellt
export const AdminPanelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminPanelReducer, initialState);

  return (
    <AdminPanelContext.Provider value={{ state, dispatch }}>
      {children} {/* Übergibt die Kinderkomponenten, die den Kontext verwenden */}
    </AdminPanelContext.Provider>
  );
};
