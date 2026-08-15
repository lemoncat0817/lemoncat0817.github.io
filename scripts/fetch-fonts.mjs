/**
 * 下載字體檔到 src/assets/fonts/。
 *
 * 執行：npm run fonts
 *
 * 為什麼要自己收字體檔而不是讓 Astro 在建置時去抓：
 * Google 會輪換 fonts.gstatic.com 的檔名 hash，舊網址會變成 404。
 * 一旦建置流程依賴那些網址，就等於把「網站能不能建置成功」交給
 * 第三方服務的檔名穩定度 —— 這實際害過我們一次。
 *
 * 字體檔進版控之後，建置完全離線可重現。這支腳本只有在要換字體或
 * 更新字體版本時才需要執行，平常不會用到。
 */
import { writeFile, mkdir } from 'node:fs/promises';

// 用桌面版 Chrome 的 UA，Google 才會回傳 woff2 的可變字體版本
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const FAMILIES = [
  { family: 'Space Grotesk', axis: 'wght@300..700', out: 'SpaceGrotesk-latin.woff2' },
  { family: 'JetBrains Mono', axis: 'wght@400..600', out: 'JetBrainsMono-latin.woff2' },
];

// 只取 latin 子集：介面的西文字元都在這個範圍內，
// 中文則走系統字體堆疊（見 src/styles/global.css）。
const SUBSET = 'latin';

await mkdir('src/assets/fonts', { recursive: true });

for (const { family, axis, out } of FAMILIES) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  ).replace(/%20/g, '+')}:${axis}&display=swap`;

  const css = await fetch(cssUrl, { headers: { 'User-Agent': UA } }).then((r) => {
    if (!r.ok) throw new Error(`取得 ${family} 的 CSS 失敗：HTTP ${r.status}`);
    return r.text();
  });

  // 找到 /* latin */ 註解之後的第一個 src url()
  const marker = `/* ${SUBSET} */`;
  const idx = css.indexOf(marker);
  if (idx === -1) throw new Error(`${family} 的 CSS 中找不到 ${SUBSET} 子集`);
  const url = css.slice(idx).match(/src:\s*url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`${family} 的 ${SUBSET} 區塊中找不到字體網址`);

  const buf = await fetch(url).then((r) => {
    if (!r.ok) throw new Error(`下載 ${family} 失敗：HTTP ${r.status}`);
    return r.arrayBuffer();
  });

  await writeFile(`src/assets/fonts/${out}`, Buffer.from(buf));
  console.log(`✓ ${out}  ${(buf.byteLength / 1024).toFixed(1)} KB`);
}

console.log('\n完成。字體檔請一併進版控。');
