import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      © {currentYear} Quincy Check-In. Alle Rechte vorbehalten.
    </footer>
  );
};

export default Footer;
