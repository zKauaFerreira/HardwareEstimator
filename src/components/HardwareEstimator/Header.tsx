import React from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/card';

const Header: React.FC = () => {
  return (
    <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-2xl mb-8">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between pb-6">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <CardTitle className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Questionário de Estimativa de Hardware
          </CardTitle>
          <p className="text-slate-400 mt-2 text-lg">
            Responda as perguntas e gere automaticamente a planilha Excel
          </p>
        </div>
        <Calculator className="w-12 h-12 text-indigo-400" />
      </CardHeader>
    </Card>
  );
};

export default Header;