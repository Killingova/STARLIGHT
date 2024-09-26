// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminPanelProvider } from './contexts/AdminPanelContext';
import ProgressBarProvider from './contexts/ProgressBarContext';

// Importiere alle Komponenten
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
  return (
    <AdminPanelProvider>
      <ProgressBarProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
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
            </main>
            <Footer />
          </div>
        </Router>
      </ProgressBarProvider>
    </AdminPanelProvider>
  );
}

export default App;
