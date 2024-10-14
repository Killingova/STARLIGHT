// src/hooks/useAdminPanel.jsx/vereinfacht den Zugriff auf den AdminPanel-Kontext.
import { useContext } from 'react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';

const useAdminPanel = () => {
  const { state, dispatch } = useContext(AdminPanelContext);

  const toggleKioskMode = () => dispatch({ type: 'TOGGLE_KIOSK_MODE' });
  const toggleModule = (module) => dispatch({ type: 'TOGGLE_MODULE', module });

  return {
    state,
    toggleKioskMode,
    toggleModule,
  };
};

export default useAdminPanel;
