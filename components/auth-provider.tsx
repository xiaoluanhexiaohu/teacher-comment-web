'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface SessionUser {
  id: string;
  email: string;
  role: 'admin' | 'teacher';
  membership: 'member' | 'non_member';
  name: string;
}

const AuthContext = createContext<{ user: SessionUser | null; loading: boolean; refresh: () => Promise<void> }>({ user: null, loading: true, refresh: async () => undefined });

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const res = await fetch('/api/auth/me');
    const json = await res.json();
    setUser(json.success ? json.data : null);
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
  }, []);

  const value = useMemo(() => ({ user, loading, refresh }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
