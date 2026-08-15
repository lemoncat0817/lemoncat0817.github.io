# lemoncat0817.github.io

個人作品集網站。以 [Astro](https://astro.build) 建置，部署於 GitHub Pages。

線上網址：<https://lemoncat0817.github.io>

## 技術棧

| 項目 | 選用 |
| --- | --- |
| 框架 | Astro 7（靜態產出，預設不送 JS） |
| 樣式 | Tailwind CSS 4（透過 `@tailwindcss/vite`） |
| 內容 | Content Collections + Zod schema 驗證 |
| 字體 | Astro 內建 Fonts API（自架、subset、preload） |
| 語言 | 繁體中文（`/`）與英文（`/en/`） |
| 部署 | GitHub Actions → GitHub Pages |

## 開發

需要 Node.js >= 22.12。

```bash
npm install
npm run dev       # 開發伺服器 http://localhost:4321
npm run build     # 型別檢查 + 建置到 dist/
npm run preview   # 預覽建置結果
npm run og        # 重新產生社群分享圖與 icon
```

## 專案結構

```
src/
├─ assets/work/        作品封面圖（由 astro:assets 最佳化）
├─ components/         UI 元件
├─ content/work/       案例研究內容
│  ├─ zh-TW/
│  └─ en/
├─ data/profile.ts     個人資料與技術棧對應（單一來源）
├─ i18n/               翻譯字串與語言工具
├─ layouts/
├─ lib/
├─ pages/              路由（/ 為繁中，/en/ 為英文）
└─ styles/global.css   設計 token 與基礎樣式
```

## 常見維護作業

**新增一個作品**：在 `src/content/work/zh-TW/` 與 `src/content/work/en/` 各放一個 `.md`，
封面圖放進 `src/assets/work/`。首頁與案例頁會自動帶出，不需要改任何元件。
記得同步更新 `src/data/profile.ts` 裡技術與專案的對應關係。

**改個人資料**：`src/data/profile.ts`（是否顯示 email、求職狀態等）。

**改介面文字**：`src/i18n/ui.ts`。

**改配色**：`src/styles/global.css` 的 `@theme` 區塊。
注意 `--color-accent`（填色）與 `--color-accent-text`（文字色）是刻意分開的，
因為黃色當底色好看，但直接當文字色在淺色背景上對比不足。

## 部署

推送到 `main` 會觸發 `.github/workflows/deploy.yml` 自動建置並部署。
Repo Settings → Pages → Source 需設為 **GitHub Actions**。

重構前的舊版網站保存在 `v1-legacy` tag，可用 `git show v1-legacy` 查看。
