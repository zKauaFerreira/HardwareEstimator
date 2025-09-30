import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Select } from '../ui/select';
import { cn } from '../../utils/cn';
import { Question } from '../../utils/types';
import CategoryBadge from './CategoryBadge';

interface QuestionCardProps {
  question: Question;
  answer: string;
  onChange: (value: string) => void;
  onCategoryClick?: () => void;
  questionNumber: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  answer, 
  onChange,
  onCategoryClick,
  questionNumber
}) => {
  return (
    <Card className={cn(
        "border-l-4 transition-all duration-200 hover:shadow-xl bg-slate-900/80 border-indigo-500/50 backdrop-blur-sm",
        "hover:bg-slate-900/90"
      )}>
      <CardContent className="p-5 pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm">
              {questionNumber}
            </span>
            <CategoryBadge 
              category={question.category} 
              onClick={onCategoryClick}
            />
          </div>
        </div>
        <p className="text-slate-100 font-medium mb-4 text-lg">{question.question}</p>
        <Select
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-700/50 border-slate-600/50 text-slate-100"
        >
          <option value="" className="bg-slate-800 text-slate-300">
            Selecione uma opção...
          </option>
          {question.options.map((option) => (
            <option 
              key={option} 
              value={option}
              className="bg-slate-800 text-slate-300"
            >
              {option}
            </option>
          ))}
        </Select>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;