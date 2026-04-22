import { classes, createId, generatedComments, students, templates } from '@/lib/mock-db';
import type { GeneratedComment, Student, Template } from '@/lib/types';

export interface DataProvider {
  listTemplates(): Promise<Template[]>;
  getTemplate(id: string): Promise<Template | null>;
  createTemplate(input: Omit<Template, 'id' | 'version_no'>): Promise<Template>;
  updateTemplate(id: string, input: Partial<Template>): Promise<Template | null>;
  listStudents(): Promise<Student[]>;
  getStudent(id: string): Promise<Student | null>;
  createStudent(input: Omit<Student, 'id'>): Promise<Student>;
  updateStudent(id: string, input: Partial<Student>): Promise<Student | null>;
  saveGeneratedComment(input: Omit<GeneratedComment, 'id' | 'created_at'>): Promise<GeneratedComment>;
  listGeneratedComments(): Promise<GeneratedComment[]>;
}

export class SupabaseProvider implements DataProvider {
  async listTemplates(): Promise<Template[]> { return templates; }
  async getTemplate(id: string): Promise<Template | null> { return templates.find((t) => t.id === id) ?? null; }
  async createTemplate(input: Omit<Template, 'id' | 'version_no'>): Promise<Template> {
    const record: Template = { ...input, id: createId('t'), version_no: 1 };
    templates.unshift(record); return record;
  }
  async updateTemplate(id: string, input: Partial<Template>): Promise<Template | null> {
    const idx = templates.findIndex((t) => t.id === id); if (idx < 0) return null;
    templates[idx] = { ...templates[idx], ...input, version_no: templates[idx].version_no + 1 }; return templates[idx];
  }
  async listStudents(): Promise<Student[]> { return students; }
  async getStudent(id: string): Promise<Student | null> { return students.find((s) => s.id === id) ?? null; }
  async createStudent(input: Omit<Student, 'id'>): Promise<Student> { const record = { ...input, id: createId('s') }; students.unshift(record); return record; }
  async updateStudent(id: string, input: Partial<Student>): Promise<Student | null> { const idx = students.findIndex((s) => s.id === id); if (idx < 0) return null; students[idx] = { ...students[idx], ...input }; return students[idx]; }
  async saveGeneratedComment(input: Omit<GeneratedComment, 'id' | 'created_at'>): Promise<GeneratedComment> { const record = { ...input, id: createId('g'), created_at: new Date().toISOString() }; generatedComments.unshift(record); return record; }
  async listGeneratedComments(): Promise<GeneratedComment[]> { return generatedComments; }
}

export class FeishuBaseProvider implements DataProvider {
  // TODO(feishu): 接入飞书多维表格 SDK 后，用真实 API 替换占位实现。
  private notImplemented(): never { throw new Error('FeishuBaseProvider 尚未接入，请先完成飞书凭证与字段映射。'); }
  async listTemplates(): Promise<Template[]> { this.notImplemented(); }
  async getTemplate(_id: string): Promise<Template | null> { this.notImplemented(); }
  async createTemplate(_input: Omit<Template, 'id' | 'version_no'>): Promise<Template> { this.notImplemented(); }
  async updateTemplate(_id: string, _input: Partial<Template>): Promise<Template | null> { this.notImplemented(); }
  async listStudents(): Promise<Student[]> { this.notImplemented(); }
  async getStudent(_id: string): Promise<Student | null> { this.notImplemented(); }
  async createStudent(_input: Omit<Student, 'id'>): Promise<Student> { this.notImplemented(); }
  async updateStudent(_id: string, _input: Partial<Student>): Promise<Student | null> { this.notImplemented(); }
  async saveGeneratedComment(_input: Omit<GeneratedComment, 'id' | 'created_at'>): Promise<GeneratedComment> { this.notImplemented(); }
  async listGeneratedComments(): Promise<GeneratedComment[]> { this.notImplemented(); }
}

export const dataProvider: DataProvider = new SupabaseProvider();
export { classes };
