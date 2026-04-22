import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';
const prompts = { system_prompt: '你是一名资深中文教师评语助手。', user_prompt_template: '请根据以下信息生成评语...' };
export async function GET() { try { requireAuth(); return ok(prompts); } catch (e) { return authFail(e) ?? fail('读取提示词失败', 500); } }
export async function PUT(req: Request) { try { const user = requireAuth(); requireMembership(user); return ok({ ...prompts, ...(await req.json()) }); } catch (e) { return authFail(e) ?? fail('更新提示词失败', 500); } }
