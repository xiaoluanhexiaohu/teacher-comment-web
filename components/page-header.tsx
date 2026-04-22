import { Card } from '@/components/ui/card';

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }): React.JSX.Element {
  return <Card className="mb-4 flex items-center justify-between"><div><h1 className="text-xl font-semibold">{title}</h1><p className="text-sm text-muted">{description}</p></div>{action}</Card>;
}
