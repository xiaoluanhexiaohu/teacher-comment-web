'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';

export default function ImportStudentsPage(): React.JSX.Element {
  const [text, setText] = useState('');
  return <div><PageHeader title="导入学生" description="支持 Excel / CSV，示例模板见 public/templates/student_import_template.csv" /><div className='rounded-lg border bg-white p-4 space-y-3'><input type='file' onChange={(e) => setText(e.target.files?.[0]?.name || '')} /><p className='text-sm text-muted'>已选择：{text || '未选择文件'}</p><Button onClick={() => alert('示例版：请调用 /api/students/import 完成导入')}>一键导入</Button></div></div>;
}
