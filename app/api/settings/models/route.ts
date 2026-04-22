import { ok } from '@/lib/api';
const modelSettings = { model_name: 'gpt-4.1-mini', temperature: 0.7, max_output_tokens: 800, enable_structured_output: true, enable_stream: true };
export async function GET() { return ok(modelSettings); }
export async function PUT(req: Request) { return ok({ ...modelSettings, ...(await req.json()) }); }
