import { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminPanelProvider } from './contexts/AdminPanelContext';
import { ProgressBarProvider } from './contexts/ProgressBarContext';

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
  // Local Storage Check (Memoization für Performance-Optimierung)
  useEffect(() => {
    const checkInitialSettings = () => {
      try {
        const settings = localStorage.getItem('praxisSettings');
        if (!settings) {
          const initialSettings = {
            theme: 'light',
            language: 'de',
          };
          localStorage.setItem('praxisSettings', JSON.stringify(initialSettings));
        }
      } catch (error) {
        console.error("App: Fehler beim Laden der Praxis-Einstellungen:", error);
      }
    };
    checkInitialSettings();
  }, []);

  // Memoisiere den Haupt-Layout-Code für Performance-Verbesserung
  const Layout = useMemo(() => (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Progressbar />
      <main className="flex-grow">
        <Routes>
          {/* Haupt-Routen für den Patienten-Check-In-Prozess */}
          <Route path="/" element={<StartPage />} />
          <Route path="/qr-code-scan" element={<QRCodeScanPage />} />
          <Route path="/egk-verification" element={<EGKVerificationPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/complete" element={<ProcessCompletePage />} />

          {/* Admin-Routen mit Privatsphärenschutz */}
          <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/admin-login" element={<AdminAuthPage />} />

          {/* Fallback-Route für ungültige Pfade */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  ), []); // Leeres Array, da das Layout immer gleich bleibt

  return (
    <ProgressBarProvider>
      <AdminPanelProvider>
        <Router>
          {Layout}
        </Router>
      </AdminPanelProvider>
    </ProgressBarProvider>
  );
}

export default App;
