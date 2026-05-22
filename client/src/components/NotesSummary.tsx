// ============================================================
// NOTES SUMMARY: All notes aggregated by module, with download
// Design: Amber accent, module grouping, search, download
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { modules } from "@/lib/courseData";
import {
  StickyNote,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  HelpCircle,
  Trash2,
  Clock,
  AlertCircle,
  FileDown,
  PenTool,
  MessageSquare,
  Lightbulb,
  Target,
  Users,
  Briefcase,
  BarChart,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCourse } from "@/contexts/CourseContext";

const NOTES_STORAGE_KEY = "chatgpt-course-notes";

interface NoteEntry {
  text: string;
  savedAt: string;
}

function loadAllNotes(): Record<string, NoteEntry> {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllNotes(notes: Record<string, NoteEntry>) {
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch {}
}

const MODULE_ICONS: Record<string, React.ElementType> = {
  PenTool, MessageSquare, Lightbulb, Search, Target,
  Users, Briefcase, BarChart, Shield, Zap,
};

const LESSON_TYPE_ICONS = {
  lesson: BookOpen,
  example: Lightbulb,
  quiz: HelpCircle,
};

const MODULE_COLORS: Record<string, string> = {
  blue: "text-blue-500 bg-blue-500/10",
  teal: "text-teal-500 bg-teal-500/10",
  amber: "text-amber-500 bg-amber-500/10",
  violet: "text-violet-500 bg-violet-500/10",
  rose: "text-rose-500 bg-rose-500/10",
};

export default function NotesSummary() {
  const { learnerName } = useCourse();
  const [notes, setNotes] = useState<Record<string, NoteEntry>>({});
  const [search, setSearch] = useState("");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    const all = loadAllNotes();
    setNotes(all);
    // Auto-expand modules that have notes
    const modulesWithNotes = new Set<string>();
    modules.forEach((m) => {
      m.lessons.forEach((l) => {
        if (all[l.id]) modulesWithNotes.add(m.id);
      });
    });
    setExpandedModules(modulesWithNotes);
  }, []);

  const totalNotes = Object.keys(notes).length;

  const handleDeleteNote = useCallback((lessonId: string) => {
    const all = loadAllNotes();
    delete all[lessonId];
    saveAllNotes(all);
    setNotes({ ...all });
    toast.success("Note deleted");
  }, []);

  const handleDownload = () => {
    const lines: string[] = [];
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    lines.push(`10 Ways to Use ChatGPT for Business Owners`);
    lines.push(`Course Notes${learnerName ? ` — ${learnerName}` : ""}`);
    lines.push(`Downloaded: ${date}`);
    lines.push(`${"=".repeat(60)}`);
    lines.push("");

    modules.forEach((module) => {
      const moduleLessons = module.lessons.filter((l) => notes[l.id]);
      if (moduleLessons.length === 0) return;

      lines.push(`WAY ${module.number}: ${module.title.toUpperCase()}`);
      lines.push("-".repeat(50));

      moduleLessons.forEach((lesson) => {
        const note = notes[lesson.id];
        if (!note) return;
        const savedDate = new Date(note.savedAt).toLocaleDateString("en-US", {
          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
        });
        lines.push(`\n[${lesson.title}] — Saved: ${savedDate}`);
        lines.push(note.text);
        lines.push("");
      });

      lines.push("");
    });

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chatgpt-course-notes-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Notes downloaded!");
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  const formatSavedAt = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-4"
    >
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <StickyNote className="w-5 h-5 text-amber-500" />
              <h1 className="text-xl font-bold text-slate-800 font-display">My Notes</h1>
            </div>
            <p className="text-sm text-slate-500">
              {totalNotes === 0
                ? "No notes yet. Start taking notes while studying each lesson."
                : `${totalNotes} note${totalNotes !== 1 ? "s" : ""} across your lessons.`}
            </p>
          </div>
          {totalNotes > 0 && (
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white flex-shrink-0"
            >
              <FileDown className="w-4 h-4" />
              Download All Notes
            </Button>
          )}
        </div>

        {/* Search */}
        {totalNotes > 0 && (
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your notes..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300/50 bg-slate-50"
            />
          </div>
        )}
      </div>

      {/* Empty State */}
      {totalNotes === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            Open any lesson and click the <strong>My Notes</strong> panel to start taking notes.
          </p>
        </div>
      )}

      {/* Notes by Module */}
      {modules.map((module) => {
        const ModuleIcon = MODULE_ICONS[module.icon] || BookOpen;
        const colorClass = MODULE_COLORS[module.color] || MODULE_COLORS.teal;
        const isExpanded = expandedModules.has(module.id);

        const filteredLessons = module.lessons.filter((l) => {
          if (!notes[l.id]) return false;
          if (!search.trim()) return true;
          const q = search.toLowerCase();
          return (
            notes[l.id].text.toLowerCase().includes(q) ||
            l.title.toLowerCase().includes(q)
          );
        });

        if (filteredLessons.length === 0) return null;

        return (
          <div key={module.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100"
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", colorClass)}>
                <ModuleIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-slate-700">Way {module.number}: {module.title}</p>
                <p className="text-xs text-slate-400">{filteredLessons.length} note{filteredLessons.length !== 1 ? "s" : ""}</p>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Lesson Notes */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {filteredLessons.map((lesson, idx) => {
                    const note = notes[lesson.id];
                    if (!note) return null;
                    const LessonIcon = LESSON_TYPE_ICONS[lesson.type] || BookOpen;

                    return (
                      <div
                        key={lesson.id}
                        className={cn(
                          "px-5 py-4",
                          idx < filteredLessons.length - 1 && "border-b border-slate-100"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <LessonIcon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <p className="text-xs font-semibold text-slate-600">{lesson.title}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <Clock className="w-3 h-3" />
                              {formatSavedAt(note.savedAt)}
                            </span>
                            <button
                              onClick={() => handleDeleteNote(lesson.id)}
                              className="p-1 rounded hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed bg-amber-50/50 border border-amber-100 rounded-lg px-3 py-2 whitespace-pre-wrap">
                          {note.text}
                        </p>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.div>
  );
}
