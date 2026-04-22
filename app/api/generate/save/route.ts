import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';
import { dataProvider } from '@/lib/providers/data-provider';

export async function POST(req: Request) {
  try {
    const user = requireAuth();
    requireMembership(user);
    const body = await req.json();
    const saved = await dataProvider.saveGeneratedComment({
      teacher_id: user.id,
      student_id: body.studentId,
      template_id: body.templateId,
      output_structured: body.outputStructured,
      draft_comment: body.outputStructured?.final_comment ?? '',
      final_comment: body.finalComment,
      tags_snapshot: body.tagsSnapshot ?? []
    });
    return ok(saved);
  } catch (error) {
    return authFail(error) ?? fail('保存失败', 500);
  }
}
