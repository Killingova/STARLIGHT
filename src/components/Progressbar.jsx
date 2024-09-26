// src/components/ProgressBar.jsx

import React, { useContext } from 'react';
import { ProgressBarContext } from '../contexts/ProgressBarContext';

const ProgressBar = () => {
  const { progress } = useContext(ProgressBarContext);

  return (
    <div className="bg-gray-200 w-full h-2 rounded">
      <div
        className="bg-blue-500 h-2 transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
