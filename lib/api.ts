import { NextResponse } from 'next/server';

export interface ApiResponse<T> { success: boolean; data?: T; error?: string; meta?: Record<string, unknown> }

export function ok<T>(data: T, meta?: Record<string, unknown>): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data, meta });
}

export function fail(message: string, status = 400): NextResponse<ApiResponse<null>> {
  return NextResponse.json({ success: false, error: message }, { status });
}
