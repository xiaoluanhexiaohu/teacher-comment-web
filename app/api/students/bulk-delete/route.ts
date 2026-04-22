import { ok } from '@/lib/api';
export async function POST(req: Request) { const body = await req.json(); return ok({ deletedIds: body.ids ?? [] }); }
