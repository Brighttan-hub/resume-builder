import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Component, ReactNode } from "react";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResumeBuilder from "./pages/ResumeBuilder";
import Dashboard from "./pages/Dashboard";
import TemplatePicker from "./pages/TemplatePicker";
import AISuggestions from "./pages/AISuggestions";
import Templates from "./pages/Templates";
import ResumePreview from "./pages/ResumePreview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ── Simple error boundary so one broken page never kills the whole app ─────────
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(err: Error) {
    return { hasError: true, message: err.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center bg-background text-foreground">
          <h1 className="text-3xl font-bold text-red-500">Something went wrong</h1>
          <p className="text-foreground/60 max-w-md">{this.state.message}</p>
          <button
            onClick={() => { this.setState({ hasError: false, message: "" }); window.location.href = "/"; }}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold"
          >
            Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/create-resume" element={<ResumeBuilder />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/template-picker" element={<TemplatePicker />} />
                <Route path="/ai-suggestions" element={<AISuggestions />} />
                <Route path="/templates" element={<Templates />} />
            <Route path="/resume-preview" element={<ResumePreview />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(
  <div className="relative">
    <App />
  </div>
);
