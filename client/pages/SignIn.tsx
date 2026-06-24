import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn({ email, password });
      toast.success("Welcome back! 🎉", {
        description: "You're now signed in. Let's build your resume.",
        duration: 3000,
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background text-foreground">
      <CustomCursor />
      <Navigation />

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse animation-delay-4000" />
          <div className="absolute -bottom-32 left-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <motion.div
          className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-blur p-8 sm:p-10 rounded-2xl backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
              <p className="text-foreground/70">Sign in to your account to continue building</p>
            </motion.div>

            {/* Error banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 mb-5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-foreground/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-foreground/10 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary smooth-transition focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-foreground/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-foreground/10 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary smooth-transition focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-foreground/50 hover:text-foreground smooth-transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80 smooth-transition">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-xl hover:shadow-primary/50 smooth-transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  <>Sign In <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-foreground/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background/50 text-foreground/70">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="px-4 py-3 border border-foreground/20 rounded-lg hover:bg-foreground/10 smooth-transition font-medium">Google</button>
              <button className="px-4 py-3 border border-foreground/20 rounded-lg hover:bg-foreground/10 smooth-transition font-medium">GitHub</button>
            </div>

            <div className="mt-8 text-center text-foreground/70">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold smooth-transition">
                Sign up here
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-foreground/60 hover:text-foreground smooth-transition inline-flex items-center gap-1">
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
