// ============================================================
// COURSE CONTEXT: Global state for progress, notes, learner name
// Design: Deep slate sidebar, teal accents, Space Grotesk + Inter
// ============================================================
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { modules, COMPUTED_TOTAL_LESSONS } from "@/lib/courseData";

export interface CourseProgress {
  completedLessons: Set<string>;
  quizScores: Record<string, number>;
  currentModuleId: string;
  currentLessonId: string;
  startedAt: string | null;
  completedAt: string | null;
}

interface CourseContextType {
  progress: CourseProgress;
  totalLessons: number;
  completedCount: number;
  overallProgress: number;
  isLessonCompleted: (lessonId: string) => boolean;
  isModuleCompleted: (moduleId: string) => boolean;
  markLessonComplete: (lessonId: string) => void;
  saveQuizScore: (lessonId: string, score: number) => void;
  navigateTo: (moduleId: string, lessonId: string) => void;
  resetCourse: () => void;
  isCourseComplete: boolean;
  getModuleProgress: (moduleId: string) => number;
  learnerName: string;
  setLearnerName: (name: string) => void;
  getLessonNote: (lessonId: string) => string;
  setLessonNote: (lessonId: string, note: string) => void;
}

const STORAGE_KEY = "chatgpt-course-progress";
const LEARNER_NAME_KEY = "chatgpt-course-learner-name";
const NOTES_KEY = "chatgpt-course-notes";

const defaultProgress: CourseProgress = {
  completedLessons: new Set(),
  quizScores: {},
  currentModuleId: modules[0].id,
  currentLessonId: modules[0].lessons[0].id,
  startedAt: null,
  completedAt: null,
};

function serializeProgress(p: CourseProgress): string {
  return JSON.stringify({
    completedLessons: Array.from(p.completedLessons),
    quizScores: p.quizScores,
    currentModuleId: p.currentModuleId,
    currentLessonId: p.currentLessonId,
    startedAt: p.startedAt,
    completedAt: p.completedAt,
  });
}

function deserializeProgress(raw: string): CourseProgress {
  try {
    const data = JSON.parse(raw);
    return {
      completedLessons: new Set(data.completedLessons || []),
      quizScores: data.quizScores || {},
      currentModuleId: data.currentModuleId || modules[0].id,
      currentLessonId: data.currentLessonId || modules[0].lessons[0].id,
      startedAt: data.startedAt || null,
      completedAt: data.completedAt || null,
    };
  } catch {
    return { ...defaultProgress, completedLessons: new Set() };
  }
}

const CourseContext = createContext<CourseContextType | null>(null);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<CourseProgress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return deserializeProgress(stored);
    return { ...defaultProgress, completedLessons: new Set() };
  });

  const [learnerName, setLearnerNameState] = useState<string>(() => {
    return localStorage.getItem(LEARNER_NAME_KEY) || "";
  });

  const [lessonNotes, setLessonNotes] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializeProgress(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(LEARNER_NAME_KEY, learnerName);
  }, [learnerName]);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(lessonNotes));
  }, [lessonNotes]);

  const completedCount = progress.completedLessons.size;
  const overallProgress = Math.round((completedCount / COMPUTED_TOTAL_LESSONS) * 100);
  const isCourseComplete = completedCount >= COMPUTED_TOTAL_LESSONS;

  const isLessonCompleted = useCallback(
    (lessonId: string) => progress.completedLessons.has(lessonId),
    [progress.completedLessons]
  );

  const isModuleCompleted = useCallback(
    (moduleId: string) => {
      const module = modules.find((m) => m.id === moduleId);
      if (!module) return false;
      return module.lessons.every((l) => progress.completedLessons.has(l.id));
    },
    [progress.completedLessons]
  );

  const getModuleProgress = useCallback(
    (moduleId: string) => {
      const module = modules.find((m) => m.id === moduleId);
      if (!module) return 0;
      const completed = module.lessons.filter((l) =>
        progress.completedLessons.has(l.id)
      ).length;
      return Math.round((completed / module.lessons.length) * 100);
    },
    [progress.completedLessons]
  );

  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.has(lessonId)) return prev;
      const newCompleted = new Set(prev.completedLessons);
      newCompleted.add(lessonId);
      const newCount = newCompleted.size;
      const isNowComplete = newCount >= COMPUTED_TOTAL_LESSONS;
      return {
        ...prev,
        completedLessons: newCompleted,
        startedAt: prev.startedAt || new Date().toISOString(),
        completedAt: isNowComplete ? new Date().toISOString() : prev.completedAt,
      };
    });
  }, []);

  const saveQuizScore = useCallback((lessonId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [lessonId]: score },
    }));
  }, []);

  const navigateTo = useCallback((moduleId: string, lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      currentModuleId: moduleId,
      currentLessonId: lessonId,
    }));
  }, []);

  const resetCourse = useCallback(() => {
    setProgress({
      ...defaultProgress,
      completedLessons: new Set(),
    });
  }, []);

  const setLearnerName = useCallback((name: string) => {
    setLearnerNameState(name);
  }, []);

  const getLessonNote = useCallback(
    (lessonId: string) => lessonNotes[lessonId] || "",
    [lessonNotes]
  );

  const setLessonNote = useCallback((lessonId: string, note: string) => {
    setLessonNotes((prev) => ({ ...prev, [lessonId]: note }));
  }, []);

  return (
    <CourseContext.Provider
      value={{
        progress,
        totalLessons: COMPUTED_TOTAL_LESSONS,
        completedCount,
        overallProgress,
        isLessonCompleted,
        isModuleCompleted,
        markLessonComplete,
        saveQuizScore,
        navigateTo,
        resetCourse,
        isCourseComplete,
        getModuleProgress,
        learnerName,
        setLearnerName,
        getLessonNote,
        setLessonNote,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
}
