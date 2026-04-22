import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';
import { generatedComments } from '@/lib/mock-db';

export default function HistoryPage(): JSX.Element {
  return <div><PageHeader title="历史记录" /><Card>{generatedComments.map((g) => <div key={g.id} className='mb-3 border-b pb-2 text-sm'><p>{g.created_at.slice(0, 10)} - {g.id}</p><p>{g.final_comment.slice(0, 80)}...</p><Link href={`/history/${g.id}`} className='text-blue-600'>查看详情</Link></div>)}</Card></div>;
}
