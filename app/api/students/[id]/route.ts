import { ok, fail } from '@/lib/api';
import { dataProvider } from '@/lib/providers/data-provider';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const item = await dataProvider.getStudent(params.id); if (!item) return fail('学生不存在', 404); return ok(item);
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const item = await dataProvider.updateStudent(params.id, await req.json()); if (!item) return fail('学生不存在', 404); return ok(item);
}
export async function DELETE(_req: Request, { params }: { params: { id: string } }) { return ok({ id: params.id, deleted: true }); }
