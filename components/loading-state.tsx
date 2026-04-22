export function LoadingState({ text = '加载中...' }: { text?: string }): JSX.Element {
  return <div className="rounded-lg border p-6 text-sm text-muted">{text}</div>;
}
