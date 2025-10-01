import React from 'react';
import { X, Calculator } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ResourceEstimates } from '../../utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ResourceCard from './ResourceCard';

interface EstimationModalProps {
  resources: ResourceEstimates;
  isVisible: boolean;
  onClose: () => void;
}

const EstimationModal: React.FC<EstimationModalProps> = ({ resources, isVisible, onClose }) => {
  if (!isVisible) return null;

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

      {/* Modal content */}
      <div
        className={cn(
          "relative bg-transparent transform transition-all duration-300 ease-in-out max-w-md w-full",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <div className="flex items-center">
              <Calculator className="w-6 h-6 text-indigo-400 mr-3" />
              <CardTitle className="text-xl">
                Estimativa Calculada
              </CardTitle>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResourceCard
                title="CPU (cores)"
                value={resources.cpu}
                gradient="from-blue-500/20 to-blue-600/20"
              />
              <ResourceCard
                title="RAM (GB)"
                value={resources.ram}
                gradient="from-purple-500/20 to-purple-600/20"
              />
              <ResourceCard
                title="Disco (GB)"
                value={resources.disk}
                gradient="from-indigo-500/20 to-indigo-600/20"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EstimationModal;