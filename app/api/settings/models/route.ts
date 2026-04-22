import { authFail, fail, ok } from '@/lib/api';
import { requireAuth, requireMembership } from '@/lib/auth';
const modelSettings = { model_name: 'gpt-4.1-mini', temperature: 0.7, max_output_tokens: 800, enable_structured_output: true, enable_stream: true };
export async function GET() { try { requireAuth(); return ok(modelSettings); } catch (e) { return authFail(e) ?? fail('读取模型设置失败', 500); } }
export async function PUT(req: Request) { try { const user = requireAuth(); requireMembership(user); return ok({ ...modelSettings, ...(await req.json()) }); } catch (e) { return authFail(e) ?? fail('更新模型设置失败', 500); } }
