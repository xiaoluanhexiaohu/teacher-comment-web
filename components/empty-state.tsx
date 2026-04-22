export function EmptyState({ text }: { text: string }): React.JSX.Element {
  return <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted">{text}</div>;
}
