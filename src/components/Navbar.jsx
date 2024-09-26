import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Für die Navigation
import { Menu } from 'lucide-react'; // Icon für das Burger-Menü
import { AdminPanelContext } from '../contexts/AdminPanelContext'; // Import des AdminPanel-Kontexts

// Hauptkomponente der Navigationsleiste
const Navbar = () => {
  // Zugriff auf `isKioskModeEnabled` aus dem AdminPanel-Kontext
  const { isKioskModeEnabled } = useContext(AdminPanelContext);

  return (
    <nav className="bg-[#002D5F] flex justify-end p-4">
      {/* Bedingte Anzeige des Burger-Menüs */}
      {/* Wird nur angezeigt, wenn der Kiosk-Modus deaktiviert ist */}
      {!isKioskModeEnabled && (
        <Link to="/admin">
          <BurgerMenu /> {/* Burger-Menü wird hier eingebunden */}
        </Link>
      )}
    </nav>
  );
};

// Komponente für das Burger-Menü
const BurgerMenu = () => (
  <div className="cursor-pointer">
    {/* Lucide Menu-Icon mit weißer Farbe und Größe 32px */}
    <Menu size={32} color="white" />
  </div>
);

export default Navbar;
