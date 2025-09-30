import React from 'react';
import { cn } from '../../utils/cn';

interface ResourceCardProps {
  title: string;
  value: number;
  gradient: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, value, gradient }) => {
  // Format the value based on the title
  let displayValue = value.toString();
  let unit = '';
  
  if (title.includes('Disco')) {
    if (value >= 1024 * 1024) { // Mais de 1 PB
      displayValue = (value / (1024 * 1024)).toFixed(2);
      unit = 'PB';
    } else if (value >= 1024) { // Mais de 1 TB
      displayValue = (value / 1024).toFixed(1);
      unit = 'TB';
    } else {
      displayValue = value.toString();
      unit = 'GB';
    }
  } else if (title.includes('RAM')) {
    if (value >= 1024 * 1024) { // Mais de 1 PB
      displayValue = (value / (1024 * 1024)).toFixed(2);
      unit = 'PB';
    } else if (value >= 1024) { // Mais de 1 TB
      displayValue = (value / 1024).toFixed(1);
      unit = 'TB';
    } else {
      displayValue = value.toString();
      unit = 'GB';
    }
  } else if (title.includes('CPU')) {
    unit = 'core' + (value > 1 ? 's' : '');
  }

  return (
    <div className={cn(
      "rounded-lg p-3 text-white backdrop-blur-sm border border-slate-600/50 shadow-lg",
      "bg-gradient-to-br",
      gradient
    )}>
      <div className="text-xs opacity-90 mb-1 text-center">{title}</div>
      <div className="text-lg font-bold text-center">
        {displayValue} {unit}
      </div>
    </div>
  );
};

export default ResourceCard;