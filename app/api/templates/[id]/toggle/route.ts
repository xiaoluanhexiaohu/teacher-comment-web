import { ok, fail } from '@/lib/api';
import { dataProvider } from '@/lib/providers/data-provider';
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const t = await dataProvider.getTemplate(params.id); if (!t) return fail('模板不存在', 404);
  const updated = await dataProvider.updateTemplate(params.id, { is_enabled: !t.is_enabled });
  return ok(updated);
}
