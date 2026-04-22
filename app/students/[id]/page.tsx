import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';
import { generatedComments, students } from '@/lib/mock-db';

export default function StudentDetail({ params }: { params: { id: string } }): React.JSX.Element {
  const item = students.find((s) => s.id === params.id);
  if (!item) notFound();
  const history = generatedComments.filter((g) => g.student_id === item.id);
  return <div><PageHeader title={item.name} description={`学号 ${item.student_no}`} /><Card className='space-y-2'><p>学习情况：{item.performance_summary}</p><p>优点：{item.strengths}</p><p>待改进点：{item.weaknesses}</p><p>教师备注：{item.teacher_notes}</p><p>学生标签：{item.personality_tags?.join('、') || '未设置'}</p><h3 className='pt-3 font-medium'>历史生成记录</h3>{history.map((h) => <p key={h.id} className='text-sm'>{h.final_comment.slice(0, 50)}...</p>)}</Card></div>;
}
