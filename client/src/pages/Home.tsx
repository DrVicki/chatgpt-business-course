// ============================================================
// HOME PAGE: Main layout with sidebar + content area
// Design: Deep slate sidebar, white content, teal accents
// ============================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCourse } from "@/contexts/CourseContext";
import { modules } from "@/lib/courseData";
import { cn } from "@/lib/utils";
import CourseSidebar from "@/components/CourseSidebar";
import CourseDashboard from "@/components/CourseDashboard";
import LessonViewer from "@/components/LessonViewer";
import QuizViewer from "@/components/QuizViewer";
import NotesSummary from "@/components/NotesSummary";
import Certificate from "@/components/Certificate";
import {
  Menu,
  Bot,
  ChevronRight,
  Home,
  Trophy,
} from "lucide-react";

export default function HomePage() {
  const {
    progress,
    navigateTo,
    markLessonComplete,
    overallProgress,
    isCourseComplete,
  } = useCourse();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Find current module and lesson
  const currentModule = modules.find((m) => m.id === progress.currentModuleId);
  const currentLesson = currentModule?.lessons.find((l) => l.id === progress.currentLessonId);

  // Find next lesson
  const getNextLesson = () => {
    if (!currentModule || !currentLesson) return null;
    const lessonIdx = currentModule.lessons.findIndex((l) => l.id === currentLesson.id);
    if (lessonIdx < currentModule.lessons.length - 1) {
      return { moduleId: currentModule.id, lessonId: currentModule.lessons[lessonIdx + 1].id };
    }
    const moduleIdx = modules.findIndex((m) => m.id === currentModule.id);
    if (moduleIdx < modules.length - 1) {
      const nextModule = modules[moduleIdx + 1];
      return { moduleId: nextModule.id, lessonId: nextModule.lessons[0].id };
    }
    return null;
  };

  const nextLesson = getNextLesson();

  const handleLessonComplete = () => {
    // Auto-advance to next if available
  };

  const handleNext = () => {
    if (nextLesson) {
      navigateTo(nextLesson.moduleId, nextLesson.lessonId);
    } else {
      navigateTo("certificate", "certificate");
    }
  };

  // Breadcrumb
  const getBreadcrumb = () => {
    if (progress.currentModuleId === "dashboard") return ["Course Overview"];
    if (progress.currentModuleId === "notes") return ["My Notes"];
    if (progress.currentModuleId === "certificate") return ["Certificate"];
    if (!currentModule || !currentLesson) return ["Course Overview"];
    return [`Way ${currentModule.number}: ${currentModule.title}`, currentLesson.title];
  };

  const breadcrumb = getBreadcrumb();

  // Render main content
  const renderContent = () => {
    if (progress.currentModuleId === "dashboard" || (!currentModule && progress.currentModuleId !== "notes" && progress.currentModuleId !== "certificate")) {
      return <CourseDashboard />;
    }
    if (progress.currentModuleId === "notes") {
      return <NotesSummary />;
    }
    if (progress.currentModuleId === "certificate") {
      return <Certificate />;
    }
    if (!currentLesson || !currentModule) return <CourseDashboard />;

    if (currentLesson.type === "quiz") {
      return (
        <QuizViewer
          lesson={currentLesson}
          moduleId={currentModule.id}
          onComplete={handleLessonComplete}
          onNext={handleNext}
          hasNext={!!nextLesson || !isCourseComplete}
        />
      );
    }

    return (
      <LessonViewer
        lesson={currentLesson}
        module={currentModule}
        onComplete={handleLessonComplete}
        onNext={handleNext}
        hasNext={!!nextLesson}
      />
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 flex-shrink-0 flex-col border-r border-slate-700/30">
        <CourseSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden flex flex-col"
            >
              <CourseSidebar onNavigate={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 flex-shrink-0 shadow-sm">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo (mobile) */}
          <div className="lg:hidden flex items-center gap-2">
            <Bot className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-slate-800">ChatGPT for Business</span>
          </div>

          {/* Breadcrumb */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm">
            <button
              onClick={() => navigateTo("dashboard", "dashboard")}
              className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
            </button>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className={cn(
                  "font-medium",
                  i === breadcrumb.length - 1 ? "text-slate-700" : "text-slate-400"
                )}>
                  {crumb.length > 45 ? crumb.slice(0, 45) + "…" : crumb}
                </span>
              </span>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            {/* Progress pill */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
              <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-teal-500 rounded-full"
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-600">{overallProgress}%</span>
            </div>

            {/* Certificate button if complete */}
            {isCourseComplete && (
              <button
                onClick={() => navigateTo("certificate", "certificate")}
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors"
              >
                <Trophy className="w-3.5 h-3.5" />
                Certificate
              </button>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={progress.currentLessonId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
