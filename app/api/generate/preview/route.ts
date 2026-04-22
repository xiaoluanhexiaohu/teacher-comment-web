import { ok, fail } from '@/lib/api';
import { generateComment } from '@/lib/ai';
import { generatePreviewSchema } from '@/lib/schemas';
import { students, templates } from '@/lib/mock-db';

export async function POST(req: Request) {
  try {
    const parsed = generatePreviewSchema.safeParse(await req.json());
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '参数错误');
    const student = students.find((s) => s.id === parsed.data.studentId);
    const template = templates.find((t) => t.id === parsed.data.templateId);
    if (!student || !template) return fail('学生或模板不存在', 404);
    const prompt = `模板：${template.content}\n学生：${student.name}\n要求：${parsed.data.extraRequirements ?? '无'}`;
    const { output, model, tokens } = await generateComment({ studentName: student.name, prompt });
    return ok(output, { modelName: model, tokens });
  } catch {
    return fail('生成失败', 500);
  }
}
