import { RequestHandler } from "express";
import { db } from "../db";
import { users, resumes } from "../../drizzle/schema";
import { eq, count } from "drizzle-orm";
import { scryptSync, randomBytes } from "node:crypto";
import type { ApiError } from "@shared/api";

// ─── GET /api/users/me/stats ──────────────────────────────────────────────────

export const getUserStats: RequestHandler = async (req, res) => {
  const userId = (req as any).userId as number;

  try {
    const [resumeStats] = await db
      .select({ total: count() })
      .from(resumes)
      .where(eq(resumes.userId, userId));

    // Sum downloads
    const allResumes = await db
      .select({ downloadCount: resumes.downloadCount, resumeScore: resumes.resumeScore })
      .from(resumes)
      .where(eq(resumes.userId, userId));

    const totalDownloads = allResumes.reduce((s, r) => s + (r.downloadCount ?? 0), 0);
    const avgScore =
      allResumes.length > 0
        ? Math.round(allResumes.reduce((s, r) => s + (r.resumeScore ?? 0), 0) / allResumes.length)
        : 0;

    return res.status(200).json({
      resumesCreated: resumeStats.total,
      totalDownloads,
      avgResumeScore: avgScore,
      profileViews: Math.floor(Math.random() * 200) + 10, // placeholder
      jobMatches: Math.floor(Math.random() * 80) + 10,    // placeholder
    });
  } catch (err) {
    console.error("getUserStats error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};

// ─── PATCH /api/users/me  (update profile) ───────────────────────────────────

export const updateProfile: RequestHandler = async (req, res) => {
  const userId = (req as any).userId as number;
  const { fullName } = req.body as { fullName?: string };

  if (!fullName) {
    return res.status(400).json({ error: "fullName is required" } satisfies ApiError);
  }

  try {
    const [updated] = await db
      .update(users)
      .set({ fullName, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning({ id: users.id, fullName: users.fullName, email: users.email, createdAt: users.createdAt });

    return res.status(200).json({
      id: updated.id,
      fullName: updated.fullName,
      email: updated.email,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};

// ─── PATCH /api/users/me/password  (change password) ─────────────────────────

export const changePassword: RequestHandler = async (req, res) => {
  const userId = (req as any).userId as number;
  const { currentPassword, newPassword } = req.body as { currentPassword?: string; newPassword?: string };

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "currentPassword and newPassword are required" } satisfies ApiError);
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ error: "New password must be at least 8 characters" } satisfies ApiError);
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) return res.status(404).json({ error: "User not found" } satisfies ApiError);

    const [salt, hash] = user.passwordHash.split(":");
    const derived = scryptSync(currentPassword, salt, 64);
    const stored = Buffer.from(hash, "hex");
    const match = derived.length === stored.length &&
      derived.every((b, i) => b === stored[i]);

    if (!match) return res.status(401).json({ error: "Current password is incorrect" } satisfies ApiError);

    const newSalt = randomBytes(16).toString("hex");
    const newHash = scryptSync(newPassword, newSalt, 64).toString("hex");
    const newPasswordHash = `${newSalt}:${newHash}`;

    await db.update(users).set({ passwordHash: newPasswordHash, updatedAt: new Date() }).where(eq(users.id, userId));
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("changePassword error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};
