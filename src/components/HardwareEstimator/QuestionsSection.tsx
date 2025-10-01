import React from 'react';
import { Download, CheckCircle, Clock } from 'lucide-react';
import { questionsData } from '../../data/questionsData';
import { AnswerState, ResourceEstimates } from '../../utils/types';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import QuestionCard from './QuestionCard';
import { cn } from '../../utils/cn';

interface QuestionsSectionProps {
  answers: AnswerState;
  handleAnswerChange: (questionId: string, value: string) => void;
  handleCategoryClick: (explanation: {
    category: string;
    text: string;
    example?: string;
  }) => void;
  allAnswered: boolean;
  generateCSV: (answers: any, resources: any) => void;
  resources: ResourceEstimates;
}

const QuestionsSection: React.FC<QuestionsSectionProps> = ({
  answers,
  handleAnswerChange,
  handleCategoryClick,
  allAnswered,
  generateCSV,
  resources,
}) => {
  return (
    <div>
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-2xl p-4">
        <div className="space-y-6">
          {questionsData.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              answer={answers[question.id]}
              onChange={(value) =>
                handleAnswerChange(question.id, value)
              }
              onCategoryClick={() =>
                handleCategoryClick({
                  category: question.category,
                  text:
                    questionsData.explanations.find(
                      (e) => e.category === question.category
                    )?.text || "",
                  example:
                    questionsData.explanations.find(
                      (e) => e.category === question.category
                    )?.example || undefined,
                })
              }
              questionNumber={index + 1}
            />
          ))}
        </div>
      </div>
      <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl rounded-2xl mt-8">
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

export default QuestionsSection;