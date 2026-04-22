import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';
import { generateComment } from '@/lib/ai';
import { generatePreviewSchema } from '@/lib/schemas';
import { students, templates } from '@/lib/mock-db';

export async function POST(req: Request) {
  try {
    const user = requireAuth();
    requireMembership(user);
    const parsed = generatePreviewSchema.safeParse(await req.json());
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '参数错误');
    const student = students.find((s) => s.id === parsed.data.studentId);
    const template = templates.find((t) => t.id === parsed.data.templateId);
    if (!student || !template) return fail('学生或模板不存在', 404);
    const tags = parsed.data.tags ?? student.personality_tags ?? [];
    const prompt = [
      `模板：${template.content}`,
      `学生：${student.name}`,
      `学生标签：${tags.length ? tags.join('、') : '未选择标签，请基于基础信息给出稳妥评语'}`,
      `要求：${parsed.data.extraRequirements ?? '无'}`
    ].join('\n');
    const { output, model, tokens, provider } = await generateComment({ studentName: student.name, prompt });
    return ok(output, { modelName: model, tokens, provider, tagsUsed: tags });
  } catch (error) {
    return authFail(error) ?? fail('生成失败', 500);
  }
}
