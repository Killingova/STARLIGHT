import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminPanelProvider } from './contexts/AdminPanelContext';
import { ProgressBarProvider } from './contexts/ProgressBarContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

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

// Layout-Komponente mit React-Fragment und Verwendung von Children
const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <div className="flex-grow container mx-auto p-4">
      <Progressbar />
      <main className="mt-6">{children}</main>
    </div>
    <Footer />
  </div>
);

// Hauptkomponente App, verwendet alle Provider für Zustand und Kontextmanagement
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressBarProvider>
          <AdminPanelProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<StartPage />} />
                  <Route path="/qr-code-scan" element={<QRCodeScanPage />} />
                  <Route path="/egk-verification" element={<EGKVerificationPage />} />
                  <Route path="/form" element={<FormPage />} />
                  <Route path="/complete" element={<ProcessCompletePage />} />
                  <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
                  <Route path="/admin-login" element={<AdminAuthPage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Layout>
            </Router>
          </AdminPanelProvider>
        </ProgressBarProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
