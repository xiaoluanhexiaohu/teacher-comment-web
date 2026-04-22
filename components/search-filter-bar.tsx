import { Input } from '@/components/ui/input';

export function SearchFilterBar({ keyword, onKeywordChange, extra }: { keyword: string; onKeywordChange: (v: string) => void; extra?: React.ReactNode }): JSX.Element {
  return <div className="mb-3 flex flex-wrap gap-2"><Input placeholder="搜索关键词" value={keyword} onChange={(e) => onKeywordChange(e.target.value)} className="max-w-sm" />{extra}</div>;
}
