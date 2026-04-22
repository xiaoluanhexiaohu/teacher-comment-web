import { ok, fail } from '@/lib/api';
import { dataProvider } from '@/lib/providers/data-provider';
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const t = await dataProvider.getTemplate(params.id); if (!t) return fail('模板不存在', 404);
  const copy = await dataProvider.createTemplate({ ...t, title: `${t.title}（副本）`, owner_id: 'u-t1' });
  return ok(copy);
}
