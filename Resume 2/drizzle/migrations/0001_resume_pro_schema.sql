-- Migration: ResumePro full schema
-- Creates users, sessions, resumes tables with enums

DO $$ BEGIN
  CREATE TYPE "experience_level" AS ENUM ('no-experience', 'one-year', 'five-years');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "resume_status" AS ENUM ('draft', 'complete');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Users
CREATE TABLE IF NOT EXISTS "users" (
  "id"            serial PRIMARY KEY NOT NULL,
  "full_name"     text NOT NULL,
  "email"         text NOT NULL UNIQUE,
  "password_hash" text NOT NULL,
  "created_at"    timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at"    timestamp with time zone DEFAULT now() NOT NULL
);

-- Sessions
CREATE TABLE IF NOT EXISTS "sessions" (
  "id"         serial PRIMARY KEY NOT NULL,
  "user_id"    integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "token"      text NOT NULL UNIQUE,
  "expires_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Resumes
CREATE TABLE IF NOT EXISTS "resumes" (
  "id"                       serial PRIMARY KEY NOT NULL,
  "user_id"                  integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "title"                    text NOT NULL DEFAULT 'Untitled Resume',
  "status"                   "resume_status" NOT NULL DEFAULT 'draft',
  "domain"                   text,
  "template_id"              text,
  "experience_level"         "experience_level",
  "is_student"               boolean DEFAULT false,
  "education_level"          text,
  "layout_columns"           text DEFAULT 'one-col',
  "with_photo"               boolean DEFAULT false,
  "job_title"                text,
  "phone"                    text,
  "location"                 text,
  "summary"                  text,
  "experience"               jsonb DEFAULT '[]',
  "education"                jsonb DEFAULT '[]',
  "skills"                   jsonb DEFAULT '[]',
  "ai_suggestions_applied"   integer DEFAULT 0,
  "resume_score"             integer DEFAULT 42,
  "download_count"           integer DEFAULT 0,
  "created_at"               timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at"               timestamp with time zone DEFAULT now() NOT NULL
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS "sessions_token_idx"    ON "sessions"("token");
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx"  ON "sessions"("user_id");
CREATE INDEX IF NOT EXISTS "resumes_user_id_idx"   ON "resumes"("user_id");
