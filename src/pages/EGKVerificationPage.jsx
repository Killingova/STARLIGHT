// src/pages/EGKVerificationPage.jsx

import React, { useState, useContext } from 'react';
import CardReaderComponent from '../components/CardReaderComponent'; // Component for reading eGK
import Notification from '../components/Notification'; // Notification component
import ProgressBar from '../components/Progressbar'; // Progress bar component
import { ProgressBarContext } from '../contexts/ProgressBarContext'; // ProgressBar context for progress control

const EGKVerificationPage = () => {
  const [cardData, setCardData] = useState(null); // State for eGK data
  const [showNotification, setShowNotification] = useState(false); // Control for notification display
  const { setCurrentStep } = useContext(ProgressBarContext); // Access to ProgressBar context

  // Callback function called when eGK is successfully read
  const handleCardRead = (data) => {
    setCardData(data);
    setShowNotification(true);
    setCurrentStep(3); // Update progress (e.g., step "Verification completed")
    console.log('eGK Data:', data); // Debugging or further processing of eGK data
  };

  // Automatically hide the notification after a certain time
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000); // 5 second delay
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div>
      {/* Title */}
      <h2>eGK Verification</h2>

      {/* Progress Bar */}
      <ProgressBar />

      {/* eGK Reader Component */}
      <CardReaderComponent onCardRead={handleCardRead} />

      {/* Notification when card is successfully read */}
      {showNotification && cardData && (
        <div>
          <Notification
            title="eGK Successfully Read"
            message={`Card Data: ${JSON.stringify(cardData)}`}
          />
        </div>
      )}
    </div>
  );
};

export default EGKVerificationPage;