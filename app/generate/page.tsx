'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { StructuredOutputCard } from '@/components/structured-output-card';
import { CommentPreviewPanel } from '@/components/comment-preview-panel';
import { students, templates } from '@/lib/mock-db';
import type { StructuredOutput } from '@/lib/ai';

export default function GeneratePage(): JSX.Element {
  const [studentId, setStudentId] = useState(students[0].id);
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [extra, setExtra] = useState('语气温和，控制在150字左右');
  const [data, setData] = useState<StructuredOutput | null>(null);
  const [final, setFinal] = useState('');
  return <div><PageHeader title="单个评语生成" /><div className='grid gap-4 md:grid-cols-2'><div className='space-y-3 rounded-lg border bg-white p-4'><select className='w-full rounded border p-2' value={studentId} onChange={(e) => setStudentId(e.target.value)}>{students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select><select className='w-full rounded border p-2' value={templateId} onChange={(e) => setTemplateId(e.target.value)}>{templates.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}</select><textarea className='w-full rounded border p-2' rows={4} value={extra} onChange={(e) => setExtra(e.target.value)} /><Button onClick={async () => { const res = await fetch('/api/generate/preview', { method: 'POST', body: JSON.stringify({ studentId, templateId, extraRequirements: extra }) }); const json = await res.json(); if (json.success) { setData(json.data); setFinal(json.data.final_comment); } }}>生成评语</Button>{data && <StructuredOutputCard data={data} />}</div><CommentPreviewPanel value={final} onChange={setFinal} /></div></div>;
}
