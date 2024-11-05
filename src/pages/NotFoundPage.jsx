// src/pages/NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Seite nicht gefunden</h1>
      <p className="text-lg text-gray-700 mb-6">
        Die angeforderte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default NotFoundPage;
