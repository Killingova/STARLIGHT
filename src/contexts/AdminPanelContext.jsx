import React, { createContext, useReducer, useMemo } from 'react';

// Aktionstypen für Reducer-Logik
export const TOGGLE_MODULE = 'TOGGLE_MODULE';

// Initialer Zustand des Admin Panels
const initialState = {
  selectedModules: {
    qrCodeScan: true,
    eGKVerification: true,
    anamneseForm: true,
    contactInfoForm: false,
  },
};

// Reducer zur Steuerung des Moduls
function adminPanelReducer(state, action) {
  switch (action.type) {
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
}

// AdminPanel-Kontext
export const AdminPanelContext = createContext();

export function AdminPanelProvider({ children }) {
  const [state, dispatch] = useReducer(adminPanelReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AdminPanelContext.Provider value={contextValue}>
      {children}
    </AdminPanelContext.Provider>
  );
}
