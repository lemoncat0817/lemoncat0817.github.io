# AGENTS.md

個人作品集網站。Astro 7 靜態站，部署在 GitHub Pages（`lemoncat0817.github.io`，User Page）。

## 常用指令

```bash
npm run dev       # 開發伺服器 http://localhost:4321
npm run check     # 型別檢查（astro check），沒有另外的 lint/test 指令
npm run build     # = astro check && astro build，輸出到 dist/
npm run preview   # 預覽 build 結果
npm run og        # 重新產生社群分享圖與 icon（scripts/generate-og.mjs）
npm run fonts     # 重新下載自架字體檔（scripts/fetch-fonts.mjs，只有換字體時需要）
```

本專案沒有測試套件；`astro check` 是唯一的自動化正確性檢查，改完 `.astro`／`.ts` 檔後務必跑一次。
Node 版本需 `>= 22.12`（Astro 7 要求）。

## 架構重點

**雙語路由是鏡射結構，不是共用元件切語言**：`src/pages/`（繁中）與 `src/pages/en/`（英文）各自是一份完整頁面樹，`src/content/work/zh-TW/` 與 `src/content/work/en/` 也是兩份平行的 Markdown。新增頁面或作品時兩邊都要處理。路由由 `astro.config.mjs` 的 `i18n.routing.prefixDefaultLocale: false` 控制（繁中不加前綴、英文加 `/en`），`trailingSlash: 'always'` 是全站慣例，產生路徑一律經 `src/i18n/utils.ts` 的 `localizePath()`，不要手刻字串。

**Content Collections 的 id 大小寫陷阱**：`src/content.config.ts` 用 `glob` loader 讀 `src/content/work/**/*.md`，loader 會把 id 轉小寫，所以資料夾 `zh-TW/` 對應的 id 前綴其實是 `zh-tw/`。`src/lib/work.ts` 的 `getWorkEntries()` 因此用大小寫不敏感比對；`en` 因為本來就是小寫，這個問題不會在英文版浮現，只會在中文版出包，改這段邏輯時要留意。

**新增一個作品**：在 `src/content/work/zh-TW/` 與 `src/content/work/en/` 各放一個同 slug 的 `.md`（schema 見 `content.config.ts`），封面圖放進 `src/assets/work/`（`astro:assets` 處理最佳化與放大檢視用的原圖）。首頁與案例頁會自動生成，不需要改任何元件。要記得同步更新 `src/data/profile.ts` 裡 `techStack` 的技術 ↔ 專案對應（技能標籤要有作品背書，不是自評）。

**`src/data/profile.ts` 是個人資料單一來源**，Hero、關於頁、Footer、SEO meta、JSON-LD 都從這裡讀，不要在元件裡另外寫死。

**`src/i18n/ui.ts`** 是翻譯字典（`UIKey` type 約束兩語言 key 必須一致），搭配 `useTranslations(lang)` 取得 `t()`。缺字會 fallback 回預設語言（繁中），不會顯示 undefined。

**設計 token 在 `src/styles/global.css` 的 `@theme` 區塊**，顏色用 OKLCH。`--color-accent`（填色）與 `--color-accent-text`（文字色）刻意分開：品牌黃當背景好看，但直接當文字色在淺色背景對比不足，這是全站色彩對比的核心取捨，別合併這兩個 token。深/淺主題透過 `data-theme` 屬性 + localStorage 切換，`BaseLayout.astro` 裡有避免 FOUC 的行內同步 script。

**動效系統**（同樣在 `global.css`，全部 `@media (prefers-reduced-motion: no-preference)` 包住）：
- `.reveal`：用原生 CSS scroll-driven animation（`animation-timeline: view()`）做捲動進場，`@supports` 漸進增強，不支援的瀏覽器直接顯示最終狀態、不會空白。
- `.rise`：時間軸動畫，用 `--i` custom property 控制逐項延遲，只用在 Hero 這種一開頁就在可視範圍內的內容（`.reveal` 的 scroll-timeline 對已經在畫面裡的元素不會觸發）。
- `.reveal-parallax`：一個元素要同時跑「進場淡入」與「捲動視差」兩個 scroll-driven 動畫時，**不能拆成兩個各自宣告 `animation-name` 的 class 疊加**——CSS 會讓後宣告的整組 `animation-*` longhand 直接覆蓋前者，不會合併。必須在同一個 class 裡用逗號把兩組 `animation-*` 值並列。漂移用獨立的 `translate` 屬性而非 `transform`，才能跟其他用 `transform` 的動畫（含 Tailwind v4 的 `translate-*` utility，同樣走獨立屬性）共存不打架。

**互動元件走原生 `<dialog>`，沒有 UI 元件庫、沒有 React/Vue 等前端框架**（純 Astro + Tailwind CSS 4，僅在需要互動的地方用 vanilla `<script>`）。`ContactModal.astro` 與 `ImageLightbox.astro` 是同一套慣例：`showModal()` / `close()`、點擊座標落在 dialog 外才視為點背景關閉、`modal.dataset.initialized` 防止重複綁定、監聽 `astro:page-load` 重新初始化（View Transitions 換頁後 DOM 會重建）。新增彈窗類元件請照抄這個模式，不要另外引入 lightbox/modal 套件。

**字體自架、建置不連外**：`src/assets/fonts/` 收了 woff2，透過 Astro Fonts API 的 `fontProviders.local()` 載入（見 `astro.config.mjs` 註解）。曾經用 `fontProviders.google()`，但 Google 會輪換 gstatic 檔名 hash，Astro 快取到舊網址會讓 build 直接 404——這是實際發生過的事故，別改回線上 provider。中文字體刻意不載 web font，用系統字型堆疊（`--font-sans`，見 `global.css`），因為 Noto Sans TC 完整字檔太大會拖累 LCP，台灣使用者系統本來就有 PingFang TC / 微軟正黑體可用。

**部署**：push 到 `main` 觸發 `.github/workflows/deploy.yml` → GitHub Actions build → GitHub Pages。這是 User Page（根網域即站台根目錄），`astro.config.mjs` 絕對不可設定 `base`，設了會讓所有資源路徑多一層、全站 404。

## 常見維護作業

- **改個人資料**（是否顯示 email、求職狀態等）：`src/data/profile.ts`
- **改介面文字**：`src/i18n/ui.ts`
- **改配色**：`src/styles/global.css` 的 `@theme` 區塊
