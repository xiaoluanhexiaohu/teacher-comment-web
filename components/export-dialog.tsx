'use client';
import { Button } from '@/components/ui/button';

export function ExportDialog({ onExport }: { onExport: (type: 'word' | 'pdf') => void }): JSX.Element {
  return <div className="flex gap-2"><Button onClick={() => onExport('word')}>导出 Word</Button><Button onClick={() => onExport('pdf')} className="bg-slate-700">导出 PDF</Button></div>;
}
