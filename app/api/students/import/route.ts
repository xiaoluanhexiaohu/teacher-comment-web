import { ok } from '@/lib/api';
export async function POST() { return ok({ imported: 0, message: '演示环境：请集成 SheetJS 解析后入库' }); }
export async function GET() { return ok({ templateDownload: '/templates/student_import_template.csv' }); }
