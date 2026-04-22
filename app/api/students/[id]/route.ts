import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';
import { dataProvider } from '@/lib/providers/data-provider';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    requireAuth();
    const item = await dataProvider.getStudent(params.id);
    if (!item) return fail('学生不存在', 404);
    return ok(item);
  } catch (error) {
    return authFail(error) ?? fail('查询学生失败', 500);
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = requireAuth();
    requireMembership(user);
    const item = await dataProvider.updateStudent(params.id, await req.json());
    if (!item) return fail('学生不存在', 404);
    return ok(item);
  } catch (error) {
    return authFail(error) ?? fail('更新学生失败', 500);
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const user = requireAuth();
    requireMembership(user);
    return ok({ id: params.id, deleted: true });
  } catch (error) {
    return authFail(error) ?? fail('删除学生失败', 500);
  }
}
