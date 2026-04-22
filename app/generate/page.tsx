'use client';
import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { StructuredOutputCard } from '@/components/structured-output-card';
import { CommentPreviewPanel } from '@/components/comment-preview-panel';
import { students, templates } from '@/lib/mock-db';
import type { StructuredOutput } from '@/lib/ai';
import { DEFAULT_STUDENT_TAGS } from '@/lib/constants';
import { MemberAction } from '@/components/member-action';

export default function GeneratePage(): React.JSX.Element {
  const [studentId, setStudentId] = useState(students[0].id);
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [extra, setExtra] = useState('语气温和，控制在150字左右');
  const [data, setData] = useState<StructuredOutput | null>(null);
  const [final, setFinal] = useState('');
  const student = useMemo(() => students.find((s) => s.id === studentId), [studentId]);
  const [tags, setTags] = useState<string[]>(student?.personality_tags ?? []);

  return <div><PageHeader title="单个评语生成" /><div className='grid gap-4 md:grid-cols-2'><div className='space-y-3 rounded-lg border bg-white p-4'><select className='w-full rounded border p-2' value={studentId} onChange={(e) => { const id = e.target.value; setStudentId(id); setTags(students.find((s) => s.id === id)?.personality_tags ?? []); }}>{students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select><select className='w-full rounded border p-2' value={templateId} onChange={(e) => setTemplateId(e.target.value)}>{templates.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}</select><div><p className='mb-1 text-sm'>学生标签</p><div className='grid grid-cols-2 gap-2'>{DEFAULT_STUDENT_TAGS.map((tag) => <label className='text-sm' key={tag}><input className='mr-2' type='checkbox' checked={tags.includes(tag)} onChange={(e) => setTags((prev) => e.target.checked ? [...prev, tag] : prev.filter((t) => t !== tag))} />{tag}</label>)}</div></div><textarea className='w-full rounded border p-2' rows={4} value={extra} onChange={(e) => setExtra(e.target.value)} /><MemberAction onClick={async () => { const res = await fetch('/api/generate/preview', { method: 'POST', body: JSON.stringify({ studentId, templateId, extraRequirements: extra, tags }) }); const json = await res.json(); if (json.success) { setData(json.data); setFinal(json.data.final_comment); } }}>{'生成评语'}</MemberAction>{data && <StructuredOutputCard data={data} />}</div><CommentPreviewPanel value={final} onChange={setFinal} /></div></div>;
}
