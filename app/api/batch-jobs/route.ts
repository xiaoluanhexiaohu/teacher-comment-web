import { ok } from '@/lib/api';
import { createId, generationJobs } from '@/lib/mock-db';

export async function POST(req: Request) {
  const body = await req.json();
  const job = { id: createId('job'), teacher_id: 'u-t1', mode: 'batch' as const, status: 'pending', total_count: body.studentIds?.length ?? 0, success_count: 0, fail_count: 0, created_at: new Date().toISOString() };
  generationJobs.unshift(job);
  return ok(job);
}
export async function GET() { return ok(generationJobs); }
