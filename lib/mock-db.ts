import { randomUUID } from 'crypto';
import type { ClassEntity, GeneratedComment, GenerationJob, Student, Template, User } from '@/lib/types';

export const users: User[] = [
  { id: 'u-admin', email: 'admin@school.cn', role: 'admin', name: '系统管理员', school_name: '示范小学' },
  { id: 'u-t1', email: 'zhang@school.cn', role: 'teacher', name: '张老师', school_name: '示范小学' },
  { id: 'u-t2', email: 'li@school.cn', role: 'teacher', name: '李老师', school_name: '示范小学' }
];
export const classes: ClassEntity[] = [
  { id: 'c1', teacher_id: 'u-t1', grade: '五年级', class_name: '五年级一班', academic_year: '2025-2026' },
  { id: 'c2', teacher_id: 'u-t1', grade: '五年级', class_name: '五年级二班', academic_year: '2025-2026' },
  { id: 'c3', teacher_id: 'u-t2', grade: '六年级', class_name: '六年级一班', academic_year: '2025-2026' }
];

export const students: Student[] = Array.from({ length: 20 }, (_, i) => ({
  id: `s${i + 1}`,
  teacher_id: i < 12 ? 'u-t1' : 'u-t2',
  class_id: i < 8 ? 'c1' : i < 12 ? 'c2' : 'c3',
  student_no: `2025${String(i + 1).padStart(3, '0')}`,
  name: `学生${i + 1}`,
  grade: i < 12 ? '五年级' : '六年级',
  subject: i % 2 === 0 ? '语文' : '数学',
  score: 78 + (i % 20),
  strengths: '课堂参与积极，作业完成较好',
  weaknesses: '审题细致度有待提升',
  performance_summary: '课堂整体表现认真，能主动回答问题',
  homework_status: '按时完成，偶有错题',
  teacher_notes: '建议持续阅读与错题整理'
}));

export const templates: Template[] = [
  { id: 't1', owner_id: 'u-t1', title: '期末综合评语模板', grade: '五年级', subject: '语文', style: '鼓励型', scenario: '学期评语', content: '该生在本学期学习态度积极，能够按时完成学习任务。', is_public: false, is_enabled: true, version_no: 1 },
  { id: 't2', owner_id: 'u-t1', title: '月度学习反馈模板', grade: '五年级', subject: '数学', style: '客观型', scenario: '月评语', content: '本月该生课堂参与较稳定，作业整体完成情况良好。', is_public: false, is_enabled: true, version_no: 1 },
  { id: 't3', owner_id: 'u-t1', title: '温和提醒模板', grade: '五年级', subject: '语文', style: '温和提醒型', scenario: '作业反馈', content: '该生具备良好学习习惯，建议在细节方面继续努力。', is_public: true, is_enabled: true, version_no: 1 },
  { id: 't4', owner_id: 'u-t2', title: '家校沟通模板', grade: '六年级', subject: '语文', style: '综合型', scenario: '家校沟通', content: '孩子近期课堂表现稳步提升，建议家校协同关注阅读训练。', is_public: true, is_enabled: true, version_no: 1 },
  { id: 't5', owner_id: 'u-t2', title: '阶段性评价模板', grade: '六年级', subject: '数学', style: '客观型', scenario: '月评语', content: '该生阶段性测评中展现出较强计算能力。', is_public: false, is_enabled: true, version_no: 1 },
  { id: 't6', owner_id: 'u-t1', title: '作业评语模板', grade: '五年级', subject: '数学', style: '鼓励型', scenario: '作业反馈', content: '本次作业完成较认真，书写规范，建议继续巩固易错点。', is_public: false, is_enabled: true, version_no: 1 }
];

export const generatedComments: GeneratedComment[] = Array.from({ length: 10 }, (_, i) => ({
  id: `g${i + 1}`,
  teacher_id: i < 6 ? 'u-t1' : 'u-t2',
  student_id: `s${i + 1}`,
  template_id: `t${(i % 6) + 1}`,
  draft_comment: `学生${i + 1}表现认真，建议继续加强阅读理解能力。`,
  final_comment: `学生${i + 1}在本阶段学习中态度端正、作业完成及时，课堂参与积极。建议继续加强阅读理解训练，注重审题细节，相信在老师与家长共同支持下会取得更大进步。`,
  output_structured: { summary_style: '综合型', strengths: '课堂参与积极', improvements: '审题细节需加强', parent_suggestion: '增加亲子阅读', final_comment: '...' },
  created_at: new Date(Date.now() - i * 86400000).toISOString()
}));

export const generationJobs: GenerationJob[] = [];

export function createId(prefix: string): string {
  return `${prefix}-${randomUUID().slice(0, 8)}`;
}
