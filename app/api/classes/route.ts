import { ok } from '@/lib/api';
import { classes } from '@/lib/providers/data-provider';
export async function GET() { return ok(classes); }
export async function POST(req: Request) { return ok(await req.json()); }
