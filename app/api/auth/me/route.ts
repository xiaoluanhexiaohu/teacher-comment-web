import { ok } from '@/lib/api';
import { users } from '@/lib/mock-db';
export async function GET() { return ok(users[1]); }
