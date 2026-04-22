import { fail, ok } from '@/lib/api';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = getCurrentUser();
  if (!user) return fail('未登录', 401);
  return ok({
    id: user.id,
    email: user.email,
    role: user.role,
    membership: user.membership,
    name: user.name,
    school_name: user.school_name
  });
}
