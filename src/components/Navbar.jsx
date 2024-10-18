import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';

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
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
      <div className="text-white text-xl font-semibold">
        <Link to="/">Quincy Check-In</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="text-white bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button
          onClick={toggleLanguage}
          className="text-white bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          {language === 'de' ? 'Switch to English' : 'Wechseln zu Deutsch'}
        </button>
        {!isKioskModeEnabled && (
          <Link to="/admin" className="text-white">
            <Menu size={32} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
