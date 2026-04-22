import { z } from 'zod';

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
export const templateSchema = z.object({
  title: z.string().min(2),
  grade: z.string().optional(),
  subject: z.string().optional(),
  style: z.string().optional(),
  scenario: z.string().optional(),
  content: z.string().min(10),
  isPublic: z.boolean().default(false),
  isEnabled: z.boolean().default(true)
});
export const studentSchema = z.object({
  classId: z.string().min(1),
  studentNo: z.string().optional(),
  name: z.string().min(2),
  gender: z.string().optional(),
  grade: z.string().optional(),
  subject: z.string().optional(),
  score: z.number().min(0).max(100).optional(),
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
  performanceSummary: z.string().optional(),
  homeworkStatus: z.string().optional(),
  teacherNotes: z.string().optional()
});
export const generatePreviewSchema = z.object({ studentId: z.string(), templateId: z.string(), promptPresetId: z.string().optional(), extraRequirements: z.string().optional() });
