// src/components/ContentWrapper.jsx
import React from 'react';

const ContentWrapper = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-[90%] max-w-[1280px] h-[80%] rounded-lg shadow-lg flex flex-col items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
};

export default ContentWrapper;
