import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { ProgressBarContext } from '../contexts/ProgressBarContext';
import ContentWrapper from '../components/ContentWrapper';

const EGKVerificationPage = () => {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const { setCurrentStep } = useContext(ProgressBarContext);
  const navigate = useNavigate();

  const handleCardRead = (data) => {
    console.log('handleCardRead aufgerufen mit:', data); // Debugging
    if (!data) {
      setError('eGK-Daten konnten nicht gelesen werden.');
      return;
    }
    setCardData(data);
    setShowNotification(true);
    setCurrentStep(3);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleSkip = () => {
    console.log('handleSkip aufgerufen'); // Debugging
    setCurrentStep(3);
    navigate('/forms');
  };

  useEffect(() => {
    console.log('Komponente neu gerendert');
  }, []);

  return (
    <ContentWrapper>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        eGK-Verifizierung
      </h2>

      {error && (
        <Notification
          title="Fehler"
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}

      {showNotification && cardData && (
        <Notification
          title="Erfolg"
          message={`eGK-Daten erfolgreich gelesen: ${JSON.stringify(cardData)}`}
          type="success"
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="w-full bg-gray-100 p-4 rounded-lg mt-6 mb-4">
        <p className="text-gray-600 text-center">eGK-Lesegerät wird hier simuliert.</p>
        <button
          onClick={() => handleCardRead({ name: 'Max Mustermann', insurance: 'AOK' })}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg text-lg font-semibold"
        >
          eGK-Daten simulieren
        </button>
      </div>

      <button
        onClick={handleSkip}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg text-lg mt-4"
      >
        Weiter zu den Formularen
      </button>
    </ContentWrapper>
  );
};

export default EGKVerificationPage;
