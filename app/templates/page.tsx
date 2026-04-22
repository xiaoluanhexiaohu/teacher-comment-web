'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { SearchFilterBar } from '@/components/search-filter-bar';
import { Button } from '@/components/ui/button';
import { templates } from '@/lib/mock-db';
import type { ColumnDef } from '@tanstack/react-table';
import type { Template } from '@/lib/types';

export default function TemplatesPage(): React.JSX.Element {
  const [keyword, setKeyword] = useState('');
  const data = useMemo(() => templates.filter((t) => t.title.includes(keyword)), [keyword]);
  const columns: ColumnDef<Template>[] = [
    { header: '标题', accessorKey: 'title' }, { header: '年级', accessorKey: 'grade' }, { header: '学科', accessorKey: 'subject' }, { header: '风格', accessorKey: 'style' },
    { header: '状态', cell: ({ row }) => row.original.is_enabled ? '启用' : '停用' },
    { header: '操作', cell: ({ row }) => <div className='flex gap-2'><Link href={`/templates/${row.original.id}`}>详情</Link><Link href={`/templates/${row.original.id}/edit`}>编辑</Link></div> }
  ];
  return <div><PageHeader title="模板管理" action={<Link href="/templates/new"><Button>新建模板</Button></Link>} /><SearchFilterBar keyword={keyword} onKeywordChange={setKeyword} /><DataTable columns={columns} data={data} /></div>;
}
