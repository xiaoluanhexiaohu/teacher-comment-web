'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';

export function SidebarShell({ children }: { children: React.ReactNode }): React.JSX.Element {
  const nav = [
    ['仪表盘', '/dashboard'], ['模板', '/templates'], ['学生', '/students'], ['单个生成', '/generate'], ['批量生成', '/batch'], ['历史', '/history'], ['导出', '/exports'], ['设置', '/settings']
  ];
  const { user } = useAuth();
  const router = useRouter();

  return <div className="mx-auto flex min-h-screen max-w-7xl gap-4 p-4"><aside className="w-56 rounded-xl border bg-white p-3"><p className="mb-1 font-semibold">Teacher Comment Studio</p><p className='mb-3 text-xs text-slate-500'>{user ? `${user.name} · ${user.membership === 'member' ? '会员' : '非会员'}` : '未登录'}</p><nav className="space-y-2 text-sm">{nav.map(([name, href]) => <Link key={String(href)} className="block rounded px-2 py-1 hover:bg-slate-100" href={String(href)}>{name}</Link>)}</nav>{user && <button className='mt-4 text-xs text-red-600' onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); }}>退出登录</button>}</aside><main className="flex-1">{children}</main></div>;
}
