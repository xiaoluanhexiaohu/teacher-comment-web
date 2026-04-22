import { ok, fail } from '@/lib/api';
import { dataProvider } from '@/lib/providers/data-provider';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const item = await dataProvider.getTemplate(params.id);
  if (!item) return fail('模板不存在', 404);
  return ok(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const item = await dataProvider.updateTemplate(params.id, body);
    if (!item) return fail('模板不存在', 404);
    return ok(item);
  } catch {
    return fail('更新模板失败', 500);
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  return ok({ id: params.id, deleted: true });
}
