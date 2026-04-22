import { authFail, fail, ok } from '@/lib/api';
import { requireAuth } from '@/lib/auth';
import { generatedComments } from '@/lib/mock-db';

export async function GET() {
  try {
    requireAuth();
    return ok(generatedComments);
  } catch (error) {
    return authFail(error) ?? fail('读取历史失败', 500);
  }
}
