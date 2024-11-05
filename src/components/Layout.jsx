import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ProgressBar from './ProgressBar';

// Haupt-Layout-Komponente
const Layout = () => (
  <>
    <Navbar />
    <ProgressBar />
    <main>
      <Outlet /> {/* Hier wird der Hauptinhalt der Seiten gerendert */}
    </main>
    <Footer />
  </>
);

export default Layout;
