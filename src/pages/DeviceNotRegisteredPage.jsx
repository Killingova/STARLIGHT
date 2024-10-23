// src/pages/DeviceNotRegisteredPage.jsx

import React from 'react';

const DeviceNotRegisteredPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Gerät nicht registriert</h1>
      <p className="text-lg text-center">
        Dieses Gerät ist nicht registriert oder der Kiosk-Modus ist nicht aktiv.
        Bitte wenden Sie sich an das Praxispersonal.
      </p>
    </div>
  );
};

export default DeviceNotRegisteredPage;
