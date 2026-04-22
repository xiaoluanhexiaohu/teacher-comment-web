'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DEFAULT_STUDENT_TAGS } from '@/lib/constants';

type Values = z.infer<typeof studentSchema>;
export function StudentForm({ onSubmit, defaultValues }: { onSubmit: (v: Values) => void; defaultValues?: Partial<Values> }): React.JSX.Element {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Values>({ resolver: zodResolver(studentSchema), defaultValues: { personalityTags: [], ...defaultValues } });
  const tags = watch('personalityTags') ?? [];

  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-3"><Input {...register('classId')} placeholder="班级ID" /><Input {...register('name')} placeholder="学生姓名" />{errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}<Input {...register('studentNo')} placeholder="学号" /><div><p className='mb-2 text-sm font-medium'>学生标签（可多选）</p><div className='grid grid-cols-2 gap-2 md:grid-cols-3'>{DEFAULT_STUDENT_TAGS.map((tag) => <label className='flex items-center gap-2 text-sm' key={tag}><input type='checkbox' checked={tags.includes(tag)} onChange={(e) => setValue('personalityTags', e.target.checked ? [...tags, tag] : tags.filter((t) => t !== tag))} />{tag}</label>)}</div></div><Button type="submit">保存学生</Button></form>;
}
