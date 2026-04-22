export function LoadingState({ text = '加载中...' }: { text?: string }): React.JSX.Element {
  return <div className="rounded-lg border p-6 text-sm text-muted">{text}</div>;
}
