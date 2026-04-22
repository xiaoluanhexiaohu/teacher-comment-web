import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { SidebarShell } from '@/components/sidebar-shell';

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <html lang="zh-CN"><body><AuthProvider><SidebarShell>{children}</SidebarShell></AuthProvider></body></html>;
}
