import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ExplanationModalProps {
  explanation: { category: string; text: string; example?: string } | null;
  isVisible: boolean;
  onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ explanation, isVisible, onClose }) => {
  if (!explanation || !isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content - Two separate rounded modals side by side */}
      <div 
        className={cn(
          "relative flex bg-transparent transform transition-all duration-300 ease-in-out max-w-4xl w-full max-h-[80vh] overflow-hidden gap-1",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Left modal - Main explanation */}
        <div className="flex-1 bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700/50 shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-6 pb-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{explanation.category}</h2>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            <p className="text-slate-300 leading-relaxed">{explanation.text}</p>
          </div>
        </div>
        
        {/* Right modal - Example */}
        {explanation.example && (
          <div className="flex-1 bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700/50 shadow-2xl rounded-2xl overflow-hidden">
            <div className="p-6 pb-3 flex justify-between items-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Exemplo</h3>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <p className="text-slate-300 leading-relaxed">{explanation.example}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplanationModal;