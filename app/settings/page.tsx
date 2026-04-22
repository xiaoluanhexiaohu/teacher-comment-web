import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';

export default function SettingsPage(): React.JSX.Element {
  return <div><PageHeader title="系统设置" /><Card className='space-y-2 text-sm'><p>学校名称、导出页眉页脚、默认风格、默认模型、批量并发均可配置。</p><div className='flex gap-4 text-blue-600'><Link href='/settings/prompts'>提示词设置</Link><Link href='/settings/models'>模型设置</Link><Link href='/settings/profile'>个人设置</Link></div></Card></div>;
}
