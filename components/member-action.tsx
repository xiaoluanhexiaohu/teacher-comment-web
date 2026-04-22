'use client';

import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';

export function MemberAction({ onClick, children }: { onClick: () => void; children: React.ReactNode }): React.JSX.Element {
  const { user } = useAuth();
  const disabled = !user || user.membership !== 'member';
  return (
    <div>
      <Button disabled={disabled} onClick={() => !disabled && onClick()}>{children}</Button>
      {disabled && <p className="mt-1 text-xs text-amber-600">非会员仅可浏览，升级会员后可执行此操作。</p>}
    </div>
  );
}
