import React, { createContext, useState, useEffect, useMemo } from 'react';

// Erstellen des LanguageContext
export const LanguageContext = createContext();

// LanguageProvider-Komponente
export const LanguageProvider = ({ children }) => {
  // Destructuring der useState Hook zur Verwaltung der Sprache
  const [language, setLanguage] = useState('de');

  // Effekt zum Laden der Sprache aus dem Local Storage beim Mounten
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Effekt zum Speichern der Sprache im Local Storage bei Änderung
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Memoization des Kontextwertes, um unnötige Re-Renders zu vermeiden
  const contextValue = useMemo(() => ({ language, setLanguage }), [language]);

  // Rückgabe des LanguageContext-Providers
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
