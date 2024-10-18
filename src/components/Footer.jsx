import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      © {currentYear} Quincy Check-In. Alle Rechte vorbehalten.
    </footer>
  );
};

export default Footer;
