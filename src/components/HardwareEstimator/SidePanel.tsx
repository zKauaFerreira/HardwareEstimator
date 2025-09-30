import React from 'react';
import { Download, Calculator, CheckCircle, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ResourceEstimates } from '../../utils/types';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ResourceCard from './ResourceCard';

interface SidePanelProps {
  resources: ResourceEstimates;
  allAnswered: boolean;
  answers: Record<string, string>;
  generateCSV: (answers: any, resources: any) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ resources, allAnswered, answers, generateCSV }) => {
  return (
    <div className="space-y-6">
      {/* Estimativa Calculada */}
      <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-2xl">
        <CardHeader className="flex flex-row items-center pb-6">
          <Calculator className="w-6 h-6 text-indigo-400 mr-3" />
          <CardTitle className="text-xl">
            Estimativa Calculada
          </CardTitle>
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

      {/* Download Section */}
      <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <Button
            onClick={() => generateCSV(answers, resources)}
            disabled={!allAnswered}
            className={cn(
              "w-full py-4 rounded-lg font-semibold transition-all duration-300",
              allAnswered
                ? "bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white border border-indigo-500/50 hover:from-indigo-700/40 hover:to-purple-700/40 shadow-lg shadow-indigo-500/20"
                : "bg-slate-800/50 text-slate-500 border border-slate-700/50 cursor-not-allowed"
            )}
          >
            <div className="flex items-center justify-center w-full gap-2">
              <Download className="w-5 h-5" />
              <span>
                {allAnswered
                  ? "Baixar Planilha"
                  : "Responda para baixar"}
              </span>
            </div>
          </Button>
          <p
            className={cn(
              "text-center text-sm mt-3 transition-all duration-300 flex items-center justify-center gap-1",
              allAnswered ? "text-green-400" : "text-amber-400"
            )}
          >
            {allAnswered ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Pronto para download!</span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                <span>
                  Faltam{" "}
                  {Object.values(answers).filter((a) => !a).length}{" "}
                  respostas
                </span>
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidePanel;