'use client';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { TemplateEditor } from '@/components/template-editor';
import { templates } from '@/lib/mock-db';

export default function EditTemplatePage({ params }: { params: { id: string } }): React.JSX.Element {
  const router = useRouter();
  const item = templates.find((t) => t.id === params.id);
  if (!item) return <div>模板不存在</div>;
  return <div><PageHeader title="编辑模板" /><TemplateEditor defaultValue={item} onSubmit={async (v) => { await fetch(`/api/templates/${item.id}`, { method: 'PUT', body: JSON.stringify(v) }); router.push(`/templates/${item.id}`); }} /></div>;
}
