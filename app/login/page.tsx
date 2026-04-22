'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState('');
  return <div className="mx-auto mt-20 max-w-md rounded-xl border bg-white p-6"><h1 className="text-xl font-semibold">登录</h1><form className="mt-4 space-y-3" onSubmit={async (e) => { e.preventDefault(); const form = new FormData(e.currentTarget); const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) }); const json = await res.json(); if (!json.success) { setError(json.error); return; } router.push('/dashboard'); }}><Input name="email" placeholder="邮箱" /><Input name="password" type="password" placeholder="密码" /><label className="flex items-center gap-2 text-sm"><input type="checkbox" name="remember" />记住我</label>{error && <p className="text-sm text-red-500">{error}</p>}<Button type="submit" className="w-full">登录</Button><p className="text-xs text-muted">忘记密码？请联系管理员重置。</p></form></div>;
}
