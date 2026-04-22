import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const nav = [
    ['仪表盘', '/dashboard'], ['模板', '/templates'], ['学生', '/students'], ['单个生成', '/generate'], ['批量生成', '/batch'], ['历史', '/history'], ['导出', '/exports'], ['设置', '/settings']
  ];
  return <html lang="zh-CN"><body><div className="mx-auto flex min-h-screen max-w-7xl gap-4 p-4"><aside className="w-48 rounded-xl border bg-white p-3"><p className="mb-3 font-semibold">Teacher Comment Studio</p><nav className="space-y-2 text-sm">{nav.map(([name, href]) => <Link key={String(href)} className="block rounded px-2 py-1 hover:bg-slate-100" href={String(href)}>{name}</Link>)}</nav></aside><main className="flex-1">{children}</main></div></body></html>;
}
