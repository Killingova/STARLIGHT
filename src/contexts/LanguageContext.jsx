// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useMemo, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('de');

  // Lade Sprache aus dem Local Storage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Speichere Sprache im Local Storage, wenn sie sich ändert
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const contextValue = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
