# lemoncat0817.github.io

個人作品集網站。以 [Astro](https://astro.build) 建置，部署於 GitHub Pages。

線上網址：<https://lemoncat0817.github.io>

## 技術棧

| 項目 | 選用 |
| --- | --- |
| 框架 | Astro 7（靜態產出，預設不送 JS） |
| 樣式 | Tailwind CSS 4（透過 `@tailwindcss/vite`） |
| 內容 | Content Collections + Zod schema 驗證 |
| 字體 | Astro Fonts API + 收進 repo 的 woff2（不向外部字體服務取檔） |
| 語言 | 繁體中文（`/`）與英文（`/en/`） |
| 部署 | GitHub Actions → GitHub Pages |

## 開發

需要 Node.js >= 22.12 與 pnpm（版本見 `package.json` 的 `packageManager`）。

```bash
pnpm install
pnpm dev          # 開發伺服器 http://localhost:4321
pnpm check        # 型別檢查
pnpm build        # 型別檢查 + 建置到 dist/
pnpm preview      # 預覽建置結果
pnpm og           # 重新產生分享圖、favicon／icon 與貓掌游標
pnpm fonts        # 重新下載字體檔（只有要換字體時才需要）
```

## 專案結構

```
src/
├─ assets/work/        作品封面圖（由 astro:assets 最佳化）
├─ components/         UI 元件
├─ content/work/       作品卡資料（只有 frontmatter）
│  ├─ zh-TW/
│  └─ en/
├─ data/profile.ts     個人資料（單一來源）
├─ i18n/               翻譯字串與語言工具
├─ layouts/            共用頁面版型（BaseLayout 等）
├─ lib/                作品資料處理與輔助函式
├─ pages/              路由（/ 為繁中，/en/ 為英文）
└─ styles/global.css   設計 token 與基礎樣式
```

維護做法與架構上的取捨、陷阱都寫在 [AGENTS.md](AGENTS.md)。
