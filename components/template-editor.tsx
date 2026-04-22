'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function TemplateEditor({ defaultValue, onSubmit }: { defaultValue?: { title?: string; content?: string }; onSubmit: (v: { title: string; content: string }) => void }): JSX.Element {
  return <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); onSubmit({ title: String(fd.get('title') || ''), content: String(fd.get('content') || '') }); }}><Input name="title" placeholder="模板标题" defaultValue={defaultValue?.title} required /><Textarea name="content" rows={8} placeholder="模板正文" defaultValue={defaultValue?.content} required /><Button type="submit">保存模板</Button></form>;
}
