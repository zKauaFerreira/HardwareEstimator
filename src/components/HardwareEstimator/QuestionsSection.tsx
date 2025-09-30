import React from 'react';
import QuestionCard from './QuestionCard';
import { questionsData } from '../../data/questionsData';
import { AnswerState } from '../../utils/types';

interface QuestionsSectionProps {
  answers: AnswerState;
  handleAnswerChange: (questionId: string, value: string) => void;
  handleCategoryClick: (explanation: {
    category: string;
    text: string;
    example?: string;
  }) => void;
  questionCardRef: React.RefObject<HTMLDivElement>;
}

const QuestionsSection: React.FC<QuestionsSectionProps> = ({ 
  answers, 
  handleAnswerChange, 
  handleCategoryClick,
  questionCardRef
}) => {
  return (
    <div ref={questionCardRef}>
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
    </div>
  );
};

export default QuestionsSection;