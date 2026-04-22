'use client';
import { PageHeader } from '@/components/page-header';

export default function ModelsPage(): JSX.Element {
  return <div><PageHeader title="模型设置" /><div className='rounded-lg border bg-white p-4 grid gap-3 md:grid-cols-2'><input className='rounded border p-2' defaultValue='gpt-4.1-mini' /><input className='rounded border p-2' defaultValue='0.7' /><input className='rounded border p-2' defaultValue='800' /><label className='text-sm'><input type='checkbox' defaultChecked /> 启用结构化输出</label></div></div>;
}
