// ============================================================
// LESSON VIEWER: Renders lesson content with markdown-like formatting
// Design: Clean white card, teal accents, readable typography
// ============================================================
import { useCourse } from "@/contexts/CourseContext";
import type { Lesson, Module } from "@/lib/courseData";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  BookOpen,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import NotesPanel from "./NotesPanel";

interface LessonViewerProps {
  lesson: Lesson;
  module: Module;
  onComplete: () => void;
  onNext: () => void;
  hasNext: boolean;
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-slate-800 mt-2 mb-4 font-display">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold text-slate-700 mt-6 mb-2 font-display">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("> *\"") || line.startsWith("> *'")) {
      // Prompt example (italic blockquote = prompt)
      const promptText = line.replace(/^> \*"/, "").replace(/"?\*$/, "").replace(/^> \*'/, "").replace(/'?\*$/, "");
      elements.push(
        <div key={i} className="bg-slate-900 rounded-lg p-4 my-3 border border-slate-700">
          <div className="flex items-start gap-2.5">
            <span className="text-teal-400 text-[10px] font-bold font-mono mt-0.5 flex-shrink-0 uppercase tracking-widest border border-teal-500/40 rounded px-1.5 py-0.5">PROMPT</span>
            <p className="text-sm text-slate-200 font-mono leading-relaxed">
              {promptText}
            </p>
          </div>
        </div>
      );
    } else if (line.startsWith("> ")) {
      // Blockquote / Pro Tip
      const isProTip = line.includes("**Pro Tip") || line.includes("**Important") || line.includes("**Remember") || line.includes("**Critical") || line.includes("**Final") || line.includes("**Warning");
      elements.push(
        <blockquote
          key={i}
          className={cn(
            "border-l-4 pl-4 py-2 my-4 rounded-r-lg",
            isProTip
              ? "border-teal-400 bg-teal-50 text-teal-800"
              : "border-slate-300 bg-slate-50 text-slate-600"
          )}
        >
          <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
        </blockquote>
      );
    } else if (line.startsWith("**Try this prompt:**")) {
      // Skip label — prompts are detected by the italic blockquote pattern above
    } else if (line.startsWith("| ") || line.startsWith("|---") || line.startsWith("|:--")) {
      // Table
      const tableLines: string[] = [];
      while (i < lines.length && (lines[i].startsWith("| ") || lines[i].startsWith("|---") || lines[i].startsWith("|:--") || lines[i].startsWith("| ---"))) {
        tableLines.push(lines[i]);
        i++;
      }
      i--; // back up one since the outer loop will increment

      const headers = tableLines[0].split("|").filter(Boolean).map(h => h.trim());
      // Filter out separator rows (lines like |---|---|---| or |:---|:---:|---:|)
      // A separator row has no letters or digits
      const dataRows = tableLines.slice(1).filter(row => /[a-zA-Z0-9–—]/.test(row));
      const rows = dataRows.map(row =>
        row.split("|").filter(Boolean).map(cell => cell.trim())
      );

      elements.push(
        <div key={i} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800 text-slate-100">
                {headers.map((h, hi) => (
                  <th key={hi} className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wider">
                    {h.replace(/\*\*/g, "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-slate-600 border-b border-slate-100"
                      dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      // List
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      i--;

      elements.push(
        <ul key={i} className="my-3 space-y-1.5">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0 mt-2" />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
    } else if (line.match(/^\d+\. /)) {
      // Numbered list
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      i--;

      elements.push(
        <ol key={i} className="my-3 space-y-1.5 list-none">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-2.5 text-sm text-slate-600">
              <span className="w-5 h-5 rounded-full bg-teal-500/15 text-teal-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {li + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ol>
      );
    } else if (line.startsWith("⚠️")) {
      elements.push(
        <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-3 my-4 flex items-start gap-2">
          <span className="text-amber-500 flex-shrink-0">⚠️</span>
          <p className="text-sm text-amber-800" dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2).trim()) }} />
        </div>
      );
    } else if (line.trim() === "") {
      // Empty line — skip
    } else {
      elements.push(
        <p key={i} className="text-sm text-slate-600 leading-relaxed my-2"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }

    i++;
  }

  return elements;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-slate-100 text-teal-700 px-1 py-0.5 rounded text-xs font-mono">$1</code>');
}

export default function LessonViewer({ lesson, module, onComplete, onNext, hasNext }: LessonViewerProps) {
  const { isLessonCompleted, markLessonComplete } = useCourse();
  const isCompleted = isLessonCompleted(lesson.id);

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id);
    onComplete();
  };

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-200",
    teal: "bg-teal-500/10 text-teal-600 border-teal-200",
    amber: "bg-amber-500/10 text-amber-600 border-amber-200",
    violet: "bg-violet-500/10 text-violet-600 border-violet-200",
    rose: "bg-rose-500/10 text-rose-600 border-rose-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-3xl mx-auto space-y-4"
    >
      {/* Lesson Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn(
            "text-xs font-semibold px-2.5 py-1 rounded-full border",
            colorMap[module.color] || colorMap.teal
          )}>
            Way {module.number}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {lesson.duration}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs text-teal-600 font-semibold ml-auto">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          )}
        </div>

        {/* Content */}
        <div className="prose-sm max-w-none">
          {lesson.content && renderContent(lesson.content)}
        </div>
      </div>

      {/* Notes Panel */}
      <NotesPanel lessonId={lesson.id} lessonTitle={lesson.title} />

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3">
        {!isCompleted ? (
          <Button
            onClick={handleMarkComplete}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark as Complete
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-sm text-teal-600 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            Lesson Completed
          </div>
        )}

        {hasNext && (
          <Button
            onClick={onNext}
            variant="outline"
            className="flex items-center gap-2 ml-auto"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
