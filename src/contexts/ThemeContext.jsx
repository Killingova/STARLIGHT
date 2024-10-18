// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useMemo, useEffect } from 'react';

// Erstelle den ThemeContext
export const ThemeContext = createContext();

// Provider-Komponente für das Theme
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Standardmäßig helles Theme

  // Lade das gespeicherte Theme aus dem Local Storage, wenn die Komponente geladen wird
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme); // Setze das gespeicherte Theme, falls vorhanden
    }
  }, []);

  // Speichere das aktuelle Theme im Local Storage, wenn sich das Theme ändert
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Definiere den Kontextwert, um unnötige Neuberechnungen zu vermeiden
  const contextValue = useMemo(() => ({
    theme,       // Der aktuelle Theme-Status (z.B. 'light' oder 'dark')
    toggleTheme: () => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light'), // Funktion zum Wechseln des Themes
  }), [theme]);

  // Rückgabe des ThemeContext-Providers mit den Kindern
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
