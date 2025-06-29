
import React from 'react';
import { cn } from '@/lib/utils';

interface ClaroCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const ClaroCard: React.FC<ClaroCardProps> = ({
  children,
  className,
  hover = true,
  gradient = false,
}) => {
  return (
    <div
      className={cn(
        'claro-card animate-fade-in',
        hover && 'claro-hover-scale',
        gradient && 'bg-claro-gradient',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ClaroCard;
