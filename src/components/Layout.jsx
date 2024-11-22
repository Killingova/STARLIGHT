import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ProgressBar from './ProgressBar';

const Layout = () => (
  <div
    className="grid grid-rows-layout h-screen w-screen"
    style={{
      overflow: 'hidden', // Deaktiviert Scrollen
    }}
  >
    {/* Navbar (oberer Bereich) */}
    <div className="row-span-1">
      <Navbar />
    </div>

    {/* ProgressBar (unter der Navbar) */}
    <div className="row-span-1">
      <ProgressBar />
    </div>

    {/* Hauptinhalt (zentral) */}
    <div className="row-span-5 flex justify-center items-center">
      <div
        className="bg-white w-full max-w-[90%] h-full max-h-[90%] rounded-lg shadow-md flex items-center justify-center"
        style={{
          aspectRatio: '16/9', // Fixiert das Seitenverhältnis des Inhalts
        }}
      >
        <Outlet /> {/* Dynamischer Seiteninhalt */}
      </div>
    </div>

    {/* Footer (unterer Bereich) */}
    <div className="row-span-1">
      <Footer />
    </div>
  </div>
);

export default Layout;
