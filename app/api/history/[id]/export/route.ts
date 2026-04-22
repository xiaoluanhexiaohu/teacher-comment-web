import { ok } from '@/lib/api';
export async function POST(_req: Request, { params }: { params: { id: string } }) { return ok({ id: params.id, exportJobId: 'exp-1' }); }
