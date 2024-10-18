import { useCallback } from 'react';

// Custom Hook für den Vollbildmodus
const useFullscreen = (element) => {
  const requestFullscreen = useCallback(() => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  }, [element]);

  return { requestFullscreen };
};

export default useFullscreen;
