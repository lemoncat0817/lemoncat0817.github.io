// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lemoncat0817.github.io',
  // 本 repo 是 User Page（<username>.github.io），網站根目錄就是 /。
  // 這裡「不可」設定 base — 設了會讓所有資源多一層路徑而全站 404。
  trailingSlash: 'always',

  i18n: {
    locales: ['zh-TW', 'en'],
    defaultLocale: 'zh-TW',
    routing: {
      prefixDefaultLocale: false, // 繁中 → /，英文 → /en/
    },
  },

  // Astro 內建字體 API：自動下載自架、subset、preload，
  // 並產生 metric-matched fallback（避免字體換手時的 CLS）。
  //
  // 中文刻意「不」載入 web font：Noto Sans TC 完整字檔 > 5 MB，
  // 即使切片也會嚴重拖累 LCP。台灣使用者的系統本來就有優秀的中文字體
  // （PingFang TC / 微軟正黑體），改用系統堆疊 → 0 bytes 且立即繪製。
  // 詳見 src/styles/global.css 的 --font-sans 定義。
  // 字體檔自架於 src/assets/fonts/，不在建置期向 Google 取檔。
  //
  // 原本用 fontProviders.google()，但 Google 會輪換 gstatic 的檔名 hash，
  // 一旦 Astro 快取到舊網址就會 404 而導致建置失敗（實際發生過）。
  // 把 woff2 收進 repo 之後：建置不依賴外部網路、結果可重現、CI 不會因為
  // 第三方服務變動而掛掉，也省下建置期的下載時間。
  //
  // 要更新字體版本時執行：npm run fonts
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Space Grotesk',
      cssVariable: '--font-display',
      display: 'swap',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/SpaceGrotesk-latin.woff2'],
            weight: '300 700', // 可變字體區間
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono-web',
      display: 'swap',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/JetBrainsMono-latin.woff2'],
            weight: '400 600',
            style: 'normal',
          },
        ],
      },
    },
  ],

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh-TW',
        locales: { 'zh-TW': 'zh-Hant-TW', en: 'en' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    // CSS 全部行內化會讓 HTML 變大；維持外部檔案以利快取
    inlineStylesheets: 'auto',
  },
});
