'use client';
import { PageHeader } from '@/components/page-header';

export default function PromptsPage(): React.JSX.Element {
  return <div><PageHeader title="提示词设置" /><div className='rounded-lg border bg-white p-4 space-y-3'><textarea className='w-full rounded border p-2' rows={6} defaultValue='你是一名资深中文教师评语助手。' /><textarea className='w-full rounded border p-2' rows={8} defaultValue='请根据以下信息生成评语：{{template_content}} ...' /></div></div>;
}
