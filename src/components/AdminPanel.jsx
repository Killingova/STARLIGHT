// src/components/AdminPanel.jsx
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminPanel from '../hooks/useAdminPanel';

const AdminPanel = () => {
  const { state, toggleKioskMode, toggleModule } = useAdminPanel();
  const navigate = useNavigate();

  // Funktion zum Speichern der Einstellungen im localStorage
  const saveSettings = useCallback(() => {
    try {
      const settingsToSave = {
        isKioskModeEnabled: state.isKioskModeEnabled,
        selectedModules: state.selectedModules,
      };
      localStorage.setItem('adminPanelSettings', JSON.stringify(settingsToSave));
      alert('Einstellungen erfolgreich gespeichert!');
      navigate('/');  // Navigiere zur StartPage nach dem Speichern
    } catch (error) {
      console.error("Fehler beim Speichern der Einstellungen:", error);
      alert('Fehler beim Speichern der Einstellungen.');
    }
  }, [state, navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Panel</h2>

      {/* Kiosk-Modus Umschalten */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={state.isKioskModeEnabled}
            onChange={toggleKioskMode}
          />
          <span className="ml-2">Kiosk-Modus aktivieren</span>
        </label>
      </div>

      {/* Module auswählen */}
      <div className="mb-4">
        <h3 className="text-xl">Module</h3>
        {Object.keys(state.selectedModules).map((module) => (
          <label key={module} className="flex items-center">
            <input
              type="checkbox"
              checked={state.selectedModules[module]}
              onChange={() => toggleModule(module)}
            />
            <span className="ml-2 capitalize">{module.replace(/([A-Z])/g, ' $1').trim()}</span>
          </label>
        ))}
      </div>

      {/* Button zum Speichern der Einstellungen */}
      <div className="mt-6">
        <button
          onClick={saveSettings}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Einstellungen speichern
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
