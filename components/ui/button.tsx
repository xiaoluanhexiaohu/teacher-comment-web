import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return <button className={cn('rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-50', className)} {...props} />;
}
