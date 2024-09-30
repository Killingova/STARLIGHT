// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminPanelProvider } from './contexts/AdminPanelContext';
import  ProgressBarProvider  from './contexts/ProgressBarContext';

// Importiere alle Komponenten
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Progressbar from './components/Progressbar';
import StartPage from './pages/StartPage';
import QRCodeScanPage from './pages/QRCodeScanPage';
import EGKVerificationPage from './pages/EGKVerificationPage';
import FormPage from './pages/FormPage';
import ProcessCompletePage from './pages/ProcessCompletePage';
import AdminPanel from './components/AdminPanel';
import AdminAuthPage from './pages/AdminAuthPage';
import PrivateRoute from './components/PrivateRoute';
import ErrorPage from './pages/ErrorPage';

function App() {

  useEffect(() => {
    // Hier kannst du die initialen Einstellungen der Praxis aus dem Local Storage laden
    const settings = localStorage.getItem('praxisSettings');
    if (!settings) {
      // Initiale Einstellungen setzen, falls keine vorhanden sind
      localStorage.setItem('praxisSettings', JSON.stringify({ /* Standard-Einstellungen */ }));
    }
  }, []);

  return (
    <AdminPanelProvider>
      <ProgressBarProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            {/* Navbar für die globale Navigation */}
            <Navbar />
            
            {/* Progressbar wird global in der App angezeigt */}
            <Progressbar />
            
            {/* Hauptinhalt */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/qr-code-scan" element={<QRCodeScanPage />} />
                <Route path="/egk-verification" element={<EGKVerificationPage />} />
                <Route path="/form" element={<FormPage />} />
                <Route path="/complete" element={<ProcessCompletePage />} />
                
                {/* Admin-Bereich */}
                <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
                <Route path="/admin-login" element={<AdminAuthPage />} />
                
                {/* Fallback für nicht definierte Routen */}
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>

            {/* Footer für globale Informationen */}
            <Footer />
          </div>
        </Router>
      </ProgressBarProvider>
    </AdminPanelProvider>
  );
}

export default App;
