import { ok } from '@/lib/api';
import { generatedComments } from '@/lib/mock-db';
export async function GET() { return ok(generatedComments); }
