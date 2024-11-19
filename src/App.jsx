// src/App.jsx

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
import QRCodeScanPage from './pages/QRCodeScanPage';
import EGKVerificationPage from './pages/EGKVerificationPage';
import FormPage from './pages/FormPage';
import ProcessCompletePage from './pages/ProcessCompletePage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <FlowProvider>
      <ProgressBarProvider>
        <AdminPanelProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Öffentliche Seiten */}
              <Route index element={<StartPage />} />
              <Route path="admin-login" element={<AdminAuthPage />} />
              <Route path="device-not-registered" element={<DeviceNotRegisteredPage />} />

              {/* Check-in Prozess */}
              <Route path="qr-code-scan" element={<QRCodeScanPage />} />
              <Route path="egk-verification" element={<EGKVerificationPage />} />
              <Route path="form" element={<FormPage />} />
              <Route path="process-complete" element={<ProcessCompletePage />} />

              {/* Geschützte Admin-Routen */}
              <Route
                path="admin"
                element={
                  <PrivateRoute>
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
