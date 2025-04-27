import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <g>
           
            <path
              d="M50 10 L60 35 L85 35 L65 50 L75 75 L50 60 L25 75 L35 50 L15 35 L40 35 Z"
              fill="#22c55e"
              stroke="#155e75"
              strokeWidth="2"
            />
            <path
              d="M50 20 L55 35 L70 35 L60 45 L65 60 L50 50 L35 60 L40 45 L30 35 L45 35 Z"
              fill="#3b82f6"
              stroke="#155e75"
              strokeWidth="1"
            />
            <circle cx="50" cy="50" r="8" fill="#f59e0b" />
          </g>
        </svg>
      </div>
      <div className="ml-2 font-bold text-xl text-gray-800">REMACTO</div>
    </div>
  );
};

export default Logo;