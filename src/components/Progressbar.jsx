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
    resetProgress(); // Setzt den Fortschritt zurück
    navigate('/'); // Navigiert zur StartPage
  };

  return (
    <div className="bg-white shadow-lg py-4 px-6 rounded-lg flex flex-col items-center w-full">
      {/* Fortschrittsbalken und Navigation */}
      <div className="flex items-center justify-between w-full mb-4">
        <img src="/src/assets/u7T.png" alt="Logo" className="w-12 h-12" />
        <div className="flex-grow mx-4">
          <div className="relative bg-gray-200 rounded-full h-3">
            <div
              className="absolute bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="text-blue-500 hover:text-blue-700 transition-all flex items-center"
        >
          <RotateCcw size={24} />
          <span className="ml-2 hidden sm:inline text-sm font-semibold">Neu starten</span>
        </button>
      </div>

      {/* Schritte mit Symbolen und Beschriftungen */}
      <div className="flex justify-between items-center w-full">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center w-full relative">
            {/* Icon und Fortschrittsstatus */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-4 transition-colors ${
                progress >= step.percentage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 text-gray-400 border-gray-300'
              }`}
            >
              {getIcon(step.icon)}
            </div>
            {/* Schrittname */}
            <span
              className={`mt-2 text-xs text-center ${
                progress >= step.percentage ? 'text-blue-600 font-semibold' : 'text-gray-500'
              }`}
            >
              {step.name}
            </span>
            {/* Verbindungslinie */}
            {index < steps.length - 1 && (
              <div
                className={`absolute h-1 top-6 left-full w-full ${
                  progress >= steps[index + 1].percentage ? 'bg-blue-500' : 'bg-gray-300'
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
