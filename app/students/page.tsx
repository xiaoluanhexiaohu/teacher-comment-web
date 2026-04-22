'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { SearchFilterBar } from '@/components/search-filter-bar';
import { Button } from '@/components/ui/button';
import { students } from '@/lib/mock-db';
import { useAuth } from '@/components/auth-provider';
import type { ColumnDef } from '@tanstack/react-table';
import type { Student } from '@/lib/types';

export default function StudentsPage(): React.JSX.Element {
  const [keyword, setKeyword] = useState('');
  const { user } = useAuth();
  const readOnly = !user || user.membership !== 'member';
  const data = useMemo(() => students.filter((s) => s.name.includes(keyword) || s.student_no?.includes(keyword)), [keyword]);
  const columns: ColumnDef<Student>[] = [
    { header: '姓名', accessorKey: 'name' }, { header: '学号', accessorKey: 'student_no' }, { header: '年级', accessorKey: 'grade' }, { header: '标签', cell: ({ row }) => row.original.personality_tags?.join('、') || '-' },
    { header: '操作', cell: ({ row }) => <div className='flex gap-2'><Link href={`/students/${row.original.id}`}>详情</Link>{!readOnly && <Link href={`/students/${row.original.id}/edit`}>编辑</Link>}</div> }
  ];
  return <div><PageHeader title="学生管理" action={<div className='flex gap-2'><Link href='/students/import'><Button className='bg-slate-700' disabled={readOnly}>导入学生</Button></Link><Link href='/students/new'><Button disabled={readOnly}>新建学生</Button></Link></div>} />{readOnly && <p className='mb-2 text-xs text-amber-600'>非会员仅可浏览学生信息，无法新增/编辑/导入。</p>}<SearchFilterBar keyword={keyword} onKeywordChange={setKeyword} /><DataTable columns={columns} data={data} /></div>;
}
