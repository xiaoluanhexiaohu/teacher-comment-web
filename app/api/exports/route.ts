import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = requireAuth();
    requireMembership(user);
    const body = await req.json();
    return ok({ id: 'exp-1', ...body, operator: user.id, status: 'pending' });
  } catch (error) {
    return authFail(error) ?? fail('创建导出任务失败', 500);
  }
}

export async function GET() {
  try {
    requireAuth();
    return ok([]);
  } catch (error) {
    return authFail(error) ?? fail('读取导出任务失败', 500);
  }
}
