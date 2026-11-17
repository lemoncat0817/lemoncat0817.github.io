# AGENTS.md

個人作品集網站。Astro 7 靜態站，部署在 GitHub Pages（`lemoncat0817.github.io`，User Page）。純 Astro + Tailwind CSS 4，沒有 UI 元件庫與前端框架，互動只用 vanilla `<script>`。

## 指令

```bash
pnpm dev          # 開發伺服器 http://localhost:4321
pnpm check        # 型別檢查（astro check）
pnpm build        # = astro check && astro build，輸出到 dist/
pnpm preview      # 預覽 build 結果
pnpm og           # 重新產生分享圖、favicon／icon 與貓掌游標（scripts/generate-og.mjs）
pnpm fonts        # 重新下載自架字體檔（scripts/fetch-fonts.mjs，只有換字體時需要）
```

- 沒有測試套件與 lint；`astro check` 是唯一的自動化檢查，改完 `.astro`／`.ts` 後務必跑一次。
- Node 需 `>= 22.12`。
- 只用 pnpm，不要跑 npm：CI 的 `withastro/action` 依 lockfile 判斷套件管理工具，多出一份 `package-lock.json` 會干擾判斷。依賴的安裝後腳本要放行時，寫在 `pnpm-workspace.yaml` 的 `allowBuilds`。

## Commit

訊息格式是 `<type>: <繁體中文描述>`，常用的 type 是 `feat`／`fix`／`refactor`／`docs`／`style`／`build`／`ci`。

## 內容與資料

### 雙語路由

- 鏡射結構，不是共用元件切語言：`src/pages/` 與 `src/pages/en/`、`src/content/work/zh-TW/` 與 `src/content/work/en/` 各是平行的兩份，新增頁面或作品時兩邊都要處理。
- 例外：`404.astro` 只有根目錄一份，GitHub Pages 只認根目錄的 404，不要在 `en/` 另建。
- 繁中不加前綴、英文加 `/en`，`trailingSlash: 'always'`。產生路徑一律經 `src/i18n/utils.ts` 的 `localizePath()`，不要手刻字串。

### 作品（Content Collections）

- 新增作品：兩個語言資料夾各放一個同 slug 的 `.md`（只寫 frontmatter，schema 見 `src/content.config.ts`），封面圖放進 `src/assets/work/`。作品卡會自動生成，不需要改元件。
- 作品只有卡片，沒有站內案例頁；舊的 `/work/<slug>/` 網址由 `astro.config.mjs` 轉到首頁對應的作品卡。
- `stack` 最多 5 個（schema 會擋）。卡片上是一句用頓號（英文用逗號）串起的清單，刻意不做成標籤方塊或用「·」分隔。
- `keyword` 是 Hero「最近做的：…」那行裡代表該作品的詞，兩個語言都要填。
- id 大小寫陷阱：`glob` loader 會把 id 轉小寫，`zh-TW/` 的 id 前綴其實是 `zh-tw/`，所以 `src/lib/work.ts` 的 `getWorkEntries()` 用大小寫不敏感比對。這個問題只會在中文版出包。
- 中文版作品卡的一句話介紹在 build 時由 `src/lib/repoAbout.ts` 讀各專案 repo 的 GitHub About，任何失敗都退回 frontmatter 的 `tagline`，build 不能因此失敗。英文版維持 frontmatter。

### 個人資料、翻譯與文案

- `src/data/profile.ts` 是個人資料單一來源，不要在元件裡另外寫死。`email` 留空字串會隱藏所有信箱連結。
- 聯絡區除了 mailto 按鈕，還用小字列出信箱加複製鈕（`EmailLink.astro` 的 `button`／`address`），照顧點 mailto 沒反應的訪客。
- `src/i18n/ui.ts` 是翻譯字典，`UIKey` type 約束兩語言 key 必須一致，缺字會 fallback 回繁中。
- 改 Hero 文案後要跑 `pnpm og`，分享圖（`public/og-default*.png`）裡有同一句標題。

### 關於頁暫時隱藏

`src/pages/_about.astro` 與 `src/pages/en/_about.astro` 用底線前綴停用路由。恢復時把兩個檔案改回 `about.astro`，並在 `Header.astro` 的 `links` 補回 `{ href: localizePath('/about', lang), label: t('nav.about') }`。

## 樣式與動效

### 設計 token

- 在 `src/styles/global.css` 的 `@theme` 區塊，顏色用 OKLCH。
- `--color-accent`（填色）與 `--color-accent-text`（文字色）刻意分開：品牌黃當背景好看，但當文字色在淺色背景對比不足。別合併這兩個 token。
- 螢光筆（`.marker`）底色用 `--color-accent`、字色用 `--color-accent-ink`，兩個主題都靠這組對比成立。
- 深／淺主題用 `data-theme` 屬性加 localStorage，`BaseLayout.astro` 有避免 FOUC 的行內同步 script。

### 字體

- woff2 收在 `src/assets/fonts/`，用 `fontProviders.local()` 載入。別改回 `fontProviders.google()`：Google 會輪換 gstatic 檔名 hash，Astro 快取到舊網址曾讓 build 直接 404。
- 中文刻意不載 web font，用系統字型堆疊（`--font-sans`）：Noto Sans TC 完整字檔太大會拖累 LCP。Linux 上的字型名稱要寫 `Noto Sans CJK TC` 才對得到。
- 中文頁面（`:lang(zh)`）刻意允許模擬粗體：Brave 會限制系統字型，挑到只有一種字重的中文字型時，標題才不會掉回細體。

### 動效 class

都在 `global.css`，全部包在 `@media (prefers-reduced-motion: no-preference)` 裡。

- `.reveal`：scroll-driven 捲動進場（`animation-timeline: view()`），用 `@supports` 漸進增強，不支援時直接顯示最終狀態。
- `.rise`：時間軸動畫，`--i` 控制逐項延遲。一開頁就在可視範圍內的內容（如 Hero）要用這個，`.reveal` 對已經在畫面裡的元素不會觸發。
- `.reveal-parallax`：同時跑進場淡入與捲動視差。不能拆成兩個各自宣告 `animation-name` 的 class 疊加，後宣告的整組 `animation-*` 會覆蓋前者；必須在同一個 class 裡用逗號並列。漂移用獨立的 `translate` 屬性而非 `transform`，才能跟其他 `transform` 動畫與 Tailwind v4 的 `translate-*` 共存。

### 名字停靠

- 首頁導覽列的名字（`Header.astro` 的 `.brand` 加 `.brand-dock`）用 `animation-timeline: scroll(root)` 從 Hero 大標縮回左上角，純 CSS。Hero 的 `.hero-name` 是同尺寸的佔位字，不支援或減少動態時改為直接顯示。
- 起點位移由 `--hero-pt` 算出（`global.css` 定義、`Hero.astro` 套用），兩邊要一起改。
- 字級用 `font-size` 動畫而非 `scale`，大字縮放才不會糊。

### View Transitions

- 跨頁轉場用原生 cross-document View Transitions（`global.css` 的 `@view-transition`），沒有用 `<ClientRouter>`，每次換頁都是完整載入。導覽列名字有 `view-transition-name: brand`。
- 主題切換（`ThemeToggle.astro`）與封面放大（`ImageLightbox.astro` 的 `morph()`）是同文件 View Transition，期間分別在 `<html>` 加上 `theme-switching`、`lightbox-morph`，用來取消導覽列名字的命名，避免它自成一組浮在遮罩上方。
- 封面放大時縮圖與大圖輪流掛 `view-transition-name: cover`，`lightbox-morph` 同時停掉 `.dialog-motion`。大圖 300ms 內沒解碼完、不支援或減少動態時，退回彈窗動畫。Esc 的 `cancel` 事件被攔下來改走同一條關閉路徑。

### 玻璃與材質

每種只用在一處，別再往其他區塊加。

- 導覽列玻璃畫在 `.glass-bar::before`，不是 header 本身：header 自己掛 `backdrop-filter` 會變成 backdrop root，裡面的元素就疊不了自己的模糊。
- 首頁的 `.glass-dock` 跟名字停靠用同一段 `scroll(root)` 範圍淡入，兩邊的 `animation-range` 要一起改。手機選單打開時用 `:has()` 取消動畫，選單才有底。
- 刻意不做折射（`backdrop-filter: url()`），那只有 Chromium 支援。
- 404 頁的貓是 `<HeroCat clay />`，套 `#hero-cat-clay` 濾鏡並取消「只在 `xl` 以上看游標」的限制。首頁的貓維持扁平，不要套。

## 互動元件

### 彈窗

走原生 `<dialog>`，不要引入 lightbox/modal 套件。`ImageLightbox.astro` 是範本，新增彈窗照抄：

- 點擊座標落在 dialog 外才視為點背景關閉；`modal.dataset.initialized` 防止重複綁定。
- 監聽 `astro:page-load` 重新初始化。目前這個事件不會觸發，保留是為了日後改用 `<ClientRouter>` 時不會漏綁。
- 加上 `.dialog-motion` 就有進出場動畫。關閉時若要清空內容，要等動畫播完再清。

### 作品路線（`Route.astro`）

- script 依各張 `[data-route-stop]` 的位置畫出 SVG 道路與腳印。必須讀 `offsetTop`／`offsetLeft` 而非 `getBoundingClientRect()`：卡片有進場與視差的 transform，用後者路線會跟著抖。
- 前進位置對應「視窗 55% 高度那條線」。視窗很高、捲到底仍到不了那條線時，直接算抵達終點。
- 車道靠 `WorkCard` 的寬度（`lg:w-[78%]`）、左右交錯與手機版的 `ml-10` 留出來，改卡片版面時要一起顧到。
- 終點站是聯絡卡（`Contact.astro` 的 `[data-route-end]`）。它不在 `stops` 裡，因為 `stops` 決定車道位置；它在 DOM 後面會蓋住路線，所以終點圓點畫在卡片上緣之上。
- 腳印會隨版面重建，點擊監聽要掛在 `[data-route]` 容器上，不要綁在個別腳印。
- 點腳印看冷知識的彩蛋不寫說明文字，只靠最前端腳印（`data-lead`）的波紋與一次性提示引導，用 localStorage 的 `lemoncat:paw-hinted`、`lemoncat:paw-found` 記住。

### 貓咪元素

- 冷知識集中在 `src/data/catFacts.ts`（中英各一份）。只放查得到可靠來源的說法，玩笑句要寫得一看就知道是玩笑。
- Hero 打字列預留兩行高度，換行時下方版面才不會跳。
- Hero 的貓（`HeroCat.astro`）只在 `xl` 以上顯示：再窄的話文字欄會窄到打字列預留的行數不夠。腳本裡的 `matchMedia('(min-width: 80rem)')` 要跟 `xl` 斷點一致。減少動態時眼睛仍會跟著游標，只是沒有緩動、眨眼與甩尾巴。
- 貓掌游標的三種 PNG 由 `pnpm og` 產生在 `public/cursors/`，熱點座標（一般 `10 8`、按下 `11 10`）寫在 `global.css`，改圖時兩邊要一起對。作品封面刻意保留 `cursor-zoom-in`。
- 點擊留下的貓掌（`.click-paw`）刻意不處理右鍵。
- 貓掌圖形統一用 `PawIcon.astro`。

## 部署

- `.github/workflows/deploy.yml` 在 push 到 `main`、每天排程（台灣時間 02:00）、手動 `workflow_dispatch` 時建置並部署。
- 每日排程是為了同步作品卡的 GitHub About，頁尾的最後更新日期也跟著刷新。排程只在預設分支生效，repo 太久沒動 GitHub 會自動停用排程。
- 這是 User Page，`astro.config.mjs` 絕對不可設定 `base`，設了會讓所有資源路徑多一層、全站 404。
