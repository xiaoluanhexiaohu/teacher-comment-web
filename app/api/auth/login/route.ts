import { ok, fail } from '@/lib/api';
import { createSession, setSessionCookie, verifyPassword } from '@/lib/auth';
import { users } from '@/lib/mock-db';
import { loginSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  try {
    const parsed = loginSchema.safeParse(await req.json());
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '参数错误');
    const user = users.find((u) => u.email === parsed.data.email);
    if (!user?.password_hash || !verifyPassword(parsed.data.password, user.password_hash)) return fail('邮箱或密码错误', 401);
    setSessionCookie(createSession(user.id));
    return ok({ id: user.id, name: user.name, role: user.role, membership: user.membership });
  } catch {
    return fail('登录失败', 500);
  }
}
