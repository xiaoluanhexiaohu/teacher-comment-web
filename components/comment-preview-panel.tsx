'use client';
import { Textarea } from '@/components/ui/textarea';

export function CommentPreviewPanel({ value, onChange }: { value: string; onChange: (v: string) => void }): JSX.Element {
  return <div className="sticky top-4 space-y-2 rounded-lg border bg-white p-3"><p className="font-medium">最终评语预览</p><Textarea rows={12} value={value} onChange={(e) => onChange(e.target.value)} /></div>;
}
