// ============================================================
// COURSE DASHBOARD: Overview, progress stats, module grid
// Design: Clean white cards, teal accents, module color coding
// ============================================================
import { useCourse } from "@/contexts/CourseContext";
import { modules } from "@/lib/courseData";
import { cn } from "@/lib/utils";
import {
  Bot,
  CheckCircle2,
  Clock,
  Trophy,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Sparkles,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MODULE_ICONS: Record<string, React.ElementType> = {
  PenTool, MessageSquare, Lightbulb, Search, Target,
  Users, Briefcase, BarChart, Shield, Zap,
};

const MODULE_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue: {
    bg: "bg-blue-500/5",
    border: "border-blue-200",
    text: "text-blue-600",
    badge: "bg-blue-500/10 text-blue-600",
  },
  teal: {
    bg: "bg-teal-500/5",
    border: "border-teal-200",
    text: "text-teal-600",
    badge: "bg-teal-500/10 text-teal-600",
  },
  amber: {
    bg: "bg-amber-500/5",
    border: "border-amber-200",
    text: "text-amber-600",
    badge: "bg-amber-500/10 text-amber-600",
  },
  violet: {
    bg: "bg-violet-500/5",
    border: "border-violet-200",
    text: "text-violet-600",
    badge: "bg-violet-500/10 text-violet-600",
  },
  rose: {
    bg: "bg-rose-500/5",
    border: "border-rose-200",
    text: "text-rose-600",
    badge: "bg-rose-500/10 text-rose-600",
  },
};

export default function CourseDashboard() {
  const {
    overallProgress,
    completedCount,
    totalLessons,
    isModuleCompleted,
    getModuleProgress,
    navigateTo,
    isCourseComplete,
    learnerName,
    setLearnerName,
    progress,
  } = useCourse();

  const handleStartOrContinue = () => {
    // Find the first incomplete lesson
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (!progress.completedLessons.has(lesson.id)) {
          navigateTo(module.id, lesson.id);
          return;
        }
      }
    }
    // All complete — go to certificate
    navigateTo("certificate", "certificate");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-lg">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-teal-400 blur-3xl" />
          <div className="absolute bottom-4 left-8 w-24 h-24 rounded-full bg-blue-400 blur-3xl" />
        </div>

        <div className="relative px-8 py-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-teal-400" />
                </div>
                <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest">
                  Career Skills Course | Dr. Vicki Bealman
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display leading-tight">
                10 Ways to Use ChatGPT<br />
                <span className="text-teal-400">for Business Owners</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                Master practical AI strategies to save time, grow revenue, and run a smarter business. 
                10 modules, hands-on prompts, and real-world applications.
              </p>

              {/* Learner name input */}
              <div className="mt-4 flex items-center gap-3">
                <input
                  type="text"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  placeholder="Enter your name for the certificate..."
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 w-64"
                />
              </div>
            </div>

            {/* Progress circle */}
            <div className="flex-shrink-0 text-center">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <motion.circle
                    cx="48" cy="48" r="40"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - overallProgress / 100)}` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">{overallProgress}%</span>
                  <span className="text-xs text-slate-400">Complete</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">{completedCount}/{totalLessons} lessons</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5 flex items-center gap-3">
            <Button
              onClick={handleStartOrContinue}
              className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold gap-2"
            >
              {completedCount === 0 ? "Start Course" : isCourseComplete ? "View Certificate" : "Continue Learning"}
              <ArrowRight className="w-4 h-4" />
            </Button>
            {isCourseComplete && (
              <div className="flex items-center gap-1.5 text-amber-400 text-sm font-semibold">
                <Trophy className="w-4 h-4" />
                Course Complete!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: BookOpen, label: "Total Lessons", value: totalLessons, color: "text-blue-500" },
          { icon: CheckCircle2, label: "Completed", value: completedCount, color: "text-teal-500" },
          { icon: Clock, label: "Est. Duration", value: "~60 min", color: "text-amber-500" },
          { icon: Sparkles, label: "Practical Prompts", value: "40+", color: "text-violet-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center"
          >
            <stat.icon className={cn("w-5 h-5 mx-auto mb-1.5", stat.color)} />
            <p className="text-xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-base font-bold text-slate-700 mb-3 font-display">Course Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {modules.map((module, idx) => {
            const ModuleIcon = MODULE_ICONS[module.icon] || BookOpen;
            const colors = MODULE_COLORS[module.color] || MODULE_COLORS.teal;
            const isCompleted = isModuleCompleted(module.id);
            const moduleProgress = getModuleProgress(module.id);
            const lessonCount = module.lessons.length;
            const quizCount = module.lessons.filter((l) => l.type === "quiz").length;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.04 }}
                className={cn(
                  "bg-white rounded-xl border shadow-sm p-5 cursor-pointer hover:shadow-md transition-all group",
                  isCompleted ? "border-teal-200" : colors.border
                )}
                onClick={() => navigateTo(module.id, module.lessons[0].id)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    isCompleted ? "bg-teal-500/10" : colors.bg
                  )}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-500" />
                    ) : (
                      <ModuleIcon className={cn("w-5 h-5", colors.text)} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={cn("text-xs font-bold uppercase tracking-wider", colors.text)}>
                        Way {module.number}
                      </span>
                      {isCompleted && (
                        <span className="text-xs font-semibold text-teal-600 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded-full">
                          ✓ Done
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-slate-400">{lessonCount} lessons</span>
                      {quizCount > 0 && (
                        <span className="text-xs text-violet-500">{quizCount} quiz</span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-1" />
                </div>

                {/* Progress bar */}
                {moduleProgress > 0 && (
                  <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={cn("h-full rounded-full", isCompleted ? "bg-teal-400" : "bg-slate-400")}
                      animate={{ width: `${moduleProgress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 + idx * 0.04 }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* About Dr. Vicki */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-sm font-bold text-slate-700 mb-3 font-display">About the Instructor</h3>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-500/10 border-2 border-teal-400/30 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-teal-600">VB</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Dr. Vicki Bealman</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Dr. Vicki Bealman is a leading educator and business strategist specializing in AI-powered productivity 
              for entrepreneurs and business owners. This course distills the most practical, immediately actionable 
              ways to leverage ChatGPT to save time, reduce costs, and grow your business.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
