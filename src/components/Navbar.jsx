import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, Home, Lock, Unlock } from 'lucide-react';
import { FlowContext } from '../contexts/FlowContext';

const Navbar = () => {
  const { isKioskModeActive, isAuthenticated, logout } = useContext(FlowContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
      {/* Logo und Startseiten-Link */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-white text-xl font-semibold flex items-center space-x-1">
          <Home size={24} />
          <span>Quincy Check-In</span>
        </Link>
      </div>

      {/* Dynamische Navigationslinks */}
      <div className="flex items-center space-x-4">
        {/* Kiosk-Modus-Anzeige */}
        <div className="text-sm text-white mr-4">
          {isKioskModeActive ? (
            <span className="flex items-center">
              <Lock size={18} className="mr-1" /> Kiosk-Modus aktiv
            </span>
          ) : (
            <span className="flex items-center">
              <Unlock size={18} className="mr-1" /> Admin-Modus
            </span>
          )}
        </div>

        {/* Admin-Link nur im Admin-Modus */}
        {!isKioskModeActive && (
          <Link to="/admin" className="text-white flex items-center">
            <Menu size={28} className="mr-1" />
            <span>Admin</span>
          </Link>
        )}

        {/* Authentifizierte Ansicht: Logout-Button */}
        {isAuthenticated && (
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="text-white flex items-center hover:text-gray-300 transition-colors"
          >
            <LogOut size={24} className="mr-1" />
            <span>Abmelden</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
