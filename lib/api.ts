import { NextResponse } from 'next/server';

export interface ApiResponse<T> { success: boolean; data?: T; error?: string; meta?: Record<string, unknown> }

export function ok<T>(data: T, meta?: Record<string, unknown>): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data, meta });
}

export function fail(message: string, status = 400): NextResponse<ApiResponse<null>> {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function authFail(error: unknown): NextResponse<ApiResponse<null>> | null {
  if (!(error instanceof Error)) return null;
  if (error.message === 'UNAUTHORIZED') return fail('请先登录后再操作', 401);
  if (error.message === 'MEMBERSHIP_REQUIRED') return fail('当前账号为非会员，仅可浏览只读内容', 403);
  return null;
}
