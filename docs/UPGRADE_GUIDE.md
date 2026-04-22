# 升级方案（Web + 小程序）

- 保留 Next.js Web 主站，新增 `miniapp/` 小程序端。
- 后端 API 增加注册/登录/会话、会员权限校验、标签参与 AI 生成。
- AI 层改为 provider abstraction：`mock/openai/compatible`。
