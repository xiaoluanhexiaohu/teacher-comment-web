'use client';
import { PageHeader } from '@/components/page-header';
import { ExportDialog } from '@/components/export-dialog';

export default function ExportsPage(): JSX.Element {
  return <div><PageHeader title="导出中心" /><div className='rounded-lg border bg-white p-4'><p className='mb-3 text-sm'>支持 Word/PDF 导出。</p><ExportDialog onExport={async (type) => { await fetch('/api/exports', { method: 'POST', body: JSON.stringify({ type, scope: 'batch', relatedIds: ['g1'] }) }); alert(`${type} 导出任务已创建`); }} /></div></div>;
}
