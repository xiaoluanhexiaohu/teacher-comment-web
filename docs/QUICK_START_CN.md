# 从零测试完整流程（Windows 友好）

1. 安装 Node.js 20+
2. `copy .env.example .env.local`
3. `npm install`
4. `npm run dev`
5. 访问 `http://localhost:3000/register` 注册新账号（默认 non_member）
6. 登录后验证只读限制
7. 使用演示会员账号 `zhang@school.cn / 12345678` 验证完整功能
