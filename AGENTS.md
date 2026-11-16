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

**新增一個作品**：在 `src/content/work/zh-TW/` 與 `src/content/work/en/` 各放一個同 slug 的 `.md`（schema 見 `content.config.ts`），封面圖放進 `src/assets/work/`（`astro:assets` 處理最佳化與放大檢視用的原圖）。首頁與案例頁會自動生成，不需要改任何元件。frontmatter 的 `keyword` 是 Hero「最近做的：…」那行裡代表該作品的詞（滑過會跳出封面），兩個語言都要填。

**`src/data/profile.ts` 是個人資料單一來源**，導覽列名字、Hero、關於頁、Footer、SEO meta、JSON-LD 都從這裡讀，不要在元件裡另外寫死。

**`src/i18n/ui.ts`** 是翻譯字典（`UIKey` type 約束兩語言 key 必須一致），搭配 `useTranslations(lang)` 取得 `t()`。缺字會 fallback 回預設語言（繁中），不會顯示 undefined。

**設計 token 在 `src/styles/global.css` 的 `@theme` 區塊**，顏色用 OKLCH。`--color-accent`（填色）與 `--color-accent-text`（文字色）刻意分開：品牌黃當背景好看，但直接當文字色在淺色背景對比不足，這是全站色彩對比的核心取捨，別合併這兩個 token。深/淺主題透過 `data-theme` 屬性 + localStorage 切換，`BaseLayout.astro` 裡有避免 FOUC 的行內同步 script。

**動效系統**（同樣在 `global.css`，全部 `@media (prefers-reduced-motion: no-preference)` 包住）：
- `.reveal`：用原生 CSS scroll-driven animation（`animation-timeline: view()`）做捲動進場，`@supports` 漸進增強，不支援的瀏覽器直接顯示最終狀態、不會空白。
- `.rise`：時間軸動畫，用 `--i` custom property 控制逐項延遲，只用在 Hero 這種一開頁就在可視範圍內的內容（`.reveal` 的 scroll-timeline 對已經在畫面裡的元素不會觸發）。
- `.reveal-stagger`：搭配 `.reveal` 用 `sibling-index()` 讓同層項目逐一錯開進場，不必在 HTML 裡寫索引；不支援時整條宣告失效，退回 `.reveal` 的預設區間。
- `.line-reveal` / `.marker`：Hero 標題整行從遮罩下推上來、螢光筆劃過重點詞。螢光筆底色用 `--color-accent`、字色換成 `--color-accent-ink`，兩個主題都靠這組對比成立。
- `.reveal-parallax`：一個元素要同時跑「進場淡入」與「捲動視差」兩個 scroll-driven 動畫時，**不能拆成兩個各自宣告 `animation-name` 的 class 疊加**——CSS 會讓後宣告的整組 `animation-*` longhand 直接覆蓋前者，不會合併。必須在同一個 class 裡用逗號把兩組 `animation-*` 值並列。漂移用獨立的 `translate` 屬性而非 `transform`，才能跟其他用 `transform` 的動畫（含 Tailwind v4 的 `translate-*` utility，同樣走獨立屬性）共存不打架。

**名字停靠**：導覽列的名字（`Header.astro` 的 `.brand`）在首頁加上 `.brand-dock`，用 `animation-timeline: scroll(root)` 從 Hero 大標的字級與位置縮回左上角，純 CSS。起點位移由 `--hero-pt`（Hero 上方留白，`global.css` 定義、`Hero.astro` 套用）算出，兩邊要一起改。Hero 的 `.hero-name` 是同尺寸的佔位字，支援時隱藏、不支援或減少動態時直接顯示，導覽列名字則維持小字。字級是用 `font-size` 動畫而非 `scale`，大字縮放才不會糊。

**作品路線**（`Route.astro`）：首頁作品卡包在 `<Route>` 裡，script 依各張 `[data-route-stop]` 的 `offsetTop`／`offsetLeft` 畫出 SVG 道路，並沿路每隔一段距離放一個左右交錯的貓腳印。前進位置對應「視窗 55% 高度那條線」並加緩動，走過的腳印依序浮現、太舊的會變淡，到站的卡片會加上 `data-current`。必須讀 `offset*` 而非 `getBoundingClientRect()`：卡片內容有進場與視差的 transform，用後者路線會跟著抖。車道靠 `WorkCard` 的寬度（`lg:w-[78%]`）與左右交錯、手機版的左側 `ml-10` 留出來，改卡片版面時要一起顧到。減少動態時腳印直接跟著捲動位置出現，沒有緩動與彈出動畫。

**Hero 作品關鍵字預覽**：每個關鍵字連結設 `anchor-name`，對應的封面 `.peek` 用 `position-anchor` + `position-area` 貼在字旁，`position-try-fallbacks` 處理靠邊翻面；顯示與否由 `Hero.astro` 產生的行內 `:has()` 規則控制。只在 `(hover: hover) and (pointer: fine)` 且支援 anchor positioning 時啟用，觸控裝置點下去就是一般連結。預覽的定位容器是整個 Hero `section`，別在中間包一層 `relative`，否則空間不夠會被翻到上方蓋住標題。

**跨頁轉場用原生 cross-document View Transitions**（`global.css` 的 `@view-transition`，沒有用 Astro 的 `<ClientRouter>`，每次換頁都是完整載入）：
- 封面共享轉場：作品卡與案例頁主圖都掛 `.vt-cover`，並以 `style="--vt-name: cover-<slug>"` 命名，slug 一律取自 `entrySlug()`。`BaseLayout.astro` 的行內 script 在 `pageswap`／`pagereveal` 只替「首頁 ↔ 案例頁、被點的那一張、且在畫面內」的封面保留命名，其餘設為 `none`。少了這層過濾，切語言或去其他頁時封面會各自飛動或蓋過導覽列。這段 script 必須行內同步，module script 會錯過 `pagereveal`。
- 案例頁的返回連結指向 `#work-<slug>`（`WorkCard` 的 `article` id），讓封面飛回畫面內的卡片。
- 主題切換用同文件 View Transition 做圓形揭露（`ThemeToggle.astro`），期間在 `<html>` 加上 `theme-switching` 與 `vt-no-cover`，避免封面與導覽列名字（`view-transition-name: brand`）自成一組浮在遮罩上方。

**彈窗與游標效果慣例**：
- 新的 `<dialog>` 加上 `.dialog-motion` 就有進出場動畫（`@starting-style` + `allow-discrete`）。關閉時若要清空內容，要等動畫播完再清，參考 `ImageLightbox.astro`。
- 游標追光：元素加上 `.spotlight` 即可，`BaseLayout.astro` 有一段委派的 `pointermove` 負責寫入座標。元素本身要是 `relative`（或其他定位），且只在 `(hover: hover) and (pointer: fine)` 啟用。

**互動元件走原生 `<dialog>`，沒有 UI 元件庫、沒有 React/Vue 等前端框架**（純 Astro + Tailwind CSS 4，僅在需要互動的地方用 vanilla `<script>`）。`ContactModal.astro` 與 `ImageLightbox.astro` 是同一套慣例：`showModal()` / `close()`、點擊座標落在 dialog 外才視為點背景關閉、`modal.dataset.initialized` 防止重複綁定、監聽 `astro:page-load` 重新初始化（目前沒有用 `<ClientRouter>`，這個事件不會觸發；保留是為了日後改用時 DOM 重建不會漏綁）。新增彈窗類元件請照抄這個模式，不要另外引入 lightbox/modal 套件。

**字體自架、建置不連外**：`src/assets/fonts/` 收了 woff2，透過 Astro Fonts API 的 `fontProviders.local()` 載入（見 `astro.config.mjs` 註解）。曾經用 `fontProviders.google()`，但 Google 會輪換 gstatic 檔名 hash，Astro 快取到舊網址會讓 build 直接 404——這是實際發生過的事故，別改回線上 provider。中文字體刻意不載 web font，用系統字型堆疊（`--font-sans`，見 `global.css`），因為 Noto Sans TC 完整字檔太大會拖累 LCP，台灣使用者系統本來就有 PingFang TC / 微軟正黑體可用。Linux 上的字型名稱是 `Noto Sans CJK TC`，字型堆疊裡要寫這個名字才對得到。中文頁面（`:lang(zh)`）刻意允許模擬粗體：Brave 會限制網頁能用的系統字型，挑到只有一種字重的中文字型時，標題才不會掉回細體。

**部署**：push 到 `main` 觸發 `.github/workflows/deploy.yml` → GitHub Actions build → GitHub Pages。這是 User Page（根網域即站台根目錄），`astro.config.mjs` 絕對不可設定 `base`，設了會讓所有資源路徑多一層、全站 404。

## 常見維護作業

- **改個人資料**（是否顯示 email、求職狀態等）：`src/data/profile.ts`
- **改介面文字**：`src/i18n/ui.ts`
- **改配色**：`src/styles/global.css` 的 `@theme` 區塊
- **改 Hero 文案**：`src/i18n/ui.ts` 之外，分享圖（`public/og-default*.png`）裡也有同一句標題，改完要跑 `npm run og`；favicon 的貓掌也由同一支腳本產生
