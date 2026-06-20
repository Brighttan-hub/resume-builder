import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const experienceLevelEnum = pgEnum("experience_level", [
  "no-experience",
  "one-year",
  "five-years",
]);

export const resumeStatusEnum = pgEnum("resume_status", [
  "draft",
  "complete",
]);

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Resumes ──────────────────────────────────────────────────────────────────

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Meta
  title: text("title").notNull().default("Untitled Resume"),
  status: resumeStatusEnum("status").default("draft").notNull(),
  domain: text("domain"), // e.g. "it", "nursing", "design"
  templateId: text("template_id"), // e.g. "modern", "classic"

  // Builder prefs
  experienceLevel: experienceLevelEnum("experience_level"),
  isStudent: boolean("is_student").default(false),
  educationLevel: text("education_level"),
  layoutColumns: text("layout_columns").default("one-col"),
  withPhoto: boolean("with_photo").default(false),

  // Personal info
  jobTitle: text("job_title"),
  phone: text("phone"),
  location: text("location"),
  summary: text("summary"),

  // Structured JSON sections
  experience: jsonb("experience").$type<ExperienceEntry[]>().default([]),
  education: jsonb("education").$type<EducationEntry[]>().default([]),
  skills: jsonb("skills").$type<string[]>().default([]),

  // AI
  aiSuggestionsApplied: integer("ai_suggestions_applied").default(0),
  resumeScore: integer("resume_score").default(42),

  // Downloads
  downloadCount: integer("download_count").default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── JSON section types (shared with client via shared/api.ts) ────────────────

export interface ExperienceEntry {
  position: string;
  company: string;
  duration: string;
  details: string;
}

export interface EducationEntry {
  degree: string;
  school: string;
  year: string;
}

// ─── Sessions (simple token-based) ───────────────────────────────────────────

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Legacy notes (kept to avoid breaking existing migration) ─────────────────

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
