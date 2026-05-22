// ============================================================
// NOTES PANEL: Per-lesson notes with auto-save and download
// Design: Amber accent, clean textarea, word count
// ============================================================
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { StickyNote, ChevronDown, ChevronUp, Save, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NotesPanelProps {
  lessonId: string;
  lessonTitle: string;
}

const NOTES_STORAGE_KEY = "chatgpt-course-notes";

function loadAllNotes(): Record<string, { text: string; savedAt: string }> {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllNotes(notes: Record<string, { text: string; savedAt: string }>) {
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch {}
}

export default function NotesPanel({ lessonId, lessonTitle }: NotesPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const all = loadAllNotes();
    const note = all[lessonId];
    if (note) {
      setText(note.text);
      setSavedAt(note.savedAt);
    } else {
      setText("");
      setSavedAt(null);
    }
    setIsDirty(false);
  }, [lessonId]);

  const handleSave = useCallback(
    (value: string, silent = false) => {
      const all = loadAllNotes();
      const now = new Date().toISOString();
      if (value.trim()) {
        all[lessonId] = { text: value, savedAt: now };
        saveAllNotes(all);
        setSavedAt(now);
        setIsDirty(false);
        if (!silent) toast.success("Note saved");
      } else {
        delete all[lessonId];
        saveAllNotes(all);
        setSavedAt(null);
        setIsDirty(false);
        if (!silent) toast.info("Note cleared");
      }
    },
    [lessonId]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    setIsDirty(true);
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => handleSave(val, true), 2000);
  };

  const handleClear = () => {
    setText("");
    handleSave("", false);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const formatSavedAt = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Toggle Header */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center gap-2.5 px-4 py-3 hover:bg-slate-50 transition-colors"
      >
        <div className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center flex-shrink-0">
          <StickyNote className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <span className="text-sm font-semibold text-slate-700 flex-1 text-left">
          My Notes
          {text.trim() && (
            <span className="ml-2 text-xs font-normal text-amber-600">({wordCount} words)</span>
          )}
        </span>
        {isDirty && <span className="text-xs text-amber-500 font-medium">Unsaved</span>}
        {savedAt && !isDirty && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {formatSavedAt(savedAt)}
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {/* Notes Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-slate-100">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                placeholder={`Take notes on "${lessonTitle}"...`}
                className="w-full mt-3 min-h-[120px] p-3 text-sm text-slate-700 bg-amber-50/50 border border-amber-200/60 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-amber-300/50 placeholder:text-slate-400 leading-relaxed"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">{wordCount} words</span>
                <div className="flex gap-2">
                  {text.trim() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClear}
                      className="h-7 px-2 text-xs text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleSave(text)}
                    disabled={!isDirty}
                    className={cn(
                      "h-7 px-3 text-xs gap-1",
                      isDirty
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : "bg-slate-100 text-slate-400 cursor-default"
                    )}
                  >
                    <Save className="w-3 h-3" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
