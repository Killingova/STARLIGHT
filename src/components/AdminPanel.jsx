import React, { useContext, useEffect } from 'react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';
import { ProgressBarContext } from '../contexts/ProgressBarContext';

const AdminPanel = () => {
  const { state } = useContext(AdminPanelContext);
  const { setActiveSteps } = useContext(ProgressBarContext);

  useEffect(() => {
    if (state && state.selectedModules) {
      const activeSteps = Object.keys(state.selectedModules).filter(
        (mod) => state.selectedModules[mod]
      );
      if (setActiveSteps) {
        setActiveSteps(activeSteps);
      } else {
        console.error('setActiveSteps ist nicht verfügbar');
      }
    }
  }, [state.selectedModules, setActiveSteps]);

  return (
    <div>
      {/* AdminPanel UI */}
    </div>
  );
};

export default AdminPanel;
