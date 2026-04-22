'use client';
import { Button } from '@/components/ui/button';

export function ConfirmDialog({ text, onConfirm }: { text: string; onConfirm: () => void }): React.JSX.Element {
  return <div className="rounded-lg border p-3"><p className="mb-2 text-sm">{text}</p><Button onClick={onConfirm}>确认</Button></div>;
}
