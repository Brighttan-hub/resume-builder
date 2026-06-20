import { RequestHandler } from "express";
import { db } from "../db";
import { resumes } from "../../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import type { CreateResumeRequest, UpdateResumeRequest, ApiError } from "@shared/api";

// ─── GET /api/resumes  (list all for current user) ───────────────────────────

export const listResumes: RequestHandler = async (req, res) => {
  const userId = (req as any).userId as number;
  try {
    const rows = await db
      .select()
      .from(resumes)
      .where(eq(resumes.userId, userId))
      .orderBy(desc(resumes.updatedAt));
    return res.status(200).json(rows);
  } catch (err) {
    console.error("listResumes error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};

// ─── POST /api/resumes  (create) ─────────────────────────────────────────────

export const createResume: RequestHandler = async (req, res) => {
  const userId = (req as any).userId as number;
  const body = req.body as CreateResumeRequest;

  try {
    const [row] = await db
      .insert(resumes)
      .values({
        userId,
        title: body.title ?? "Untitled Resume",
        domain: body.domain,
        templateId: body.templateId,
        experienceLevel: body.experienceLevel,
        isStudent: body.isStudent ?? false,
        educationLevel: body.educationLevel,
        layoutColumns: body.layoutColumns ?? "one-col",
        withPhoto: body.withPhoto ?? false,
        jobTitle: body.jobTitle,
        phone: body.phone,
        location: body.location,
        summary: body.summary,
        experience: body.experience ?? [],
        education: body.education ?? [],
        skills: body.skills ?? [],
        aiSuggestionsApplied: body.aiSuggestionsApplied ?? 0,
        resumeScore: body.resumeScore ?? 42,
      })
      .returning();
    return res.status(201).json(row);
  } catch (err) {
    console.error("createResume error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};

// ─── GET /api/resumes/:id  (single) ──────────────────────────────────────────

export const getResume: RequestHandler = async (req, res) => {
  const userId = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" } satisfies ApiError);

  try {
    const [row] = await db
      .select()
      .from(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, userId)));

    if (!row) return res.status(404).json({ error: "Resume not found" } satisfies ApiError);
    return res.status(200).json(row);
  } catch (err) {
    console.error("getResume error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};

// ─── PATCH /api/resumes/:id  (update) ────────────────────────────────────────

export const updateResume: RequestHandler = async (req, res) => {
  const userId = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);
  const body = req.body as UpdateResumeRequest;

  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" } satisfies ApiError);

  // Build update object (only include defined fields)
  const updates: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  const fields: (keyof UpdateResumeRequest)[] = [
    "title", "status", "domain", "templateId", "experienceLevel",
    "isStudent", "educationLevel", "layoutColumns", "withPhoto",
    "jobTitle", "phone", "location", "summary",
    "experience", "education", "skills",
    "aiSuggestionsApplied", "resumeScore",
  ];

  for (const f of fields) {
    if (body[f] !== undefined) updates[f] = body[f];
  }

  try {
    const [row] = await db
      .update(resumes)
      .set(updates)
      .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))
      .returning();

    if (!row) return res.status(404).json({ error: "Resume not found" } satisfies ApiError);
    return res.status(200).json(row);
  } catch (err) {
    console.error("updateResume error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};

// ─── DELETE /api/resumes/:id ──────────────────────────────────────────────────

export const deleteResume: RequestHandler = async (req, res) => {
  const userId = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" } satisfies ApiError);

  try {
    const deleted = await db
      .delete(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))
      .returning({ id: resumes.id });

    if (deleted.length === 0) return res.status(404).json({ error: "Resume not found" } satisfies ApiError);
    return res.status(200).json({ message: "Deleted", id });
  } catch (err) {
    console.error("deleteResume error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};

// ─── POST /api/resumes/:id/download  (increment counter) ─────────────────────

export const trackDownload: RequestHandler = async (req, res) => {
  const userId = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" } satisfies ApiError);

  try {
    const [row] = await db
      .select({ count: resumes.downloadCount })
      .from(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, userId)));

    if (!row) return res.status(404).json({ error: "Resume not found" } satisfies ApiError);

    const [updated] = await db
      .update(resumes)
      .set({ downloadCount: (row.count ?? 0) + 1, updatedAt: new Date() })
      .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))
      .returning({ downloadCount: resumes.downloadCount });

    return res.status(200).json({ downloadCount: updated.downloadCount });
  } catch (err) {
    console.error("trackDownload error:", err);
    return res.status(500).json({ error: "Internal server error" } satisfies ApiError);
  }
};
