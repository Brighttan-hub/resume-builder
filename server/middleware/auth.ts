import { RequestHandler } from "express";
import { db } from "../db";
import { sessions } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

// Attach req.userId if a valid Bearer token is present
export const requireAuth: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const [session] = await db.select().from(sessions).where(eq(sessions.token, token));
    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ error: "Session expired or invalid" });
    }
    (req as any).userId = session.userId;
    next();
  } catch (err) {
    console.error("auth middleware error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
