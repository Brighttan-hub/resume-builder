/**
 * Shared types between client and server
 */

// ─── Legacy ───────────────────────────────────────────────────────────────────

export interface DemoResponse {
  message: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface SignUpRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface UserPublic {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

// ─── Resume ───────────────────────────────────────────────────────────────────

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

export interface ResumeData {
  id?: number;
  userId?: number;
  title: string;
  status: "draft" | "complete";
  domain?: string;
  templateId?: string;
  experienceLevel?: "no-experience" | "one-year" | "five-years";
  isStudent?: boolean;
  educationLevel?: string;
  layoutColumns?: string;
  withPhoto?: boolean;
  jobTitle?: string;
  phone?: string;
  location?: string;
  summary?: string;
  experience?: ExperienceEntry[];
  education?: EducationEntry[];
  skills?: string[];
  aiSuggestionsApplied?: number;
  resumeScore?: number;
  downloadCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateResumeRequest {
  title?: string;
  domain?: string;
  templateId?: string;
  experienceLevel?: "no-experience" | "one-year" | "five-years";
  isStudent?: boolean;
  educationLevel?: string;
  layoutColumns?: string;
  withPhoto?: boolean;
  jobTitle?: string;
  phone?: string;
  location?: string;
  summary?: string;
  experience?: ExperienceEntry[];
  education?: EducationEntry[];
  skills?: string[];
  aiSuggestionsApplied?: number;
  resumeScore?: number;
}

export interface UpdateResumeRequest extends Partial<CreateResumeRequest> {
  status?: "draft" | "complete";
}

// ─── API helpers ──────────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  details?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
