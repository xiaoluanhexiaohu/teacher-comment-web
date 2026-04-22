export function BatchJobProgress({ total, success, failed }: { total: number; success: number; failed: number }): JSX.Element {
  const percent = total === 0 ? 0 : Math.round(((success + failed) / total) * 100);
  return <div className="space-y-2 rounded-lg border bg-white p-3"><p>进度：{percent}%</p><p className="text-sm text-muted">成功 {success} / 失败 {failed} / 总数 {total}</p><div className="h-2 rounded bg-slate-200"><div className="h-2 rounded bg-green-500" style={{ width: `${percent}%` }} /></div></div>;
}
