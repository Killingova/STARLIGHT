import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importiere die Provider für die Kontexte
import { FlowProvider } from './contexts/FlowContext';
import { ProgressBarProvider } from './contexts/ProgressBarContext';
import { AdminPanelProvider } from './contexts/AdminPanelContext';

// Importiere die Layouts und Seiten
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import AdminAuthPage from './pages/AdminAuthPage';
import AdminPanelPage from './pages/AdminPanelPage';
import DeviceNotRegisteredPage from './pages/DeviceNotRegisteredPage';
import PrivateRoute from './components/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage';

// Haupt-App-Komponente
function App() {
  console.log('App-Komponente geladen');

  return (
    <FlowProvider>
      <ProgressBarProvider>
        <AdminPanelProvider>
          {/* Definiert die Haupt-Routenstruktur */}
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Öffentliche Seiten */}
              <Route index element={<StartPage />} />
              <Route path="admin-login" element={<AdminAuthPage />} />
              <Route path="device-not-registered" element={<DeviceNotRegisteredPage />} />

              {/* Geschützte Admin-Routen */}
              <Route
                path="admin"
                element={
                  <PrivateRoute errorMessage="Bitte melden Sie sich an, um auf das Admin-Panel zuzugreifen.">
                    <AdminPanelPage />
                  </PrivateRoute>
                }
              />

              {/* Fehlerseite für ungültige Routen */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AdminPanelProvider>
      </ProgressBarProvider>
    </FlowProvider>
  );
}

export default App;
