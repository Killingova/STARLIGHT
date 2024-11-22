import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, Home, Lock, Unlock } from 'lucide-react';
import { FlowContext } from '../contexts/FlowContext';

const Navbar = () => {
  const { isKioskModeActive, isAuthenticated, logout } = useContext(FlowContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
      {/* Logo und Startseiten-Link */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="w-6 h-6" />
          <span className="text-lg font-semibold">Quincy Check-In</span>
        </Link>
      </div>

      {/* Dynamische Navigationslinks */}
      <div className="flex items-center space-x-6">
        {/* Kiosk-Modus-Anzeige */}
        <div className="text-sm flex items-center space-x-2">
          {isKioskModeActive ? (
            <span className="flex items-center space-x-1">
              <Lock className="w-5 h-5" />
              <span>Kiosk-Modus aktiv</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1">
              <Unlock className="w-5 h-5" />
              <span>Admin-Modus</span>
            </span>
          )}
        </div>

        {/* Admin-Link nur im Admin-Modus */}
        {!isKioskModeActive && (
          <Link to="/admin" className="flex items-center space-x-2">
            <Menu className="w-6 h-6" />
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
            className="flex items-center space-x-2"
          >
            <LogOut className="w-6 h-6" />
            <span>Abmelden</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
