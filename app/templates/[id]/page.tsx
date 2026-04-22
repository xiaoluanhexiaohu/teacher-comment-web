import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';
import { templates } from '@/lib/mock-db';

export default function TemplateDetail({ params }: { params: { id: string } }): React.JSX.Element {
  const item = templates.find((t) => t.id === params.id);
  if (!item) notFound();
  return <div><PageHeader title={item.title} action={<Link href={`/templates/${item.id}/edit`}>编辑</Link>} /><Card><p className="text-sm">年级：{item.grade} / 学科：{item.subject} / 风格：{item.style}</p><p className="mt-3 whitespace-pre-wrap">{item.content}</p><p className="mt-4 text-sm text-muted">版本：v{item.version_no}（版本记录功能已接入 API）</p></Card></div>;
}
