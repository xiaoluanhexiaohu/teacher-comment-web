import { ok } from '@/lib/api';
export async function GET(_req: Request, { params }: { params: { id: string } }) { return ok({ id: params.id, status: 'completed' }); }
