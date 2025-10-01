import React, { useState, useEffect } from "react";
import { questionsData } from "../../data/questionsData";
import {
  calculateResources,
  generateCSV,
  getAllAnswered,
} from "../../utils/csvGenerator";
import { AnswerState } from "../../utils/types";
import ExplanationModal from "./ExplanationModal";
import EstimationModal from "./EstimationModal";
import Header from "./Header";
import QuestionsSection from "./QuestionsSection";

const HardwareEstimator: React.FC = () => {
  const [answers, setAnswers] = useState<AnswerState>(
    questionsData.questions.reduce((acc, question) => {
      acc[question.id] = "";
      return acc;
    }, {} as AnswerState)
  );

  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [showEstimationModal, setShowEstimationModal] = useState(false);
  const [selectedExplanation, setSelectedExplanation] = useState<{
    category: string;
    text: string;
    example?: string;
  } | null>(null);

  const resources = calculateResources(answers);
  const allAnswered = getAllAnswered(answers);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCategoryClick = (explanation: {
    category: string;
    text: string;
    example?: string;
  }) => {
    setSelectedExplanation(explanation);
    setShowExplanationModal(true);
  };

  const closeExplanationModal = () => {
    setShowExplanationModal(false);
  };

  const toggleEstimationModal = () => {
    setShowEstimationModal(prev => !prev);
  };

  useEffect(() => {
    (window as any).showEstimation = toggleEstimationModal;
    return () => {
      delete (window as any).showEstimation;
    };
  }, []);

  useEffect(() => {
    if (showExplanationModal || showEstimationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showExplanationModal, showEstimationModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        <div className="space-y-8">
          <QuestionsSection
            answers={answers}
            handleAnswerChange={handleAnswerChange}
            handleCategoryClick={handleCategoryClick}
            allAnswered={allAnswered}
            generateCSV={generateCSV}
            resources={resources}
          />
        </div>
      </div>

      {/* Explanation Modal */}
      <ExplanationModal
        explanation={selectedExplanation}
        isVisible={showExplanationModal}
        onClose={closeExplanationModal}
      />

      {/* Estimation Modal */}
      <EstimationModal
        resources={resources}
        isVisible={showEstimationModal}
        onClose={() => setShowEstimationModal(false)}
      />
    </div>
  );
};

export default HardwareEstimator;