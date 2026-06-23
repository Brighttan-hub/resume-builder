import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

interface TipSet {
  headline: string;
  tips: string[];
}

// Per-step AI tips — indexed by step number (1-based)
const stepTips: Record<number, TipSet> = {
  1: {
    headline: "Why experience level matters",
    tips: [
      "Be honest about your experience. Recruiters can tell if you overstate your level.",
      "Entry-level candidates: focus on education, projects, and internships instead.",
      "5+ years? Lead with measurable achievements — not just responsibilities.",
    ],
  },
  2: {
    headline: "Student vs professional resume tips",
    tips: [
      "Students: highlight GPA (if ≥ 3.5), extracurriculars, and academic projects.",
      "Student resumes should emphasise transferable skills and internships.",
      "Not a student? Skip the education-first format — lead with experience.",
    ],
  },
  3: {
    headline: "How to present your education",
    tips: [
      "Include GPA only if it's 3.5 / 8.0 or higher — it helps, never hurts.",
      "List your highest degree first.",
      "Add relevant coursework or thesis title if it matches the job you're targeting.",
    ],
  },
  4: {
    headline: "Choosing the right template",
    tips: [
      "ATS-Ready templates have the highest pass rate for large-company applicant tracking systems.",
      "Creative templates stand out for design, media and arts roles.",
      "Executive templates are best for senior roles — they signal authority.",
      "Minimal templates are great for academic and research positions.",
    ],
  },
  5: {
    headline: "Writing a strong professional summary",
    tips: [
      "Start with: years of experience + core expertise + 1 standout achievement.",
      "Keep it 2–3 sentences max. Recruiters spend 7 seconds on first scan.",
      "Use keywords from the job description in your summary — ATS picks them up.",
      "Avoid clichés like 'detail-oriented team player'. Show, don't tell.",
    ],
  },
  6: {
    headline: "Work history best practices",
    tips: [
      "Use the CAR formula: Context → Action → Result for every bullet point.",
      "Quantify everything: '35% increase', '$2M revenue', '10-person team'.",
      "Start every bullet with a strong action verb: Led, Built, Reduced, Launched.",
      "List only the last 10–15 years of experience for senior professionals.",
    ],
  },
  7: {
    headline: "Education details that get noticed",
    tips: [
      "Include honours, distinctions or awards in the activities field.",
      "List your final year GPA or CGPA if it's above average.",
      "Add certifications or professional qualifications here if relevant.",
    ],
  },
  8: {
    headline: "Skills that pass ATS filters",
    tips: [
      "Mirror the exact skill names from the job description — ATS matches keywords literally.",
      "List 8–12 technical skills. Too many looks padded; too few looks weak.",
      "Separate hard skills (tools, languages) from soft skills (leadership, communication).",
      "Add your proficiency level for languages — recruiters value transparency.",
    ],
  },
  9: {
    headline: "Projects that impress recruiters",
    tips: [
      "Include a live link or GitHub URL — it proves the project exists.",
      "Mention the tech stack and your specific role in the project.",
      "Lead with the outcome: 'Built X that achieved Y' is more powerful than describing features.",
      "Academic projects count — especially for freshers and students.",
    ],
  },
  10: {
    headline: "Certifications that add real value",
    tips: [
      "Only list certifications relevant to the role you're targeting.",
      "Include the credential ID when available — it adds authenticity.",
      "Online certs (Coursera, Udemy) are fine, but vendor certs (AWS, Google, Microsoft) carry more weight.",
    ],
  },
  11: {
    headline: "Achievements that stand out",
    tips: [
      "Awards, publications, patents, hackathon wins — all count here.",
      "Quantify the achievement if possible: '1st out of 200 teams'.",
      "Include the year — recent achievements (within 5 years) are more relevant.",
    ],
  },
  12: {
    headline: "References done right",
    tips: [
      "Always inform your references before sharing their details.",
      "Choose people who can speak to your work quality, not just character.",
      "If space is tight, write 'References available on request' instead.",
    ],
  },
  13: {
    headline: "Final checks before downloading",
    tips: [
      "Read your resume aloud — awkward phrasing becomes obvious.",
      "Check for consistent tense: present for current roles, past for previous.",
      "Make sure your email and phone number are correct.",
      "Run a spell check. One typo can cost you the interview.",
      "Save as PDF to preserve formatting across all devices.",
    ],
  },
};

interface Props {
  step: number;
}

export default function BuilderAITip({ step }: Props) {
  const [open, setOpen] = useState(true);
  const [tipIdx, setTipIdx] = useState(0);
  const set = stepTips[step];
  if (!set) return null;

  const nextTip = () => setTipIdx(i => (i + 1) % set.tips.length);

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-5 rounded-2xl overflow-hidden border border-primary/20"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/15 hover:to-secondary/15 smooth-transition"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="flex-1 text-left text-sm font-semibold text-foreground/80">
          🤖 AI Tip — {set.headline}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-foreground/40" /> : <ChevronDown className="w-4 h-4 text-foreground/40" />}
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 bg-primary/[0.04]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIdx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-foreground/75 leading-relaxed"
                >
                  💡 {set.tips[tipIdx]}
                </motion.p>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-3">
                {/* Dot indicators */}
                <div className="flex gap-1">
                  {set.tips.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTipIdx(i)}
                      className={`w-1.5 h-1.5 rounded-full smooth-transition ${i === tipIdx ? "bg-primary w-4" : "bg-foreground/20"}`}
                    />
                  ))}
                </div>
                {/* Next tip button */}
                {set.tips.length > 1 && (
                  <button
                    onClick={nextTip}
                    className="flex items-center gap-1 text-xs text-primary font-semibold hover:gap-2 smooth-transition"
                  >
                    <RefreshCw className="w-3 h-3" /> Next tip
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
