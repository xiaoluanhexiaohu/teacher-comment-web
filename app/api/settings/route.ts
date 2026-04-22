import { ok } from '@/lib/api';
const settings = { school_name: '示范小学', default_model: 'gpt-4.1-mini', temperature: 0.7, max_output_tokens: 800, enable_stream: true, enable_structured_output: true, batch_concurrency: 3, default_style: '综合型' };
export async function GET() { return ok(settings); }
export async function PUT(req: Request) { return ok({ ...settings, ...(await req.json()) }); }
