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

// Layout component using React.Fragment and Children
const Layout = ({ children }) => (
  <div>
    <Navbar />
    <div>
      <Progressbar />
      <main>{children}</main>
    </div>
    <Footer />
  </div>
);

// Main App component using all providers for state and context management
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