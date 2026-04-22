import { ok } from '@/lib/api';
export async function GET(_req: Request, { params }: { params: { id: string } }) { return ok({ id: params.id }); }
export async function PUT(req: Request, { params }: { params: { id: string } }) { return ok({ id: params.id, ...(await req.json()) }); }
export async function DELETE(_req: Request, { params }: { params: { id: string } }) { return ok({ id: params.id, deleted: true }); }
