// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';

// Hauptkomponente der Navigationsleiste
const Navbar = () => {
  const { isKioskModeEnabled } = useContext(AdminPanelContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'de' ? 'en' : 'de'));
  };

  return (
    <nav className={`bg-${theme === 'light' ? 'white' : 'gray-900'} p-4 flex justify-between`}>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      <button onClick={toggleLanguage}>
        {language === 'de' ? 'Switch to English' : 'Wechseln zu Deutsch'}
      </button>

      {!isKioskModeEnabled && (
        <Link to="/admin">
          <BurgerMenu />
        </Link>
      )}
    </nav>
  );
};

// Komponente für das Burger-Menü
const BurgerMenu = () => (
  <div className="cursor-pointer">
    <Menu size={32} color="black" />
  </div>
);

export default Navbar;
