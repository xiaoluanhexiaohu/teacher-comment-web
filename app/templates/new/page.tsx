'use client';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { TemplateEditor } from '@/components/template-editor';

export default function NewTemplatePage(): React.JSX.Element {
  const router = useRouter();
  return <div><PageHeader title="新建模板" /><TemplateEditor onSubmit={async (value) => { await fetch('/api/templates', { method: 'POST', body: JSON.stringify({ ...value, style: '综合型', scenario: '学期评语' }) }); router.push('/templates'); }} /></div>;
}
