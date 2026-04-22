import { ok } from '@/lib/api';
import { dataProvider } from '@/lib/providers/data-provider';

export async function POST(req: Request) {
  const body = await req.json();
  const saved = await dataProvider.saveGeneratedComment({
    teacher_id: 'u-t1', student_id: body.studentId, template_id: body.templateId,
    output_structured: body.outputStructured, draft_comment: body.outputStructured?.final_comment ?? '', final_comment: body.finalComment
  });
  return ok(saved);
}
