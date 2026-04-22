-- 1 admin, 2 teachers
insert into users(id,email,role,name,school_name) values
('00000000-0000-0000-0000-000000000001','admin@school.cn','admin','系统管理员','示范小学'),
('00000000-0000-0000-0000-000000000002','zhang@school.cn','teacher','张老师','示范小学'),
('00000000-0000-0000-0000-000000000003','li@school.cn','teacher','李老师','示范小学')
on conflict do nothing;

insert into classes(id,teacher_id,grade,class_name,academic_year) values
('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000002','五年级','五年级一班','2025-2026'),
('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000002','五年级','五年级二班','2025-2026'),
('10000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000003','六年级','六年级一班','2025-2026')
on conflict do nothing;

-- TODO(seed): 可根据真实学校数据扩充为批量导入脚本。

update users set membership='member' where email in ('admin@school.cn','zhang@school.cn');
update users set membership='non_member' where email='li@school.cn';
