import React from 'react';
import { Card, CardContent } from '../ui/card';

interface ExplanationCardProps {
  category: string;
  text: string;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ category, text }) => {
  return (
    <Card className="bg-indigo-50">
      <CardContent className="p-3">
        <h3 className="font-semibold text-indigo-900 mb-1">{category}</h3>
        <p className="text-sm text-gray-700">{text}</p>
      </CardContent>
    </Card>
  );
};

export default ExplanationCard;