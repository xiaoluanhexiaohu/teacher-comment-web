import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';
import { generatedComments } from '@/lib/mock-db';

export default function HistoryDetail({ params }: { params: { id: string } }): JSX.Element {
  const item = generatedComments.find((g) => g.id === params.id); if (!item) notFound();
  return <div><PageHeader title={`记录 ${item.id}`} /><Card className='space-y-2'><p>学生快照：{item.student_id}</p><p>模板快照：{item.template_id}</p><p>模型返回：{JSON.stringify(item.output_structured)}</p><p>最终评语：{item.final_comment}</p></Card></div>;
}
