
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className={`animate-spin rounded-full border-b-2 border-claro-accent ${sizeClasses[size]}`}></div>
      {text && (
        <p className="text-gray-400 text-center animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
