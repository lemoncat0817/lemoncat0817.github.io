---
title: 氣象知多少
tagline: 把中央氣象署的原始資料，變成颱風天、地震後真的會打開來看的網站
summary: 建置在 Nuxt 4 與 Cloudflare Workers 上的氣象資訊平台，涵蓋即時預報、雷達回波動畫、颱風路徑、地震資訊與全台警特報。API 金鑰與資料正規化都在伺服器端完成，並依資料時效分層快取。
year: 2026
role: 前端開發（獨立完成）
type: 邊緣運算資訊平台
stack:
  - Nuxt
  - TypeScript
  - Cloudflare Workers
  - MapLibre GL
  - ECharts
  - Tailwind CSS
  - VueUse
  - Vitest
demo: https://weather-tw.jimdeng0817.workers.dev
repo: https://github.com/lemoncat0817/weather-tw
cover: ../../../assets/work/weather-tw.png
coverAlt: 氣象知多少的首頁，顯示縣市警特報彙整、颱風動態、地震快訊、目前天氣、24 小時趨勢圖與雷達回波地圖
order: 3
featured: true
---

## 這是什麼

氣象知多少是一個把中央氣象署開放資料整理成一般人看得懂的氣象平台——雷達回波動畫、颱風路徑與不確定性錐、地震震度分布、全台警特報彙整全部長在同一個網站裡，建置在 Nuxt 4 上並部署在 Cloudflare 的邊緣網路。

## 問題背景

純前端架構解決不了兩個根本問題：API 金鑰只要打包進 bundle 就看得到，而且沒有伺服器就沒有地方做真正的快取——每次切城市都要重新打一次中央氣象署的 API。

中央氣象署（CWA）的開放資料本身也是老問題：預報、觀測、颱風、地震四種資料集的欄位命名、巢狀深度、大小寫慣例互不一致，各自長得完全不一樣。

## 我的做法

Nuxt 4 讓同一個專案同時擁有前端頁面和伺服器 API 路由（Nitro），部署到 Cloudflare Workers：

- **金鑰只活在伺服器端。** CWA 金鑰透過 `useRuntimeConfig()` 在請求當下讀取，不會進到前端 bundle，也不會出現在任何 API 回應裡。
- **反腐層統一資料形狀。** `server/utils/normalize/**` 把預報、觀測、颱風、地震四種完全不同的 CWA 回應，轉成 `shared/types` 定義好的領域模型。前端元件只認得自己的型別，不需要知道 CWA 原始 JSON 長什麼樣。
- **依資料時效分層快取。** 變動快的雷達回波快取 5 分鐘，預報快取 30 分鐘，幾乎不變的氣候常態快取 6 小時——每支 API 用 `defineCachedEventHandler` 各自設定 TTL，在 Workers 上用 KV 承載，同一份資料不會被重複打上游好幾次。
- **地圖與圖表各司其職。** MapLibre GL 負責雷達回波動畫、測站觀測與 368 鄉鎮溫度的 choropleth；ECharts 負責 24 小時 meteogram 與颱風強度時序這類時間序列圖。

## 技術決策與取捨

### 為什麼選 Nuxt 而不是純前端 SPA

純前端架構解決不了「金鑰要藏起來」這個根本問題——藏金鑰需要一個會執行程式碼的伺服器，不只是靜態檔案。Nuxt 的 Nitro 讓我不用額外維護一個獨立的後端專案，同一個 repo、同一次部署，就同時有了頁面和 API。

### 為什麼部署在 Cloudflare Workers 而不是傳統 serverless

氣象資料的特性是「大量讀取、少量即時性要求」——多數使用者查的是自己所在城市，快取命中率天生就高。Cloudflare 的邊緣網路讓 API 回應從離使用者最近的節點送出，加上 KV 作為跨節點共享的快取層，這個組合對讀取密集的場景特別合適。

### 反腐層值得的成本

四種 CWA 資料集各自要寫一支正規化函式，短期看是多寫了程式碼。但這個成本是一次性的，換來的是前端元件完全不用碰巢狀 JSON、氣象署改欄位名稱時只要修一個檔案。

## 成果

CI 在推送到 `master` 時跑型別檢查、Lint、測試三道關卡，全數通過才建置並部署到 Cloudflare Workers。線上版本可以直接查全台任一縣市的天氣、地圖與颱風動態。
