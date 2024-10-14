import React, { useEffect } from 'react';

const VerificationModal = ({ isOpen, onClose, message }) => {
  // Escape-Taste zum Schließen des Modals
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" 
      role="dialog" 
      aria-labelledby="modal-title" 
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 id="modal-title" className="text-2xl font-bold mb-4">Verifizierungsstatus</h2>
        <p id="modal-description" className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
