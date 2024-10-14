import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamisches Jahr

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      © {currentYear} Deine Firma. Alle Rechte vorbehalten.
    </footer>
  );
};

export default Footer;
