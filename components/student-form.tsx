'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Values = z.infer<typeof studentSchema>;
export function StudentForm({ onSubmit, defaultValues }: { onSubmit: (v: Values) => void; defaultValues?: Partial<Values> }): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(studentSchema), defaultValues });
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-3"><Input {...register('classId')} placeholder="班级ID" /><Input {...register('name')} placeholder="学生姓名" />{errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}<Input {...register('studentNo')} placeholder="学号" /><Button type="submit">保存学生</Button></form>;
}
