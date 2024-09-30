// src/hooks/useFullscreen.jsx
import { useEffect } from 'react';

const useFullscreen = (ref) => {
  // Funktion, um den Vollbildmodus anzufordern
  const requestFullscreen = () => {
    if (ref.current) {
      if (ref.current.requestFullscreen) {
        ref.current.requestFullscreen();
      } else if (ref.current.mozRequestFullScreen) {
        ref.current.mozRequestFullScreen();
      } else if (ref.current.webkitRequestFullscreen) {
        ref.current.webkitRequestFullscreen();
      } else if (ref.current.msRequestFullscreen) {
        ref.current.msRequestFullscreen();
      }
    }
  };

  // Funktion, um den Vollbildmodus zu verlassen
  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    // Aufräumarbeiten, wenn der Komponent abgebaut wird
    return () => {
      exitFullscreen();
    };
  }, []);

  return { requestFullscreen };
};

export default useFullscreen;
