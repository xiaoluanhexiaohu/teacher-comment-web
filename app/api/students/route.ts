import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';
import { dataProvider } from '@/lib/providers/data-provider';
import { studentSchema } from '@/lib/schemas';

export async function GET(req: Request) {
  try {
    requireAuth();
    const keyword = new URL(req.url).searchParams.get('keyword') ?? '';
    const all = await dataProvider.listStudents();
    return ok(all.filter((s) => s.name.includes(keyword) || s.student_no?.includes(keyword)));
  } catch (error) {
    return authFail(error) ?? fail('查询学生失败', 500);
  }
}

export async function POST(req: Request) {
  try {
    const user = requireAuth();
    requireMembership(user);
    const parsed = studentSchema.safeParse(await req.json());
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '参数错误');
    const item = await dataProvider.createStudent({
      teacher_id: user.id,
      class_id: parsed.data.classId,
      student_no: parsed.data.studentNo,
      name: parsed.data.name,
      grade: parsed.data.grade,
      subject: parsed.data.subject,
      score: parsed.data.score,
      strengths: parsed.data.strengths,
      weaknesses: parsed.data.weaknesses,
      performance_summary: parsed.data.performanceSummary,
      homework_status: parsed.data.homeworkStatus,
      teacher_notes: parsed.data.teacherNotes,
      personality_tags: parsed.data.personalityTags
    });
    return ok(item);
  } catch (error) {
    return authFail(error) ?? fail('创建学生失败', 500);
  }
}
