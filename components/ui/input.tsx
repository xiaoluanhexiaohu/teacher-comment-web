import { cn } from '@/lib/utils';
import type { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return <input {...props} className={cn('w-full rounded-md border px-3 py-2 text-sm', props.className)} />;
}
