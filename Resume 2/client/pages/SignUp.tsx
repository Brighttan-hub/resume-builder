import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (name === "password") {
      let s = 0;
      if (value.length >= 8) s++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) s++;
      if (/\d/.test(value)) s++;
      if (/[^a-zA-Z\d]/.test(value)) s++;
      setPasswordStrength(s);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await signUp({ fullName: formData.fullName, email: formData.email, password: formData.password });
      navigate("/create-resume");
    } catch (err: any) {
      setError(err.message ?? "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-orange-400", "bg-green-500"][passwordStrength];

  return (
    <div className="min-h-screen bg-background dark:bg-background text-foreground">
      <CustomCursor />
      <Navigation />

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse animation-delay-4000" />
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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">Get Started</h1>
              <p className="text-foreground/70">Create your account to build amazing resumes</p>
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-foreground/50" />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-foreground/10 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary smooth-transition focus:ring-2 focus:ring-primary/20"
                    required />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-foreground/50" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-foreground/10 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary smooth-transition focus:ring-2 focus:ring-primary/20"
                    required />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-foreground/50" />
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-foreground/10 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary smooth-transition focus:ring-2 focus:ring-primary/20"
                    required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-foreground/50 hover:text-foreground smooth-transition">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div className={`h-full ${strengthColor} smooth-transition`} style={{ width: `${(passwordStrength / 4) * 100}%` }} />
                    </div>
                    <p className="text-xs text-foreground/60">Strength: {strengthLabel}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-foreground/50" />
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-foreground/10 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary smooth-transition focus:ring-2 focus:ring-primary/20"
                    required />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-foreground/50 hover:text-foreground smooth-transition">
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="text-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange}
                    className="w-4 h-4 rounded accent-primary mt-0.5" required />
                  <span className="text-foreground/70">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:text-primary/80">Terms of Service</a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:text-primary/80">Privacy Policy</a>
                  </span>
                </label>
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
                    Creating account…
                  </span>
                ) : (
                  <>Create Account <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-foreground/20" /></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background/50 text-foreground/70">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="px-4 py-3 border border-foreground/20 rounded-lg hover:bg-foreground/10 smooth-transition font-medium">Google</button>
              <button className="px-4 py-3 border border-foreground/20 rounded-lg hover:bg-foreground/10 smooth-transition font-medium">GitHub</button>
            </div>

            <div className="mt-8 text-center text-foreground/70">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary hover:text-primary/80 font-semibold smooth-transition">Sign in here</Link>
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
