import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';

export async function POST() {
  try {
    const user = requireAuth();
    requireMembership(user);
    return ok({ imported: 0, message: `演示环境(${user.id})：请集成 SheetJS 解析后入库` });
  } catch (error) {
    return authFail(error) ?? fail('导入失败', 500);
  }
}

export async function GET() { return ok({ templateDownload: '/templates/student_import_template.csv' }); }
