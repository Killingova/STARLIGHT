import React, { createContext, useReducer } from 'react';

export const AdminPanelContext = createContext();

const initialState = {
  isKioskModeEnabled: false,
  selectedModules: {
    qrCodeScan: true,
    eGKVerification: true,
    anamneseForm: true,
    contactInfoForm: false,
  },
};

const adminPanelReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_KIOSK_MODE':
      return { ...state, isKioskModeEnabled: !state.isKioskModeEnabled };
    case 'TOGGLE_MODULE':
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

export const AdminPanelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminPanelReducer, initialState);

  return (
    <AdminPanelContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminPanelContext.Provider>
  );
};
