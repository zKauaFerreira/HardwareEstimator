import React from 'react';
import { Explanation } from '../../utils/types';

interface ExplanationSidebarProps {
  explanations: Explanation[];
  onCategoryClick: (explanation: Explanation) => void;
}

const ExplanationSidebar: React.FC<ExplanationSidebarProps> = ({ 
  explanations, 
  onCategoryClick
}) => {
  return (
    <div className="space-y-4 overflow-y-auto">
      {explanations.map((explanation, index) => (
        <div 
          key={index}
          className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
          onClick={() => onCategoryClick(explanation)}
        >
          <h3 className="font-semibold text-indigo-300 mb-2">{explanation.category}</h3>
          <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{explanation.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ExplanationSidebar;