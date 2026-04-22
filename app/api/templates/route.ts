import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';
import { dataProvider } from '@/lib/providers/data-provider';
import { templateSchema } from '@/lib/schemas';

export async function GET(req: Request) {
  try {
    requireAuth();
    const url = new URL(req.url);
    const keyword = url.searchParams.get('keyword') ?? '';
    const all = await dataProvider.listTemplates();
    return ok(all.filter((t) => t.title.includes(keyword)));
  } catch (error) {
    return authFail(error) ?? fail('查询模板失败', 500);
  }
}

export async function POST(req: Request) {
  try {
    const user = requireAuth();
    requireMembership(user);
    const parsed = templateSchema.safeParse(await req.json());
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '参数错误');
    const data = await dataProvider.createTemplate({
      owner_id: user.id,
      title: parsed.data.title,
      grade: parsed.data.grade,
      subject: parsed.data.subject,
      style: parsed.data.style,
      scenario: parsed.data.scenario,
      content: parsed.data.content,
      is_public: parsed.data.isPublic,
      is_enabled: parsed.data.isEnabled
    });
    return ok(data);
  } catch (error) {
    return authFail(error) ?? fail('创建模板失败', 500);
  }
}
