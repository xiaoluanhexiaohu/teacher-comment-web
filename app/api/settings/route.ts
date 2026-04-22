import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';
const settings = { school_name: '示范小学', default_model: 'gpt-4.1-mini', temperature: 0.7, max_output_tokens: 800, enable_stream: true, enable_structured_output: true, batch_concurrency: 3, default_style: '综合型' };
export async function GET() {
  try {
    requireAuth();
    return ok(settings);
  } catch (error) {
    return authFail(error) ?? fail('读取设置失败', 500);
  }
}
export async function PUT(req: Request) {
  try {
    const user = requireAuth();
    requireMembership(user);
    return ok({ ...settings, ...(await req.json()) });
  } catch (error) {
    return authFail(error) ?? fail('更新设置失败', 500);
  }
}
