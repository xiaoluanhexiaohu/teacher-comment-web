export type Role = 'admin' | 'teacher';

export interface User { id: string; email: string; role: Role; name: string; school_name?: string }
export interface ClassEntity { id: string; teacher_id: string; grade: string; class_name: string; academic_year?: string }
export interface Student { id: string; teacher_id: string; class_id: string; student_no?: string; name: string; grade?: string; subject?: string; score?: number; strengths?: string; weaknesses?: string; performance_summary?: string; homework_status?: string; teacher_notes?: string }
export interface Template { id: string; owner_id: string; title: string; grade?: string; subject?: string; style?: string; scenario?: string; content: string; is_public: boolean; is_enabled: boolean; version_no: number }
export interface GeneratedComment {
  id: string; teacher_id: string; student_id: string; template_id?: string; final_comment: string; draft_comment: string;
  output_structured: Record<string, string>; created_at: string
}
export interface GenerationJob { id: string; teacher_id: string; mode: 'single' | 'batch'; status: string; total_count: number; success_count: number; fail_count: number; created_at: string }
