// src/components/Notification.jsx

import React, { useEffect } from 'react';

function Notification({ title, message, type, onClose, duration = 5000 }) {
  // Bestimmen der Farben basierend auf dem Nachrichtentyp
  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const borderColor = type === 'error' ? 'border-red-400' : 'border-green-400';
  const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';

  // Automatisches Schließen der Benachrichtigung nach der angegebenen Dauer
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={`border ${borderColor} ${bgColor} px-4 py-3 rounded relative mb-4`}
      role="alert"
    >
      <strong className="font-bold">{title}</strong>
      <span className="block sm:inline ml-2">{message}</span>
      {onClose && (
        <span
          className={`${textColor} absolute top-0 bottom-0 right-0 px-4 py-3`}
          onClick={onClose}
        >
          <svg
            className="fill-current h-6 w-6"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Schließen</title>
            <path d="M14.348 5.652a1 1 0 0 0-1.414 0L10 8.586 7.066 5.652a1 1 0 1 0-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 1 0 1.414 1.414L10 11.414l2.934 2.934a1 1 0 1 0 1.414-1.414L11.414 10l2.934-2.934a1 1 0 0 0 0-1.414z" />
          </svg>
        </span>
      )}
    </div>
  );
}

export default React.memo(Notification);
