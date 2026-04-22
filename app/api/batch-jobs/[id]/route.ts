import { ok } from '@/lib/api';
import { generationJobs } from '@/lib/mock-db';
export async function GET(_req: Request, { params }: { params: { id: string } }) { return ok(generationJobs.find((j) => j.id === params.id)); }
