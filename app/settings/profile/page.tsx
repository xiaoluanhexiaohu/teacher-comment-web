'use client';
import { PageHeader } from '@/components/page-header';

export default function ProfilePage(): React.JSX.Element {
  return <div><PageHeader title="个人设置" /><div className='rounded-lg border bg-white p-4 space-y-3'><input className='rounded border p-2 w-full' defaultValue='张老师' /><input className='rounded border p-2 w-full' defaultValue='示范小学' /></div></div>;
}
