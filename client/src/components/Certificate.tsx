// ============================================================
// CERTIFICATE: Completion certificate with Dr. Vicki Bealman signature
// Design: Elegant gold/teal, print-ready, LinkedIn share
// ============================================================
import { useCourse } from "@/contexts/CourseContext";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Download,
  CheckCircle2,
  Star,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Certificate() {
  const { learnerName, progress, isCourseComplete } = useCourse();

  const completionDate = progress.completedAt
    ? new Date(progress.completedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  if (!isCourseComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2 font-display">Certificate Not Yet Earned</h2>
          <p className="text-slate-500 text-sm">
            Complete all 10 modules and their knowledge checks to earn your certificate.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #certificate-print, #certificate-print * { visibility: visible !important; }
          #certificate-print { position: fixed !important; inset: 0 !important; display: flex !important; align-items: center !important; justify-content: center !important; background: white !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-4"
      >
        {/* Certificate Card */}
        <div id="certificate-print">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border-2 border-amber-200/60 shadow-xl overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-2 bg-gradient-to-r from-teal-500 via-teal-400 to-amber-400" />

            <div className="px-8 py-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300/50" />
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border-2 border-amber-300/50 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300/50" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">
                  Certificate of Completion
                </p>
                <h1 className="text-3xl font-bold text-slate-800 font-display leading-tight">
                  10 Ways to Use ChatGPT
                </h1>
                <p className="text-lg font-semibold text-teal-600 mt-0.5">for Business Owners</p>
              </motion.div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-slate-200" />
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Awarded to */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-6"
              >
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">This certifies that</p>
                <p className="text-3xl font-bold text-teal-700 font-display">
                  {learnerName || "Course Graduate"}
                </p>
                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                  has successfully completed all 10 modules of this course, demonstrating proficiency in 
                  using ChatGPT for content creation, customer service, market research, sales, HR, 
                  strategy, data analysis, legal drafting, and personal productivity.
                </p>
              </motion.div>

              {/* Footer with signature */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-end justify-between gap-8 mt-6 pt-6 border-t border-slate-100"
              >
                {/* Date */}
                <div className="text-center">
                  <p className="text-lg font-semibold text-slate-700">{completionDate}</p>
                  <div className="h-px w-32 bg-slate-300 mt-1 mb-1" />
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Date Completed</p>
                </div>

                {/* Seal */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-full bg-teal-500/10 border-2 border-teal-400/40 flex items-center justify-center">
                    <Bot className="w-7 h-7 text-teal-600" />
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                </div>

                {/* Signature */}
                <div className="text-center">
                  <img
                    src="/manus-storage/VickiSignature_ecde896a.png"
                    alt="Dr. Vicki Bealman signature"
                    className="h-16 w-auto mx-auto mb-1 object-contain"
                    style={{ filter: "opacity(0.85)" }}
                    onError={(e) => {
                      // Fallback if signature image not found
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="h-px w-32 bg-slate-300 mb-1" />
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Instructor</p>
                  <p className="text-sm font-semibold text-slate-700">Dr. Vicki Bealman</p>
                </div>
              </motion.div>
            </div>

            {/* Bottom accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-teal-400 to-teal-500" />
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-3 justify-center flex-wrap"
        >
          <Button
            variant="outline"
            className="gap-2 border-slate-200"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4" />
            Print / Save Certificate
          </Button>
          <Button
            className="gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white border-0 shadow-sm"
            onClick={() => {
              const name = learnerName || "Course Graduate";
              const text = encodeURIComponent(
                `🎓 I just earned my certificate in "10 Ways to Use ChatGPT for Business Owners" — a Career Skills Course by Dr. Vicki Bealman!\n\nTopics covered:\n✅ Content Creation & Marketing\n✅ Customer Service Automation\n✅ Brainstorming & Ideation\n✅ Market Research & Competitor Analysis\n✅ Sales Scripting & Pitching\n✅ HR & Recruitment\n✅ Business Strategy & Planning\n✅ Data Analysis & Reporting\n✅ Legal & Contract Drafting\n✅ Personal Productivity & Learning\n\nProud to be using AI strategically in my business! #ChatGPT #AI #BusinessOwner #Productivity`
              );
              const url = encodeURIComponent(window.location.href);
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
                "_blank",
                "noopener,noreferrer,width=600,height=600"
              );
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Share on LinkedIn
          </Button>
        </motion.div>

        {/* Skills Earned */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
        >
          <h3 className="text-sm font-bold text-slate-700 mb-3 font-display">Skills Earned</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "ChatGPT Prompting", "Content Marketing", "Customer Service Automation",
              "Creative Brainstorming", "Market Research", "Competitor Analysis",
              "Sales Scripting", "Cold Email Writing", "HR & Recruitment",
              "Business Strategy", "OKR Framework", "Data Analysis",
              "Excel Formulas", "Legal Drafting", "Personal Productivity",
              "AI for Business", "Prompt Engineering", "Time Management",
            ].map((skill) => (
              <span
                key={skill}
                className="text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
