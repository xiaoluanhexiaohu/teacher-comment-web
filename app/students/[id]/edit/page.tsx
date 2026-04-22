'use client';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { StudentForm } from '@/components/student-form';
import { students } from '@/lib/mock-db';

export default function EditStudentPage({ params }: { params: { id: string } }): JSX.Element {
  const router = useRouter();
  const s = students.find((x) => x.id === params.id);
  if (!s) return <div>学生不存在</div>;
  return <div><PageHeader title="编辑学生" /><StudentForm defaultValues={{ classId: s.class_id, name: s.name, studentNo: s.student_no }} onSubmit={async (v) => { await fetch(`/api/students/${s.id}`, { method: 'PUT', body: JSON.stringify(v) }); router.push(`/students/${s.id}`); }} /></div>;
}
