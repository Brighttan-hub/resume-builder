import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, FileText, LayoutTemplate } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Navigation />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[140px]"
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[140px]"
          animate={{ scale: [1.2, 1, 1.2], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <main className="flex-1 flex items-center justify-center relative z-10 px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto text-center">

          {/* 404 number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="relative mb-6"
          >
            <span
              className="text-[180px] sm:text-[220px] font-black leading-none select-none"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0.15,
              }}
            >
              404
            </span>

            {/* Floating emoji over the 404 */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-7xl sm:text-8xl">📄</span>
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl font-bold gradient-text mb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            className="text-lg text-foreground/60 mb-10 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Looks like this page went missing from the resume. Let's get you back on track.
          </motion.p>

          {/* Quick links */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-primary/40 smooth-transition overflow-hidden"
              >
                <motion.span className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-12 group-hover:translate-x-[200%] transition-transform duration-700" />
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/create-resume"
                className="inline-flex items-center gap-2 px-8 py-4 card-blur text-foreground font-bold rounded-2xl hover:border-primary/50 smooth-transition"
              >
                <FileText className="w-5 h-5 text-primary" />
                Build Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Helpful links grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            {[
              { to: "/template-picker", icon: LayoutTemplate, label: "Browse Templates", desc: "Pick your style" },
              { to: "/ai-suggestions",  icon: "🤖",           label: "AI Suggestions",  desc: "Improve your resume" },
              { to: "/dashboard",       icon: FileText,       label: "Dashboard",        desc: "Manage your resumes" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.to}
                  className="card-blur p-4 rounded-2xl flex flex-col items-center gap-2 hover:border-primary/40 smooth-transition"
                >
                  {typeof item.icon === "string" ? (
                    <span className="text-2xl">{item.icon}</span>
                  ) : (
                    <item.icon className="w-6 h-6 text-primary" />
                  )}
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-foreground/50">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Path display */}
          <motion.p
            className="mt-8 text-xs text-foreground/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Tried to access: <span className="font-mono text-foreground/50">{location.pathname}</span>
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
