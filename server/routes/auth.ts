import { RequestHandler } from "express";
import { db } from "../db";
import { users, sessions } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { SignUpRequest, SignInRequest, AuthResponse, ApiError } from "@shared/api";

// ─── Crypto helpers ───────────────────────────────────────────────────────────

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const hashBuffer = Buffer.from(hash, "hex");
  const derivedHash = scryptSync(password, salt, 64);
  return timingSafeEqual(hashBuffer, derivedHash);
}

function generateToken(): string {
  return randomBytes(32).toString("hex");
}

// ─── POST /api/auth/signup ────────────────────────────────────────────────────

export const handleSignUp: RequestHandler = async (req, res) => {
  const { fullName, email, password } = req.body as SignUpRequest;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "fullName, email and password are required" } satisfies ApiError);
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" } satisfies ApiError);
  }

  try {
    // Check duplicate email
    const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email.toLowerCase()));
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already registered" } satisfies ApiError);
    }

    const passwordHash = hashPassword(password);
    const [user] = await db
      .insert(users)
      .values({ fullName, email: email.toLowerCase(), passwordHash })
      .returning({ id: users.id, fullName: users.fullName, email: users.email, createdAt: users.createdAt });

    // Create session token (30 days)
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await db.insert(sessions).values({ userId: user.id, token, expiresAt });

    const response: AuthResponse = {
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, createdAt: user.createdAt.toISOString() },
    };
    return res.status(201).json(response);
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};

// ─── POST /api/auth/signin ────────────────────────────────────────────────────

export const handleSignIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body as SignInRequest;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" } satisfies ApiError);
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid email or password" } satisfies ApiError);
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await db.insert(sessions).values({ userId: user.id, token, expiresAt });

    const response: AuthResponse = {
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, createdAt: user.createdAt.toISOString() },
    };
    return res.status(200).json(response);
  } catch (err) {
    console.error("signin error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};

// ─── POST /api/auth/signout ───────────────────────────────────────────────────

export const handleSignOut: RequestHandler = async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token) {
    try {
      await db.delete(sessions).where(eq(sessions.token, token));
    } catch (_) { /* best effort */ }
  }
  return res.status(200).json({ message: "Signed out" });
};

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────

export const handleMe: RequestHandler = async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token provided" } satisfies ApiError);

  try {
    const [session] = await db.select().from(sessions).where(eq(sessions.token, token));
    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ error: "Session expired" } satisfies ApiError);
    }

    const [user] = await db
      .select({ id: users.id, fullName: users.fullName, email: users.email, createdAt: users.createdAt })
      .from(users)
      .where(eq(users.id, session.userId));

    if (!user) return res.status(401).json({ error: "User not found" } satisfies ApiError);

    return res.status(200).json({ id: user.id, fullName: user.fullName, email: user.email, createdAt: user.createdAt.toISOString() });
  } catch (err) {
    console.error("me error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};
