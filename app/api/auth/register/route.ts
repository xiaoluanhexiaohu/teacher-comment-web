import { ok, fail } from '@/lib/api';
import { createSession, hashPassword, setSessionCookie } from '@/lib/auth';
import { createId, users } from '@/lib/mock-db';
import { registerSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  try {
    const parsed = registerSchema.safeParse(await req.json());
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? '参数错误');
    const exists = users.some((u) => u.email === parsed.data.email);
    if (exists) return fail('邮箱已注册', 409);
    const user = {
      id: createId('u'),
      email: parsed.data.email,
      password_hash: hashPassword(parsed.data.password),
      role: 'teacher' as const,
      membership: 'non_member' as const,
      name: parsed.data.name,
      school_name: parsed.data.schoolName
    };
    users.unshift(user);
    setSessionCookie(createSession(user.id));
    return ok({ id: user.id, name: user.name, role: user.role, membership: user.membership });
  } catch {
    return fail('注册失败', 500);
  }
}
