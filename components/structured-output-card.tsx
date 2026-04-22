import { Card } from '@/components/ui/card';
import type { StructuredOutput } from '@/lib/ai';

export function StructuredOutputCard({ data }: { data: StructuredOutput }): JSX.Element {
  return <Card className="space-y-2"><p><b>风格：</b>{data.summary_style}</p><p><b>亮点：</b>{data.strengths}</p><p><b>待提升：</b>{data.improvements}</p><p><b>家长建议：</b>{data.parent_suggestion}</p></Card>;
}
