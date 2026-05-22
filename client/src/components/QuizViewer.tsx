// ============================================================
// QUIZ VIEWER: Interactive knowledge check with scoring
// Design: Violet accent, immediate feedback, score tracking
// ============================================================
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCourse } from "@/contexts/CourseContext";
import type { Lesson } from "@/lib/courseData";
import { cn } from "@/lib/utils";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface QuizViewerProps {
  lesson: Lesson;
  moduleId: string;
  onComplete: () => void;
  onNext: () => void;
  hasNext: boolean;
}

type AnswerState = "unanswered" | "correct" | "incorrect";

export default function QuizViewer({ lesson, moduleId, onComplete, onNext, hasNext }: QuizViewerProps) {
  const { isLessonCompleted, saveQuizScore, markLessonComplete, progress } = useCourse();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [answerStates, setAnswerStates] = useState<Record<string, AnswerState>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptKey, setAttemptKey] = useState(0);

  const allQuestions = lesson.questions || [];
  const isCompleted = isLessonCompleted(lesson.id);
  const savedScore = progress.quizScores[lesson.id];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => {
    return shuffle(allQuestions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id, attemptKey]);

  const handleAnswer = (questionId: string, optionIndex: number, correctIndex: number) => {
    if (answerStates[questionId] !== undefined && answerStates[questionId] !== "unanswered") return;
    const isCorrect = optionIndex === correctIndex;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setAnswerStates((prev) => ({
      ...prev,
      [questionId]: isCorrect ? "correct" : "incorrect",
    }));
    setTimeout(() => {
      setShowExplanation((prev) => ({ ...prev, [questionId]: true }));
    }, 400);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      // Calculate score
      const correctCount = Object.values(answerStates).filter((s) => s === "correct").length;
      const pct = Math.round((correctCount / questions.length) * 100);
      setScore(pct);
      setQuizComplete(true);
      saveQuizScore(lesson.id, pct);
      if (pct >= 75) {
        markLessonComplete(lesson.id);
        onComplete();
      }
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelectedAnswers({});
    setAnswerStates({});
    setShowExplanation({});
    setQuizComplete(false);
    setScore(0);
    setAttemptKey((k) => k + 1);
  };

  const currentQuestion = questions[currentQ];
  const currentAnswerState = currentQuestion ? answerStates[currentQuestion.id] : undefined;
  const hasAnswered = currentAnswerState !== undefined && currentAnswerState !== "unanswered";

  // Already completed view
  if (isCompleted && !quizComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-500/10 border-2 border-teal-400/30 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-teal-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2 font-display">Knowledge Check Complete!</h2>
          {savedScore !== undefined && (
            <p className="text-slate-500 mb-4">Your best score: <span className="font-bold text-teal-600">{savedScore}%</span></p>
          )}
          <div className="flex gap-3 justify-center mt-4">
            <Button variant="outline" onClick={handleRetry} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </Button>
            {hasNext && (
              <Button onClick={onNext} className="gap-2 bg-teal-600 hover:bg-teal-700 text-white">
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Quiz complete view
  if (quizComplete) {
    const passed = score >= 75;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2",
              passed
                ? "bg-teal-500/10 border-teal-400/40"
                : "bg-rose-500/10 border-rose-400/40"
            )}
          >
            {passed ? (
              <Trophy className="w-10 h-10 text-teal-500" />
            ) : (
              <RotateCcw className="w-10 h-10 text-rose-500" />
            )}
          </motion.div>

          <h2 className={cn(
            "text-2xl font-bold mb-2 font-display",
            passed ? "text-slate-800" : "text-slate-700"
          )}>
            {passed ? "Great Work!" : "Keep Practicing!"}
          </h2>

          <div className={cn(
            "text-5xl font-bold mb-2",
            passed ? "text-teal-600" : "text-rose-500"
          )}>
            {score}%
          </div>

          <p className="text-slate-500 text-sm mb-6">
            {passed
              ? `You answered ${Object.values(answerStates).filter(s => s === "correct").length} of ${questions.length} questions correctly. Lesson marked complete!`
              : `You need 75% to pass. You answered ${Object.values(answerStates).filter(s => s === "correct").length} of ${questions.length} correctly. Try again!`
            }
          </p>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={handleRetry} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </Button>
            {passed && hasNext && (
              <Button onClick={onNext} className="gap-2 bg-teal-600 hover:bg-teal-700 text-white">
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-4"
    >
      {/* Quiz Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-violet-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Knowledge Check</p>
              <p className="text-xs text-slate-400">{lesson.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.duration}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-violet-500 rounded-full"
              animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">{currentQ + 1}/{questions.length}</span>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${lesson.id}-${currentQ}-${attemptKey}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-base font-semibold text-slate-800 mb-4 leading-snug">
              {currentQuestion.question}
            </p>

            {/* Options */}
            <div className="space-y-2">
              {currentQuestion.options.map((option, idx) => {
                const state = answerStates[currentQuestion.id];
                const isSelected = selectedAnswers[currentQuestion.id] === idx;
                const isCorrectOption = idx === currentQuestion.correctAnswer;
                const showResult = state !== undefined && state !== "unanswered";

                return (
                  <motion.button
                    key={idx}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(currentQuestion.id, idx, currentQuestion.correctAnswer)}
                    disabled={showResult}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all",
                      !showResult && "hover:border-violet-300 hover:bg-violet-50 cursor-pointer",
                      !showResult && "border-slate-200 bg-white text-slate-700",
                      showResult && isCorrectOption && "border-teal-400 bg-teal-50 text-teal-800",
                      showResult && isSelected && !isCorrectOption && "border-rose-400 bg-rose-50 text-rose-800",
                      showResult && !isSelected && !isCorrectOption && "border-slate-100 bg-slate-50 text-slate-400 opacity-60",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0",
                        !showResult && "border-slate-300 text-slate-400",
                        showResult && isCorrectOption && "border-teal-500 bg-teal-500 text-white",
                        showResult && isSelected && !isCorrectOption && "border-rose-500 bg-rose-500 text-white",
                        showResult && !isSelected && !isCorrectOption && "border-slate-200 text-slate-300",
                      )}>
                        {showResult && isCorrectOption ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : showResult && isSelected && !isCorrectOption ? (
                          <XCircle className="w-3.5 h-3.5" />
                        ) : (
                          String.fromCharCode(65 + idx)
                        )}
                      </span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation[currentQuestion.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "mt-4 p-3 rounded-lg border text-sm",
                    answerStates[currentQuestion.id] === "correct"
                      ? "bg-teal-50 border-teal-200 text-teal-800"
                      : "bg-amber-50 border-amber-200 text-amber-800"
                  )}
                >
                  <p className="font-semibold mb-1">
                    {answerStates[currentQuestion.id] === "correct" ? "✓ Correct!" : "✗ Not quite."}
                  </p>
                  <p className="leading-relaxed">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex justify-end"
          >
            <Button
              onClick={handleNext}
              className="gap-2 bg-violet-600 hover:bg-violet-700 text-white"
            >
              {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
