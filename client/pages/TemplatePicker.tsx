import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Navigation from "@/components/Navigation";

const domains = [
  {
    id: "it",
    emoji: "💻",
    title: "IT & Software Development",
    description: "Modern ATS-friendly developer templates",
    color: "from-blue-500 to-cyan-500",
    bg: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/40",
    glow: "shadow-blue-500/30",
  },
  {
    id: "nursing",
    emoji: "🏥",
    title: "Nursing & Healthcare",
    description: "Professional healthcare resume templates",
    color: "from-rose-500 to-pink-500",
    bg: "from-rose-500/10 to-pink-500/10",
    border: "border-rose-500/40",
    glow: "shadow-rose-500/30",
  },
  {
    id: "design",
    emoji: "🎨",
    title: "UI/UX & Graphic Design",
    description: "Creative portfolio-style templates",
    color: "from-purple-500 to-fuchsia-500",
    bg: "from-purple-500/10 to-fuchsia-500/10",
    border: "border-purple-500/40",
    glow: "shadow-purple-500/30",
  },
  {
    id: "business",
    emoji: "📈",
    title: "Business & Management",
    description: "Executive resume templates",
    color: "from-amber-500 to-orange-500",
    bg: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-500/40",
    glow: "shadow-amber-500/30",
  },
  {
    id: "finance",
    emoji: "💰",
    title: "Finance & Accounting",
    description: "Corporate finance resume templates",
    color: "from-green-500 to-emerald-500",
    bg: "from-green-500/10 to-emerald-500/10",
    border: "border-green-500/40",
    glow: "shadow-green-500/30",
  },
  {
    id: "law",
    emoji: "⚖",
    title: "Law & Legal",
    description: "Authoritative legal professional templates",
    color: "from-slate-600 to-slate-500",
    bg: "from-slate-500/10 to-slate-400/10",
    border: "border-slate-500/40",
    glow: "shadow-slate-500/30",
  },
  {
    id: "civil",
    emoji: "🏗",
    title: "Civil Engineering",
    description: "Structured engineering resume templates",
    color: "from-yellow-600 to-amber-500",
    bg: "from-yellow-600/10 to-amber-500/10",
    border: "border-yellow-500/40",
    glow: "shadow-yellow-500/30",
  },
  {
    id: "mechanical",
    emoji: "⚙",
    title: "Mechanical Engineering",
    description: "Technical mechanical engineering layouts",
    color: "from-zinc-600 to-zinc-500",
    bg: "from-zinc-500/10 to-zinc-400/10",
    border: "border-zinc-500/40",
    glow: "shadow-zinc-500/30",
  },
  {
    id: "electrical",
    emoji: "⚡",
    title: "Electrical & Electronics",
    description: "Precise EEE field resume templates",
    color: "from-yellow-400 to-orange-400",
    bg: "from-yellow-400/10 to-orange-400/10",
    border: "border-yellow-400/40",
    glow: "shadow-yellow-400/30",
  },
  {
    id: "education",
    emoji: "📚",
    title: "Education & Teaching",
    description: "Teacher and educator resume templates",
    color: "from-teal-500 to-cyan-500",
    bg: "from-teal-500/10 to-cyan-500/10",
    border: "border-teal-500/40",
    glow: "shadow-teal-500/30",
  },
  {
    id: "marketing",
    emoji: "📣",
    title: "Marketing & Sales",
    description: "Bold, results-driven sales templates",
    color: "from-orange-500 to-red-500",
    bg: "from-orange-500/10 to-red-500/10",
    border: "border-orange-500/40",
    glow: "shadow-orange-500/30",
  },
  {
    id: "media",
    emoji: "🎬",
    title: "Media & Communication",
    description: "Creative media industry templates",
    color: "from-pink-500 to-rose-500",
    bg: "from-pink-500/10 to-rose-500/10",
    border: "border-pink-500/40",
    glow: "shadow-pink-500/30",
  },
  {
    id: "hospitality",
    emoji: "🏨",
    title: "Hospitality & Tourism",
    description: "Welcoming hospitality career templates",
    color: "from-sky-500 to-blue-500",
    bg: "from-sky-500/10 to-blue-500/10",
    border: "border-sky-500/40",
    glow: "shadow-sky-500/30",
  },
  {
    id: "science",
    emoji: "🔬",
    title: "Science & Research",
    description: "Academic and research-focused templates",
    color: "from-indigo-500 to-violet-500",
    bg: "from-indigo-500/10 to-violet-500/10",
    border: "border-indigo-500/40",
    glow: "shadow-indigo-500/30",
  },
  {
    id: "logistics",
    emoji: "🚚",
    title: "Logistics & Supply Chain",
    description: "Operations and logistics templates",
    color: "from-lime-600 to-green-500",
    bg: "from-lime-600/10 to-green-500/10",
    border: "border-lime-500/40",
    glow: "shadow-lime-500/30",
  },
  {
    id: "hr",
    emoji: "👨‍💼",
    title: "Human Resources",
    description: "People-focused HR resume templates",
    color: "from-violet-500 to-purple-500",
    bg: "from-violet-500/10 to-purple-500/10",
    border: "border-violet-500/40",
    glow: "shadow-violet-500/30",
  },
  {
    id: "aviation",
    emoji: "✈",
    title: "Aviation",
    description: "Precision aviation industry templates",
    color: "from-cyan-500 to-blue-500",
    bg: "from-cyan-500/10 to-blue-500/10",
    border: "border-cyan-500/40",
    glow: "shadow-cyan-500/30",
  },
  {
    id: "arts",
    emoji: "🎭",
    title: "Arts & Creative",
    description: "Expressive arts and creative templates",
    color: "from-fuchsia-500 to-pink-500",
    bg: "from-fuchsia-500/10 to-pink-500/10",
    border: "border-fuchsia-500/40",
    glow: "shadow-fuchsia-500/30",
  },
  {
    id: "retail",
    emoji: "🛒",
    title: "Retail & Customer Service",
    description: "Customer-facing role resume templates",
    color: "from-emerald-500 to-teal-500",
    bg: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/40",
    glow: "shadow-emerald-500/30",
  },
  {
    id: "other",
    emoji: "📦",
    title: "Others",
    description: "General purpose resume templates",
    color: "from-gray-500 to-slate-500",
    bg: "from-gray-500/10 to-slate-500/10",
    border: "border-gray-500/40",
    glow: "shadow-gray-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function TemplatePicker() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected) {
      navigate(`/templates?domain=${selected}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 pt-28 pb-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 card-blur px-4 py-2 rounded-full text-sm font-semibold mb-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              ✨ Personalized for your industry
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 gradient-text leading-tight">
              Choose Your Career Domain
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Select your profession to discover resume templates specifically
              designed for your industry.
            </p>
          </motion.div>

          {/* Domain Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {domains.map((domain) => {
              const isSelected = selected === domain.id;
              return (
                <motion.button
                  key={domain.id}
                  variants={cardVariants}
                  onClick={() => setSelected(domain.id)}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`
                    relative group text-left rounded-[20px] p-5 border-2 overflow-hidden
                    transition-all duration-300 cursor-pointer
                    ${isSelected
                      ? `bg-gradient-to-br ${domain.bg} ${domain.border} shadow-xl ${domain.glow}`
                      : "card-blur border-border/50 hover:border-border"
                    }
                  `}
                >
                  {/* Selected checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className={`absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-br ${domain.color} flex items-center justify-center`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Glow overlay on hover */}
                  <div
                    className={`absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${domain.bg}`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      className={`
                        text-3xl mb-3 w-12 h-12 rounded-xl flex items-center justify-center
                        transition-transform duration-300 group-hover:scale-110
                        ${isSelected ? `bg-gradient-to-br ${domain.color} shadow-lg` : "bg-foreground/5"}
                      `}
                    >
                      {domain.emoji}
                    </div>
                    <h3
                      className={`font-semibold text-sm leading-snug mb-1 transition-colors duration-200 ${
                        isSelected ? "text-foreground" : "text-foreground/90"
                      }`}
                    >
                      {domain.title}
                    </h3>
                    <p className="text-foreground/50 text-xs leading-relaxed">
                      {domain.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Fixed Continue Button */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-8 pt-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Frosted bar behind button */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-lg border-t border-border/30" />

            <motion.button
              onClick={handleContinue}
              className="relative z-10 group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-base rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>
                Continue
                {selected && (
                  <span className="font-normal opacity-80 ml-1">
                    — {domains.find((d) => d.id === selected)?.title}
                  </span>
                )}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
