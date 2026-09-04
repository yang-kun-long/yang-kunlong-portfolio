# 杨昆龙项目作品集

独立的 Vite + React 项目展示页，收录已确认公开的 GitHub 项目，并区分在线运行、已发布、已交付、持续开发和学习参与状态。

在线地址：[yangkunlong.top](https://yangkunlong.top)

## 运行

```powershell
npm install
npm run dev -- --host 127.0.0.1 --port 5180
```

生产构建：

```powershell
npm run build
```

发布到 Cloudflare Pages：

```powershell
npx wrangler pages deploy dist --project-name yang-kunlong-portfolio --branch main
```

作品数据在 `src/data/projects.js`，视觉封面在 `public/projects/`。
