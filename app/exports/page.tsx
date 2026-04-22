'use client';
import { PageHeader } from '@/components/page-header';
import { ExportDialog } from '@/components/export-dialog';
import { useAuth } from '@/components/auth-provider';

export default function ExportsPage(): React.JSX.Element {
  const { user } = useAuth();
  const readOnly = !user || user.membership !== 'member';
  return <div><PageHeader title="导出中心" /><div className='rounded-lg border bg-white p-4'><p className='mb-3 text-sm'>支持 Word/PDF 导出。</p>{readOnly && <p className='mb-2 text-xs text-amber-600'>非会员仅可浏览导出中心，无法创建导出任务。</p>}<div className={readOnly ? 'pointer-events-none opacity-60' : ''}><ExportDialog onExport={async (type) => { await fetch('/api/exports', { method: 'POST', body: JSON.stringify({ type, scope: 'batch', relatedIds: ['g1'] }) }); alert(`${type} 导出任务已创建`); }} /></div></div></div>;
}
