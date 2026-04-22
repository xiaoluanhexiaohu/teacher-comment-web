'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage(): React.JSX.Element {
  const router = useRouter();
  const [error, setError] = useState('');
  return <div className="mx-auto mt-20 max-w-md rounded-xl border bg-white p-6"><h1 className="text-xl font-semibold">注册</h1><form className="mt-4 space-y-3" onSubmit={async (e) => { e.preventDefault(); const form = new FormData(e.currentTarget); const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email: form.get('email'), password: form.get('password'), name: form.get('name'), schoolName: form.get('schoolName') }) }); const json = await res.json(); if (!json.success) { setError(json.error); return; } router.push('/dashboard'); }}><Input name="name" placeholder="姓名" /><Input name="email" placeholder="邮箱" /><Input name="schoolName" placeholder="学校（可选）" /><Input name="password" type="password" placeholder="密码（至少8位）" />{error && <p className="text-sm text-red-500">{error}</p>}<Button type="submit" className="w-full">注册并登录</Button><p className='text-sm'>已有账号？<Link href='/login' className='text-blue-600'>去登录</Link></p></form></div>;
}
