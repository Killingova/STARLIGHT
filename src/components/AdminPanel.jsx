import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminPanel from '../hooks/useAdminPanel';

function AdminPanel() {
    const { state, toggleKioskMode, toggleModule } = useAdminPanel();
    const navigate = useNavigate();

    const saveSettings = useCallback(() => {
        const settings = {
            isKioskModeEnabled: state.isKioskModeEnabled,
            selectedModules: state.selectedModules,
        };
        localStorage.setItem('adminPanelSettings', JSON.stringify(settings));
        console.log('Einstellungen erfolgreich gespeichert:', settings);
        alert('Einstellungen erfolgreich gespeichert!');
        navigate('/');
    }, [state, navigate]);

    const handleToggleKioskMode = () => {
        toggleKioskMode();
        console.log('Kiosk-Modus umgeschaltet:', state.isKioskModeEnabled);
    };

    const handleToggleModule = (module) => {
        toggleModule(module);
        console.log(`Modul umgeschaltet: ${module}`);
    };

    useEffect(() => {
        console.log('Aktueller AdminPanel Zustand:', state);
    }, [state]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-bold mb-4 text-center">Admin Panel</h2>

                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={state.isKioskModeEnabled}
                            onChange={handleToggleKioskMode}
                            className="mr-2"
                        />
                        <span className="text-lg">Kiosk-Modus aktivieren</span>
                    </label>
                </div>

                <h3 className="text-xl font-semibold mb-4">Module</h3>
                {Object.keys(state.selectedModules).map((module) => (
                    <label key={module} className="block mb-2">
                        <input
                            type="checkbox"
                            checked={state.selectedModules[module]}
                            onChange={() => handleToggleModule(module)}
                            className="mr-2"
                        />
                        <span className="capitalize">{module}</span>
                    </label>
                ))}

                <button
                    onClick={saveSettings}
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-6 hover:bg-blue-700 transition-colors duration-300"
                >
                    Einstellungen speichern
                </button>
            </div>
        </div>
    );
}

export default AdminPanel;
