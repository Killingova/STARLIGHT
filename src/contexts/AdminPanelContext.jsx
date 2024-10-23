import React, { createContext, useReducer, useMemo } from 'react';

const initialState = {
    isKioskModeEnabled: false,
    selectedModules: {
        qrCodeScan: true,
        eGKVerification: true,
        anamneseForm: true,
        contactInfoForm: false,
    },
};

export default function adminPanelReducer(state, action) {
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
}

export const AdminPanelContext = createContext(initialState);

export function AdminPanelProvider({ children }) {
    const [state, dispatch] = useReducer(adminPanelReducer, initialState);

    const contextValue = useMemo(() => ({
        state,
        dispatch,
    }), [state, dispatch]);

    return (
        <AdminPanelContext.Provider value={contextValue}>
            {children}
        </AdminPanelContext.Provider>
    );
}
