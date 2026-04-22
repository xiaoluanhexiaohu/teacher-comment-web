import { ok } from '@/lib/api';
export async function POST(req: Request) { const body = await req.json(); return ok({ id: 'exp-1', ...body, status: 'pending' }); }
export async function GET() { return ok([]); }
