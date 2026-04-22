import { ok } from '@/lib/api';
const prompts = { system_prompt: '你是一名资深中文教师评语助手。', user_prompt_template: '请根据以下信息生成评语...' };
export async function GET() { return ok(prompts); }
export async function PUT(req: Request) { return ok({ ...prompts, ...(await req.json()) }); }
