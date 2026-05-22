// ============================================================
// COURSE SIDEBAR: Navigation, Progress Tree, Module Accordion
// Design: Deep slate (#0F172A) sidebar, teal accents, staggered animations
// ============================================================
import { useCourse } from "@/contexts/CourseContext";
import { modules } from "@/lib/courseData";
import { cn } from "@/lib/utils";
import {
  PenTool,
  MessageSquare,
  Lightbulb,
  Search,
  Target,
  Users,
  Briefcase,
  BarChart,
  Shield,
  Zap,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Trophy,
  Bot,
  StickyNote,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MODULE_ICONS: Record<string, React.ElementType> = {
  PenTool,
  MessageSquare,
  Lightbulb,
  Search,
  Target,
  Users,
  Briefcase,
  BarChart,
  Shield,
  Zap,
};

const LESSON_TYPE_ICONS = {
  lesson: BookOpen,
  example: Lightbulb,
  quiz: HelpCircle,
};

const LESSON_TYPE_COLORS = {
  lesson: "text-teal-400",
  example: "text-amber-400",
  quiz: "text-violet-400",
};

const MODULE_COLORS: Record<string, string> = {
  blue: "text-blue-400 border-blue-500",
  teal: "text-teal-400 border-teal-500",
  amber: "text-amber-400 border-amber-500",
  violet: "text-violet-400 border-violet-500",
  rose: "text-rose-400 border-rose-500",
};

const MODULE_BG_COLORS: Record<string, string> = {
  blue: "bg-blue-500/10",
  teal: "bg-teal-500/10",
  amber: "bg-amber-500/10",
  violet: "bg-violet-500/10",
  rose: "bg-rose-500/10",
};

interface CourseSidebarProps {
  onNavigate?: () => void;
}

export default function CourseSidebar({ onNavigate }: CourseSidebarProps) {
  const {
    progress,
    isLessonCompleted,
    isModuleCompleted,
    navigateTo,
    getModuleProgress,
    overallProgress,
    completedCount,
    totalLessons,
    resetCourse,
    isCourseComplete,
  } = useCourse();

  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set([progress.currentModuleId])
  );
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setExpandedModules((prev) => new Set(Array.from(prev).concat(progress.currentModuleId)));
  }, [progress.currentModuleId]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    navigateTo(moduleId, lessonId);
    onNavigate?.();
  };

  const handleReset = () => {
    if (showResetConfirm) {
      resetCourse();
      setShowResetConfirm(false);
      navigateTo(modules[0].id, modules[0].lessons[0].id);
      onNavigate?.();
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 4000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="px-4 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-teal-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest leading-none mb-0.5">
              ChatGPT for Business
            </p>
            <p className="text-[11px] text-slate-400 leading-none">10 Ways Course</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Overall Progress</span>
            <span className="text-xs font-bold text-teal-400">{overallProgress}%</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            {completedCount} of {totalLessons} lessons completed
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
        {/* Dashboard link */}
        <button
          onClick={() => { navigateTo("dashboard", "dashboard"); onNavigate?.(); }}
          className={cn(
            "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors",
            progress.currentModuleId === "dashboard"
              ? "bg-teal-500/15 text-teal-300"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          )}
        >
          <BookOpen className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">Course Overview</span>
        </button>

        {/* Notes link */}
        <button
          onClick={() => { navigateTo("notes", "notes"); onNavigate?.(); }}
          className={cn(
            "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors",
            progress.currentModuleId === "notes"
              ? "bg-amber-500/15 text-amber-300"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          )}
        >
          <StickyNote className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">My Notes</span>
        </button>

        {/* Certificate link (only when complete) */}
        {isCourseComplete && (
          <button
            onClick={() => { navigateTo("certificate", "certificate"); onNavigate?.(); }}
            className={cn(
              "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors",
              progress.currentModuleId === "certificate"
                ? "bg-amber-500/15 text-amber-300"
                : "text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
            )}
          >
            <Trophy className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">My Certificate</span>
          </button>
        )}

        <div className="h-px bg-slate-700/50 mx-4 my-2" />

        {/* Modules */}
        {modules.map((module, moduleIdx) => {
          const ModuleIcon = MODULE_ICONS[module.icon] || BookOpen;
          const isExpanded = expandedModules.has(module.id);
          const isCompleted = isModuleCompleted(module.id);
          const moduleProgress = getModuleProgress(module.id);
          const colorClass = MODULE_COLORS[module.color] || MODULE_COLORS.teal;
          const bgColorClass = MODULE_BG_COLORS[module.color] || MODULE_BG_COLORS.teal;
          const isCurrentModule = progress.currentModuleId === module.id;

          return (
            <div key={module.id}>
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors group",
                  isCurrentModule
                    ? "bg-slate-800/80"
                    : "hover:bg-slate-800/40"
                )}
              >
                {/* Module icon */}
                <div className={cn("w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0", bgColorClass)}>
                  {isCompleted ? (
                    <CheckCircle2 className={cn("w-4 h-4", colorClass.split(" ")[0])} />
                  ) : (
                    <ModuleIcon className={cn("w-3.5 h-3.5", colorClass.split(" ")[0])} />
                  )}
                </div>

                {/* Module title */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-[11px] font-bold uppercase tracking-wider",
                      colorClass.split(" ")[0]
                    )}>
                      Way {module.number}
                    </span>
                    {moduleProgress > 0 && moduleProgress < 100 && (
                      <span className="text-[10px] text-slate-500">{moduleProgress}%</span>
                    )}
                  </div>
                  <p className={cn(
                    "text-xs font-medium truncate leading-tight",
                    isCurrentModule ? "text-slate-200" : "text-slate-300 group-hover:text-slate-200"
                  )}>
                    {module.title}
                  </p>
                </div>

                {/* Expand/collapse */}
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </motion.div>
              </button>

              {/* Lessons */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {module.lessons.map((lesson, lessonIdx) => {
                      const LessonIcon = LESSON_TYPE_ICONS[lesson.type] || BookOpen;
                      const lessonColorClass = LESSON_TYPE_COLORS[lesson.type] || "text-teal-400";
                      const isLessonActive =
                        progress.currentModuleId === module.id &&
                        progress.currentLessonId === lesson.id;
                      const isLessonDone = isLessonCompleted(lesson.id);

                      return (
                        <motion.button
                          key={lesson.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: lessonIdx * 0.04 }}
                          onClick={() => handleLessonClick(module.id, lesson.id)}
                          className={cn(
                            "w-full flex items-center gap-2.5 pl-10 pr-4 py-2 text-xs transition-colors group",
                            isLessonActive
                              ? "bg-teal-500/15 text-teal-300"
                              : isLessonDone
                              ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                              : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/40"
                          )}
                        >
                          {/* Completion indicator */}
                          <div className="flex-shrink-0">
                            {isLessonDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                            ) : (
                              <Circle className={cn("w-3.5 h-3.5", isLessonActive ? "text-teal-400" : "text-slate-600")} />
                            )}
                          </div>

                          {/* Lesson icon */}
                          <LessonIcon className={cn("w-3 h-3 flex-shrink-0", isLessonActive ? "text-teal-400" : lessonColorClass, "opacity-70")} />

                          {/* Lesson title */}
                          <span className="flex-1 text-left leading-tight truncate font-medium">
                            {lesson.title}
                          </span>

                          {/* Duration */}
                          <span className="text-[10px] text-slate-600 flex-shrink-0">{lesson.duration}</span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer: Reset Button */}
      <div className="border-t border-slate-700/50 p-3">
        <button
          onClick={handleReset}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all",
            showResetConfirm
              ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse"
              : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border border-transparent"
          )}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {showResetConfirm ? "Click again to confirm reset" : "Reset Progress"}
        </button>
      </div>
    </div>
  );
}
