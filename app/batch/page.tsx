'use client';
import { useState } from 'react';
import { BatchJobProgress } from '@/components/batch-job-progress';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { students } from '@/lib/mock-db';

export default function BatchPage(): JSX.Element {
  const [progress, setProgress] = useState({ total: 0, success: 0, failed: 0 });
  return <div><PageHeader title="批量生成" /><div className='rounded-lg border bg-white p-4 space-y-3'><p>选择班级、模板并勾选学生后开始任务。</p><Button onClick={() => { setProgress({ total: students.slice(0, 8).length, success: 6, failed: 2 }); }}>开始批量生成</Button><BatchJobProgress total={progress.total} success={progress.success} failed={progress.failed} /></div></div>;
}
