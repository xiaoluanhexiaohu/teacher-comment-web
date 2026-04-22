'use client';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { StudentForm } from '@/components/student-form';

export default function NewStudentPage(): React.JSX.Element {
  const router = useRouter();
  return <div><PageHeader title="新建学生" /><StudentForm defaultValues={{ classId: 'c1' }} onSubmit={async (v) => { await fetch('/api/students', { method: 'POST', body: JSON.stringify(v) }); router.push('/students'); }} /></div>;
}
