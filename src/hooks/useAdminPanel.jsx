// src/hooks/useAdminPanel.jsx
import { useContext } from 'react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';
import { TOGGLE_KIOSK_MODE, TOGGLE_MODULE } from '../contexts/actionTypes';

const useAdminPanel = () => {
  const { state, dispatch } = useContext(AdminPanelContext);

  const toggleKioskMode = () => {
    console.log('Toggling Kiosk Mode');
    dispatch({ type: TOGGLE_KIOSK_MODE });
  };

  const toggleModule = (module) => {
    console.log(`Toggling module: ${module}`);
    dispatch({ type: TOGGLE_MODULE, module });
  };

  console.log('Current state:', state);

  return {
    state,
    toggleKioskMode,
    toggleModule,
  };
};

export default useAdminPanel;
