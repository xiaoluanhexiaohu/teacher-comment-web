import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';
import { createId, generationJobs } from '@/lib/mock-db';

export async function POST(req: Request) {
  try {
    const user = requireAuth();
    requireMembership(user);
    const body = await req.json();
    const job = { id: createId('job'), teacher_id: user.id, mode: 'batch' as const, status: 'pending', total_count: body.studentIds?.length ?? 0, success_count: 0, fail_count: 0, created_at: new Date().toISOString() };
    generationJobs.unshift(job);
    return ok(job);
  } catch (error) {
    return authFail(error) ?? fail('创建批量任务失败', 500);
  }
}

export async function GET() {
  try {
    requireAuth();
    return ok(generationJobs);
  } catch (error) {
    return authFail(error) ?? fail('读取批量任务失败', 500);
  }
}
