# Teacher Comment Studio（教师评语模板网站）

> 面向中小学教师的评语管理后台 + AI 评语生成工具。  
> 本项目当前为 **MVP 演示版**，优先保证流程完整、页面可操作、接口可联调。

---

## 0. 你将获得什么

这个系统可以帮你：

1. 管理评语模板（按年级/学科/风格分类）
2. 管理学生资料（支持批量导入）
3. 一键 AI 生成评语（单个 / 批量）
4. 人工二次编辑后保存
5. 导出 Word / PDF
6. 查看历史记录并复用

---

## 1. 技术栈

- Next.js 15 + TypeScript（严格模式）
- App Router
- Tailwind CSS
- React Hook Form + Zod
- TanStack Table
- OpenAI Responses API（结构化 JSON 输出）
- Supabase（通过 SQL 初始化）

---

## 2. 目录结构（快速理解）

```txt
app/                     # 页面 + API
  ├─ login/
  ├─ dashboard/
  ├─ templates/
  ├─ students/
  ├─ generate/
  ├─ batch/
  ├─ history/
  ├─ exports/
  ├─ settings/
  └─ api/
components/              # 可复用 UI 组件
lib/                     # 业务逻辑（AI、schema、provider、mock 数据）
db/                      # migration + seed SQL
public/templates/        # 导入模板、导出模板示例文件
scripts/                 # 预留脚本
```

---

## 3. 环境变量（逐项解释）

复制：

```bash
cp .env.example .env.local
```

`.env.local` 示例：

```env
NEXT_PUBLIC_APP_NAME=Teacher Comment Studio
NEXT_PUBLIC_SUPABASE_URL=你的 Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的匿名 KEY
SUPABASE_SERVICE_ROLE_KEY=你的服务端 KEY
OPENAI_API_KEY=你的 OpenAI Key
OPENAI_MODEL=gpt-4.1-mini
DEFAULT_TEMPERATURE=0.7
DEFAULT_MAX_OUTPUT_TOKENS=800
```

说明：

- 未配置 `OPENAI_API_KEY` 时，系统会自动走 mock 输出（用于演示）。
- `SUPABASE_*` 主要用于后续联动真实数据库与权限。

---

## 4. 本地启动（保姆级）

### Step 1：安装 Node.js

建议 Node.js 20+（LTS）。

检查版本：

```bash
node -v
npm -v
```

### Step 2：安装依赖

```bash
npm install
```

> 如果公司网络限制 npm registry，可配置镜像或私有源。

### Step 3：启动开发环境

```bash
npm run dev
```

浏览器打开：

```txt
http://localhost:3000
```

### Step 4：登录系统

演示账号（统一密码：`123456`）：

- 管理员：`admin@school.cn`
- 教师 1：`zhang@school.cn`
- 教师 2：`li@school.cn`

---

## 5. 数据库初始化（Supabase）

### Step 1：创建 Supabase 项目

在 Supabase 控制台新建项目，得到：

- Project URL
- anon key
- service_role key

并填入 `.env.local`。

### Step 2：执行建表 SQL

打开 Supabase SQL Editor，执行：

- `db/migration.sql`

这会创建：

- users
- classes
- students
- templates
- template_versions
- prompt_presets
- generation_jobs
- generation_job_items
- generated_comments
- import_jobs
- export_jobs
- system_settings
- audit_logs

### Step 3：执行种子数据 SQL

执行：

- `db/seed.sql`

会写入基础账号、班级等演示数据（可继续扩展）。

---

## 6. 功能使用教程（老师视角）

下面按「第一次使用」来走一遍完整流程。

---

### 6.1 登录后先看仪表盘

路径：`/dashboard`

你会看到：

- 模板总数
- 学生总数
- 本周生成次数
- 最近生成记录

建议先确认演示数据已加载。

---

### 6.2 模板管理（最重要）

路径：`/templates`

#### 新建模板

1. 点击“新建模板”
2. 输入模板标题
3. 输入模板正文（建议写清语气和结构）
4. 保存

#### 推荐模板写法

- 开头：肯定学生努力与进步
- 中段：指出可提升点（温和）
- 结尾：给家长协同建议

#### 常见误区

- 模板太空泛 → AI 容易输出重复话术
- 模板风格不明确 → 结果不统一

---

### 6.3 学生管理

路径：`/students`

#### 手动新增

1. 点“新建学生”
2. 填基础信息（姓名、学号、班级）
3. 填表现信息（优点/待改进/作业情况）
4. 保存

#### 批量导入

路径：`/students/import`

1. 下载模板：`public/templates/student_import_template.csv`
2. 按模板填数据
3. 上传并导入

导入字段：

- 班级
- 学号
- 姓名
- 性别
- 年级
- 学科
- 成绩
- 优点
- 待改进点
- 课堂表现
- 作业情况
- 教师备注

---

### 6.4 单个评语生成（推荐先用）

路径：`/generate`

步骤：

1. 选择学生
2. 选择模板
3. 填“附加要求”（例如“控制在 150 字，语气更温和”）
4. 点击“生成评语”
5. 右侧预览会显示最终评语
6. 可手动修改润色
7. 保存到历史，后续可导出

你会得到结构化内容：

- strengths（亮点）
- improvements（待提升）
- parent_suggestion（家长建议）
- final_comment（最终评语）

---

### 6.5 批量生成

路径：`/batch`

步骤：

1. 选择班级
2. 选择模板
3. 勾选学生
4. 填统一附加要求
5. 启动批量任务
6. 查看进度（成功/失败）
7. 对失败项重试
8. 批量导出

建议：先小批量（5~10 人）压测后再全班执行。

---

### 6.6 历史记录

路径：`/history`

用途：

- 查看每次生成结果
- 进入详情看快照
- 再次编辑复用
- 再次导出

适合期末复盘与跨学期模板优化。

---

### 6.7 导出中心

路径：`/exports`

支持：

- Word 导出
- PDF 导出

默认模板文件：

- `public/templates/default-export-template.docx`
- `public/templates/default-export-template.pdf`

---

### 6.8 系统设置

路径：`/settings`

可配置：

- 学校名称
- 默认模型
- 温度 / 最大输出长度
- 是否结构化输出
- 提示词模板
- 个人设置

---

## 7. OpenAI 接入说明（结构化输出）

系统会要求模型按以下 JSON 返回：

```json
{
  "summary_style": "string",
  "strengths": "string",
  "improvements": "string",
  "parent_suggestion": "string",
  "final_comment": "string"
}
```

接入要点：

1. 在 `.env.local` 配置 `OPENAI_API_KEY`
2. 在设置页选择模型
3. 通过模板 + 学生信息 + 补充要求控制风格

---

## 8. 飞书多维表格兼容层（预留）

已预留：`lib/providers/data-provider.ts`

包含：

- `DataProvider` 接口
- `SupabaseProvider`（当前默认）
- `FeishuBaseProvider`（占位实现）

后续接入步骤：

1. 增加飞书应用凭证环境变量
2. 实现模板/学生/评语 CRUD 对应 API
3. 替换默认 provider 或加入 runtime 切换

---

## 9. 常见问题排查（FAQ）

### Q1：`npm install` 失败怎么办？

- 检查网络是否能访问 npm registry
- 使用公司内网镜像源
- 清理缓存再试：`npm cache clean --force`

### Q2：登录提示邮箱或密码错误？

演示账号密码固定：`123456`。

### Q3：AI 一直是 mock 输出？

说明 `OPENAI_API_KEY` 没配置成功，或服务不可达。

### Q4：为什么有些接口是演示实现？

当前版本是 MVP，先保障流程可跑通；你可在 provider 层替换为真实 Supabase / Feishu 数据源。

---

## 10. 开发建议（下一步）

1. 补齐真实 Supabase 持久化与 RLS 策略
2. 补齐审计日志 `audit_logs` 写入
3. 补齐批量任务异步队列（重试/取消/并发控制）
4. 补齐导入字段映射与错误报告
5. 接入真正 docx / pdf 模板渲染

---

如果你希望，我下一步可以直接给你：

- **“老师 30 分钟上手培训稿（可直接发微信群）”**
- **“教务管理员部署 SOP（从建库到上线）”**
- **“面向学校领导的功能演示脚本（含话术）”**
