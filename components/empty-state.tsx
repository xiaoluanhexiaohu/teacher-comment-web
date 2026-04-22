export function EmptyState({ text }: { text: string }): JSX.Element {
  return <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted">{text}</div>;
}
