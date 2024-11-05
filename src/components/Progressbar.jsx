import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBarContext } from '../contexts/ProgressBarContext';
import { QrCode, CreditCard, ClipboardList, UserCheck, CheckCircle, RotateCcw } from 'lucide-react';

const ProgressBar = () => {
  const { progress, steps, resetProgress } = useContext(ProgressBarContext);
  const navigate = useNavigate();

  // Funktion zum Laden der Icons basierend auf dem Schritt
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'QrCode':
        return <QrCode size={24} />;
      case 'CreditCard':
        return <CreditCard size={24} />;
      case 'ClipboardList':
        return <ClipboardList size={24} />;
      case 'UserCheck':
        return <UserCheck size={24} />;
      case 'CheckCircle':
        return <CheckCircle size={24} />;
      default:
        return <QrCode size={24} />;
    }
  };

  // Funktion, die den Fortschritt zurücksetzt und zur Startseite navigiert
  const handleRefresh = () => {
    resetProgress();  // Setzt den Fortschritt zurück
    navigate('/');    // Navigiert zur StartPage
  };

  return (
    <div className="mb-6">
      {/* Fortschrittsbalken */}
      <div className="flex items-center justify-between mb-4">
        <img src="/src/assets/u7T.png" alt="Logo" className="w-10 h-10" />
        <div className="flex-grow mx-4">
          <div className="bg-gray-300 rounded-full h-2.5 relative">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button
          onClick={handleRefresh} // Nutzt die neue Funktion zum Zurücksetzen und Navigieren
          className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
        >
          <RotateCcw size={24} className="mr-2" />
          <span className="hidden sm:inline">Neu starten</span>
        </button>
      </div>

      {/* Schritte mit Symbolen und Namen */}
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center w-full">
            {/* Icon und Zustand des Schritts */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors ${
                progress >= step.percentage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-400 border-gray-400'
              }`}
            >
              {getIcon(step.icon)}
            </div>
            {/* Schrittname */}
            <span
              className={`text-sm mt-2 ${
                progress >= step.percentage ? 'text-blue-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {step.name}
            </span>
            {/* Verbindungslinie */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-full mx-4 mt-2 ${
                  progress >= steps[index + 1].percentage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
