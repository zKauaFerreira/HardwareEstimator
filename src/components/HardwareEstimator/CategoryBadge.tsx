import React from 'react';
import { HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CategoryBadgeProps {
  category: string;
  onClick?: () => void;
  isActive?: boolean;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  category, 
  onClick,
  isActive = false 
}) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
        isActive 
          ? "bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white border border-indigo-500/50 hover:from-indigo-700/40 hover:to-purple-700/40 shadow-lg shadow-indigo-500/20" 
          : "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-slate-200 border border-indigo-500/30 hover:from-indigo-700/30 hover:to-purple-700/30 shadow-lg shadow-indigo-500/10"
      )}
      onClick={onClick}
    >
      <span>{category}</span>
      <HelpCircle className="w-3 h-3" />
    </div>
  );
};

export default CategoryBadge;