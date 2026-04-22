import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { Card } from '@/components/ui/card';
import { generatedComments, generationJobs, students, templates } from '@/lib/mock-db';

export default function DashboardPage(): JSX.Element {
  return <div><PageHeader title="仪表盘" description="教师评语模板网站运营概览" /><div className="grid grid-cols-1 gap-3 md:grid-cols-4"><StatCard label="模板总数" value={templates.length} /><StatCard label="学生总数" value={students.length} /><StatCard label="本周生成次数" value={generatedComments.length} /><StatCard label="本月批量任务" value={generationJobs.length} /></div><div className="mt-4 grid gap-3 md:grid-cols-2"><Card><h3 className="mb-2 font-medium">最近生成记录</h3>{generatedComments.slice(0, 5).map((it) => <p key={it.id} className="mb-1 text-sm">{it.id} - {it.final_comment.slice(0, 28)}...</p>)}</Card><Card><h3 className="mb-2 font-medium">最近使用模板</h3>{templates.slice(0, 5).map((it) => <p key={it.id} className="mb-1 text-sm">{it.title}</p>)}</Card></div></div>;
}
