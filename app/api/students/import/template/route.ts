import { ok } from '@/lib/api';
export async function GET() { return ok({ templateDownload: '/templates/student_import_template.csv' }); }
