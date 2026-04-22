import { Card } from '@/components/ui/card';

export function StatCard({ label, value }: { label: string; value: string | number }): React.JSX.Element {
  return <Card><p className="text-sm text-muted">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></Card>;
}
