import { ok } from '@/lib/api';
import { clearSessionCookie, destroySession } from '@/lib/auth';

export async function POST() {
  destroySession();
  clearSessionCookie();
  return ok({ message: '已退出登录' });
}
