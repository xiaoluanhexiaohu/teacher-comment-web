import { ok } from '@/lib/api';
export async function GET(_req: Request, { params }: { params: { id: string } }) { return ok([{ template_id: params.id, version_no: 1, change_note: '初始版本' }]); }
export async function POST() { return ok({ saved: true }); }
