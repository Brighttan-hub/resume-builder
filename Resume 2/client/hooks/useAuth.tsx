import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi, getStoredUser, clearToken, setStoredUser, getToken } from "@/lib/api";
import type { UserPublic, SignUpRequest, SignInRequest } from "@shared/api";

// ─── Context ──────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: UserPublic | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (data: SignUpRequest) => Promise<void>;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPublic | null>(getStoredUser);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, silently verify the stored token is still valid.
  // If there's no token, or the server is unavailable (no DB, etc.),
  // just mark loading as done and continue — the UI still works fully.
  useEffect(() => {
    const verify = async () => {
      const token = getToken();

      // No token stored — nothing to verify, just load the page
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await authApi.me();
        setUser(me);
        setStoredUser(me);
      } catch {
        // Token invalid / server unavailable — clear it silently
        clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, []);

  const signUp = async (data: SignUpRequest) => {
    const res = await authApi.signUp(data);
    setUser(res.user);
  };

  const signIn = async (data: SignInRequest) => {
    const res = await authApi.signIn(data);
    setUser(res.user);
  };

  const signOut = async () => {
    try {
      await authApi.signOut();
    } catch {
      // Still clear locally even if server call fails
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
