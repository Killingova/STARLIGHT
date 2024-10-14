// src/components/Progressbar.jsx
import React, { useContext } from 'react';
import { ProgressBarContext } from '../contexts/ProgressBarContext';
import { RotateCcw } from 'lucide-react';

const ProgressBar = () => {
  const { progress, steps, updateProgress } = useContext(ProgressBarContext);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <img src="/src/assets/u7T.png" alt="Logo" className="w-8 h-8" />
        <div className="flex-grow mx-4">
          <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button 
          onClick={() => updateProgress(steps[1].id)} 
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <RotateCcw size={24} className="mr-2 inline-block" />
          Refresh
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <span className={`text-3xl ${progress >= step.percentage ? 'text-blue-600' : 'text-gray-400'}`}>
              {step.name}
            </span>
            <p className={`mt-1 ${progress >= step.percentage ? 'font-bold' : ''}`}>{step.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProgressBar;
