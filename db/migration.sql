create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email varchar unique not null,
  password_hash varchar null,
  role varchar not null default 'teacher',
  name varchar not null,
  school_name varchar null,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references users(id),
  grade varchar not null,
  class_name varchar not null,
  academic_year varchar null,
  remark text null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_classes_teacher_id on classes(teacher_id);
create index if not exists idx_classes_grade on classes(grade);

create table if not exists students (
  id uuid primary key default gen_random_uuid(), teacher_id uuid references users(id), class_id uuid references classes(id), student_no varchar null,
  name varchar not null, gender varchar null, age int null, grade varchar null, subject varchar null, score numeric(5,2) null,
  strengths text null, weaknesses text null, personality_tags text[] null, habits text null, homework_status text null, performance_summary text null,
  teacher_notes text null, parent_communication_notes text null, is_active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now()
);
create index if not exists idx_students_teacher_id on students(teacher_id);
create index if not exists idx_students_class_id on students(class_id);
create index if not exists idx_students_name on students(name);
create index if not exists idx_students_student_no on students(student_no);

create table if not exists templates (
  id uuid primary key default gen_random_uuid(), owner_id uuid references users(id), title varchar not null, grade varchar null, subject varchar null, style varchar null, scenario varchar null,
  content text not null, is_public boolean default false, is_enabled boolean default true, version_no int default 1, created_at timestamptz default now(), updated_at timestamptz default now()
);
create index if not exists idx_templates_owner_id on templates(owner_id);
create index if not exists idx_templates_grade on templates(grade);
create index if not exists idx_templates_subject on templates(subject);
create index if not exists idx_templates_style on templates(style);
create index if not exists idx_templates_scenario on templates(scenario);

create table if not exists template_versions (
  id uuid primary key default gen_random_uuid(), template_id uuid references templates(id), version_no int not null,
  title varchar not null, content text not null, change_note text null, created_by uuid references users(id), created_at timestamptz default now()
);

create table if not exists prompt_presets (
  id uuid primary key default gen_random_uuid(), owner_id uuid references users(id), name varchar not null, scenario varchar null,
  system_prompt text not null, user_prompt_template text not null, output_schema jsonb not null, is_default boolean default false,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists generation_jobs (
  id uuid primary key default gen_random_uuid(), teacher_id uuid references users(id), mode varchar not null, class_id uuid null references classes(id), template_id uuid null references templates(id),
  prompt_preset_id uuid null references prompt_presets(id), status varchar not null default 'pending', total_count int default 0, success_count int default 0, fail_count int default 0,
  extra_requirements text null, started_at timestamptz null, finished_at timestamptz null, created_at timestamptz default now()
);

create table if not exists generation_job_items (
  id uuid primary key default gen_random_uuid(), job_id uuid references generation_jobs(id), student_id uuid references students(id),
  status varchar not null default 'pending', error_message text null, generated_comment_id uuid null, created_at timestamptz default now(), updated_at timestamptz default now()
);
create index if not exists idx_generation_job_items_job_id on generation_job_items(job_id);
create index if not exists idx_generation_job_items_student_id on generation_job_items(student_id);

create table if not exists generated_comments (
  id uuid primary key default gen_random_uuid(), teacher_id uuid references users(id), student_id uuid references students(id), class_id uuid null references classes(id),
  template_id uuid null references templates(id), prompt_preset_id uuid null references prompt_presets(id), model_name varchar not null, generation_mode varchar not null default 'single',
  input_snapshot jsonb not null, output_structured jsonb not null, draft_comment text not null, final_comment text not null, strengths_summary text null, improvements_summary text null,
  parent_suggestion text null, additional_requirements text null, is_edited boolean default false, version_no int default 1, created_at timestamptz default now(), updated_at timestamptz default now()
);
create index if not exists idx_generated_comments_teacher_id on generated_comments(teacher_id);
create index if not exists idx_generated_comments_student_id on generated_comments(student_id);
create index if not exists idx_generated_comments_template_id on generated_comments(template_id);
create index if not exists idx_generated_comments_created_at on generated_comments(created_at);

create table if not exists import_jobs (
  id uuid primary key default gen_random_uuid(), teacher_id uuid references users(id), file_name varchar not null, file_path varchar not null,
  total_rows int default 0, success_rows int default 0, fail_rows int default 0, error_report jsonb null, created_at timestamptz default now()
);

create table if not exists export_jobs (
  id uuid primary key default gen_random_uuid(), teacher_id uuid references users(id), type varchar not null, scope varchar not null,
  status varchar not null default 'pending', related_ids jsonb not null, file_path varchar null, created_at timestamptz default now(), finished_at timestamptz null
);

create table if not exists system_settings (
  id uuid primary key default gen_random_uuid(), owner_id uuid references users(id), school_name varchar null, default_model varchar not null,
  temperature numeric(3,2) default 0.7, max_output_tokens int default 800, enable_stream boolean default true, enable_structured_output boolean default true,
  batch_concurrency int default 3, default_style varchar null, header_text varchar null, footer_text varchar null, created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(), user_id uuid references users(id), action varchar not null, target_type varchar not null,
  target_id uuid null, detail jsonb null, created_at timestamptz default now()
);
