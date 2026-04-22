# miniapp (微信小程序 MVP)

基于 **Taro + React + TypeScript** 的小程序端骨架，复用主站后端 API。

## 已覆盖 MVP 页面
- 登录页 `/pages/login/index`
- 学生与标签页 `/pages/index/index`
- 历史记录页 `/pages/history/index`

## 启动
1. `cd miniapp`
2. `npm install`
3. `npm run dev:weapp`
4. 使用微信开发者工具打开 `miniapp/dist`。

> 默认后端地址请在 `src/config.ts` 中配置 `API_BASE_URL`。
