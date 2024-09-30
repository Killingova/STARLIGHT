// src/components/AdminPanel.jsx

import React, { useContext, useEffect } from 'react';
import { AdminPanelContext } from '../contexts/AdminPanelContext'; // Import des AdminPanel-Kontexts
import { ProgressBarContext } from '../contexts/ProgressBarContext'; // Import des ProgressBar-Kontexts
import KioskButton from './KioskButton'; // Importiere den Kiosk-Modus-Button
import { TOGGLE_KIOSK_MODE, TOGGLE_MODULE } from '../contexts/actionTypes'; // Importiere die Aktionstypen

// Hauptkomponente für das Admin-Panel
const AdminPanel = () => {
  const { state, dispatch } = useContext(AdminPanelContext); // Zugriff auf den Admin-Panel-Zustand
  const { setActiveSteps } = useContext(ProgressBarContext); // Zugriff auf Progressbar-Kontext

  // Effekt: Aktualisiere die aktiven Schritte des Check-In-Prozesses, wenn sich die Module ändern
  useEffect(() => {
    const activeSteps = Object.keys(state.selectedModules).filter(mod => state.selectedModules[mod]);
    setActiveSteps(activeSteps);
  }, [state.selectedModules, setActiveSteps]);

  // Umschalten des Kiosk-Modus
  const handleKioskModeChange = () => {
    dispatch({ type: TOGGLE_KIOSK_MODE });
  };

  // Umschalten der aktivierten Module
  const handleModuleChange = (module) => {
    dispatch({ type: TOGGLE_MODULE, module });
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Kiosk-Modus Einstellung */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={state.isKioskModeEnabled}
            onChange={handleKioskModeChange}
          />
          <span className="ml-2 text-gray-700">Kiosk-Modus aktivieren</span>
        </label>
      </div>

      {/* Kiosk-Modus Button */}
      <div className="mb-4">
        <KioskButton />
      </div>

      {/* Aktive Module */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Aktive Module</h2>
      <div className="space-y-4">
        {Object.keys(state.selectedModules).map((module) => (
          <div key={module}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={state.selectedModules[module]}
                onChange={() => handleModuleChange(module)}
              />
              <span className="ml-2 text-gray-700 capitalize">
                {module.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
