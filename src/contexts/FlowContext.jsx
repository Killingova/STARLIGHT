import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Erstellen des Flow-Kontextes
export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [isKioskModeActive, setIsKioskModeActive] = useState(() => {
    const savedValue = localStorage.getItem('isKioskModeActive');
    return savedValue !== null ? JSON.parse(savedValue) : false;
  });
  const [startPosition, setStartPosition] = useState(() => {
    const savedValue = localStorage.getItem('startPosition');
    return savedValue !== null ? JSON.parse(savedValue) : '/start';
  });
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(() => {
    const savedValue = localStorage.getItem('isDeviceRegistered');
    return savedValue !== null ? JSON.parse(savedValue) : false;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedValue = localStorage.getItem('isAuthenticated');
    return savedValue !== null ? JSON.parse(savedValue) : false;
  });
  const [flowState, setFlowState] = useState(() => {
    const savedValue = localStorage.getItem('flowState');
    return savedValue !== null ? JSON.parse(savedValue) : { currentStep: 0 };
  });

  const navigate = useNavigate();

  // Speichern von Zustandswerten im LocalStorage
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    saveToLocalStorage('isKioskModeActive', isKioskModeActive);
  }, [isKioskModeActive]);

  useEffect(() => {
    saveToLocalStorage('startPosition', startPosition);
  }, [startPosition]);

  useEffect(() => {
    saveToLocalStorage('isDeviceRegistered', isDeviceRegistered);
  }, [isDeviceRegistered]);

  useEffect(() => {
    saveToLocalStorage('flowState', flowState);
  }, [flowState]);

  useEffect(() => {
    saveToLocalStorage('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  // Authentifizierungs- und Logout-Funktionen
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const updateFlow = (newState) => {
    setFlowState((prev) => ({ ...prev, ...newState }));
  };

  const contextValue = useMemo(
    () => ({
      isKioskModeActive,
      setIsKioskModeActive,
      startPosition,
      setStartPosition,
      isDeviceRegistered,
      setIsDeviceRegistered,
      isAuthenticated,
      login,
      logout,
      flowState,
      updateFlow,
    }),
    [
      isKioskModeActive,
      startPosition,
      isDeviceRegistered,
      isAuthenticated,
      flowState,
    ]
  );

  return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
};
