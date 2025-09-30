import React, { useEffect, useRef, useState } from "react";
import { questionsData } from "../../data/questionsData";
import {
  calculateResources,
  generateCSV,
  getAllAnswered,
} from "../../utils/csvGenerator";
import { AnswerState } from "../../utils/types";
import ExplanationModal from "./ExplanationModal";
import Header from "./Header";
import SidePanel from "./SidePanel";
import QuestionsSection from "./QuestionsSection";

const PANEL_WIDTH_PX = 320; // w-80 (20rem)
const DEFAULT_TOP_PX = 32; // top-8
const GAP_BETWEEN_CARD_AND_PANEL_PX = 16; // gap entre o card e o painel

const HardwareEstimator: React.FC = () => {
  const [answers, setAnswers] = useState<AnswerState>(
    questionsData.questions.reduce((acc, question) => {
      acc[question.id] = "";
      return acc;
    }, {} as AnswerState)
  );

  const [showExplanationModal, setShowExplanationModal] = useState(false);
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

  // ref para o card de perguntas (aquele que tem bg-slate-900/80 ...)
  const questionCardRef = useRef<HTMLDivElement | null>(null);

  // posição calculada do painel (quando null -> fallback usado)
  const [panelPos, setPanelPos] = useState<{
    left: number | null;
    top: number;
  } | null>(null);
  const [isLarge, setIsLarge] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const computePanelPosition = () => {
      if (typeof window === "undefined") return;

      setIsLarge(window.innerWidth >= 1024);

      if (!questionCardRef.current) {
        setPanelPos(null);
        return;
      }

      // bounding rect relativo à viewport
      const rect = questionCardRef.current.getBoundingClientRect();

      // Calcular posição absoluta considerando o scroll
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const absoluteTop = rect.top + scrollTop;

      // top (considerando a posição absoluta) - queremos o painel começar exatamente na mesma altura do card
      const top = absoluteTop;

      // left: ao lado direito do card + gap
      const proposedLeft = rect.right + GAP_BETWEEN_CARD_AND_PANEL_PX;

      // garantir que o painel não saia da viewport
      const maxLeft = Math.max(window.innerWidth - PANEL_WIDTH_PX - 8, 0);

      const clampedLeft = Math.min(Math.max(proposedLeft, 8), maxLeft);

      setPanelPos({ left: clampedLeft, top });
    };

    // compute on mount
    // wrap in requestAnimationFrame to ensure layout is ready
    const rafId = requestAnimationFrame(computePanelPosition);

    // recompute on resize and load
    const onResize = () => {
      computePanelPosition();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", computePanelPosition);

    // Re-computar ao fazer scroll para manter o painel na posição correta
    window.addEventListener("scroll", computePanelPosition);

    // optional: recompute after fonts/images load / small delay (helps with layout shifts)
    const loadTimeout = window.setTimeout(computePanelPosition, 300);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", computePanelPosition);
      window.removeEventListener("scroll", computePanelPosition);
      clearTimeout(loadTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Questions Content */}
          <div className="flex-1 space-y-8">
            <QuestionsSection
              answers={answers}
              handleAnswerChange={handleAnswerChange}
              handleCategoryClick={handleCategoryClick}
              questionCardRef={questionCardRef}
            />
          </div>

          {/* Sidebar placeholder kept for layout - panel is shown as fixed next to the question card on large screens */}
          <aside className="lg:w-80 flex-shrink-0 hidden lg:block relative">
            {isLarge && (
              <div
                className="fixed"
                style={{
                  top: panelPos ? `${panelPos.top}px` : `${DEFAULT_TOP_PX}px`,
                  left:
                    panelPos && panelPos.left !== null
                      ? `${panelPos.left}px`
                      : undefined,
                  right: panelPos && panelPos.left === null ? "32px" : undefined,
                  width: `${PANEL_WIDTH_PX}px`,
                  zIndex: 20,
                }}
              >
                <SidePanel 
                  resources={resources} 
                  allAnswered={allAnswered} 
                  answers={answers} 
                  generateCSV={generateCSV}
                />
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Explanation Modal */}
      <ExplanationModal
        explanation={selectedExplanation}
        isVisible={showExplanationModal}
        onClose={closeExplanationModal}
      />
    </div>
  );
};

export default HardwareEstimator;
