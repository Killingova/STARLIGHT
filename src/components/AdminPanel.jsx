import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminPanel from '../hooks/useAdminPanel';

function AdminPanel() {
  const { state, toggleKioskMode, toggleModule } = useAdminPanel();
  const navigate = useNavigate();

  // Überwacht den Zustand des Admin-Panels und gibt ihn bei Änderungen aus
  useEffect(() => {
    console.log('Aktueller AdminPanel Zustand:', state);
  }, [state]);

  // Speichert die Einstellungen und navigiert zur Startseite
  const saveSettings = useCallback(() => {
    console.log('Einstellungen speichern...');
    const settings = {
      isKioskModeEnabled: state.isKioskModeEnabled,
      selectedModules: state.selectedModules,
    };
    localStorage.setItem('adminPanelSettings', JSON.stringify(settings));
    console.log('Einstellungen erfolgreich gespeichert:', settings);
    alert('Einstellungen erfolgreich gespeichert!');
    navigate('/');
  }, [state, navigate]);

  // Handler für das Umschalten des Kiosk-Modus
  const handleToggleKioskMode = useCallback(() => {
    toggleKioskMode();
    console.log('Kiosk-Modus umgeschaltet:', state.isKioskModeEnabled);
  }, [toggleKioskMode, state.isKioskModeEnabled]);

  // Handler für das Umschalten der Module
  const handleToggleModule = useCallback((module) => {
    toggleModule(module);
    console.log(`Modul umgeschaltet: ${module}`);
  }, [toggleModule]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      <label className="mb-4 block">
        <input 
          type="checkbox" 
          checked={state.isKioskModeEnabled} 
          onChange={handleToggleKioskMode} 
        />
        <span className="ml-2">Kiosk-Modus aktivieren</span>
      </label>
      <h3 className="text-xl mb-4">Module</h3>
      {Object.keys(state.selectedModules).map((module) => (
        <label key={module} className="block mb-2">
          <input 
            type="checkbox" 
            checked={state.selectedModules[module]} 
            onChange={() => handleToggleModule(module)} 
          />
          <span className="ml-2 capitalize">{module}</span>
        </label>
      ))}
      <button 
        onClick={saveSettings} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Einstellungen speichern
      </button>
    </div>
  );
}

export default AdminPanel;
