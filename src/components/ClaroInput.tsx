
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ClaroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  loading?: boolean;
}

const ClaroInput: React.FC<ClaroInputProps> = ({
  label,
  error,
  loading,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            'w-full px-4 py-3 bg-claro-card/50 border border-claro-accent/30 rounded-claro text-white placeholder-gray-400 focus:border-claro-accent focus:ring-2 focus:ring-claro-accent/20 focus:outline-none transition-all duration-300',
            focused && 'border-claro-accent',
            error && 'border-red-500',
            loading && 'animate-pulse',
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-claro-accent"></div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default ClaroInput;
