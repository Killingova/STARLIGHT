import React from 'react';

function Notification({ title, message, icon: Icon, iconColor = 'blue', actionButton, children }) {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-auto border border-gray-200">
        
        {/* Header-Bereich mit Titel und optionalem Icon */}
        <div className="flex items-center mb-4">
          {Icon && (
            <Icon
              className={`w-8 h-8 mr-4 text-${iconColor}-500`}
              aria-hidden="true"
            />
          )}
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        {/* Nachrichtentext */}
        <div className="mt-2 text-gray-700 text-base">
          {message}
        </div>

        {/* Kinder-Komponenten für zusätzliche Inhalte */}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}

        {/* Action-Button (optional) */}
        {actionButton && (
          <div className="mt-6 flex justify-center">
            {actionButton}
          </div>
        )}
      </div>
    </>
  );
}

export default Notification;
