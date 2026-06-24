import { motion } from "framer-motion";

interface Props {
  fd: { fullName: string; email: string; phone: string; summary: string; jobTitle: string };
  workList: { company: string; position: string; description: string }[];
  skills: string[];
  eduList: { institution: string; degree: string }[];
  projects: { name: string }[];
  certs: { name: string }[];
}

interface Check { label: string; done: boolean; weight: number; }

export default function ResumeStrengthMeter({ fd, workList, skills, eduList, projects, certs }: Props) {
  const checks: Check[] = [
    { label: "Full name",           done: !!fd.fullName?.trim(),                          weight: 10 },
    { label: "Job title",           done: !!fd.jobTitle?.trim(),                          weight: 8  },
    { label: "Email",               done: !!fd.email?.trim(),                             weight: 8  },
    { label: "Phone",               done: !!fd.phone?.trim(),                             weight: 5  },
    { label: "Professional summary",done: (fd.summary?.trim().length ?? 0) >= 50,         weight: 12 },
    { label: "Work experience",     done: workList.some(w => w.company || w.position),    weight: 18 },
    { label: "Job description",     done: workList.some(w => (w.description?.length ?? 0) >= 30), weight: 10 },
    { label: "Education",           done: eduList.some(e => e.institution || e.degree),  weight: 10 },
    { label: "5+ skills",           done: skills.filter(Boolean).length >= 5,             weight: 10 },
    { label: "Projects",            done: projects.some(p => p.name),                     weight: 5  },
    { label: "Certifications",      done: certs.some(c => c.name),                        weight: 4  },
  ];

  const totalWeight = checks.reduce((s, c) => s + c.weight, 0);
  const earnedWeight = checks.filter(c => c.done).reduce((s, c) => s + c.weight, 0);
  const score = Math.round((earnedWeight / totalWeight) * 100);

  const { color, label, emoji } = score >= 85
    ? { color: "#22c55e", label: "Excellent", emoji: "🏆" }
    : score >= 65
    ? { color: "#f97316", label: "Good",      emoji: "⭐" }
    : score >= 40
    ? { color: "#fbbf24", label: "Fair",      emoji: "📈" }
    : { color: "#ef4444", label: "Weak",      emoji: "💪" };

  const circumference = 2 * Math.PI * 28;

  return (
    <div className="card-blur rounded-2xl p-4 mb-4">
      <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-3">Resume Strength</p>

      {/* Score ring */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="5" className="text-foreground/10" />
            <motion.circle
              cx="32" cy="32" r="28"
              fill="none"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-bold leading-none" style={{ color }}>{score}</span>
            <span className="text-[9px] text-foreground/40">/ 100</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-sm">{emoji}</span>
            <span className="font-bold text-sm" style={{ color }}>{label}</span>
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed">
            {score >= 85 ? "Your resume is job-ready!" :
             score >= 65 ? "Almost there — add more details" :
             score >= 40 ? "Keep filling in sections" :
             "Start filling in your details"}
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-1.5">
        {checks.map(c => (
          <div key={c.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
              c.done ? "bg-green-500/20 text-green-500" : "bg-foreground/8 text-foreground/30"
            }`}>
              {c.done ? "✓" : "○"}
            </div>
            <span className={`text-xs ${c.done ? "text-foreground/70 line-through" : "text-foreground/50"}`}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
