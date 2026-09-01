/**
 * 產生社群分享圖（Open Graph）與 apple-touch-icon。
 *
 * 執行：npm run og
 * 產物：public/og-default.png（1200×630）、public/apple-touch-icon.png（180×180）
 *
 * 這兩個檔案會進版控，不需要每次建置都重跑；改了文案或配色再執行一次即可。
 * 字體刻意使用系統通用字族 —— 這支腳本在 Windows 與 CI 上都要能跑。
 */
import sharp from 'sharp';

const FONT = 'Verdana, DejaVu Sans, Geneva, sans-serif';
const BG = '#191a1f';
const FG = '#f4f4f6';
const MUTED = '#a8a9b4';
const FAINT = '#84858f';
const ACCENT = '#f5c518';
const ACCENT_INK = '#2b2412';

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <rect x="80" y="82" width="52" height="52" rx="12" fill="${ACCENT}"/>
  <text x="97" y="121" font-family="${FONT}" font-size="34" font-weight="700" fill="${ACCENT_INK}">L</text>
  <text x="152" y="120" font-family="${FONT}" font-size="27" font-weight="600" fill="${FG}">Lemoncat</text>

  <text x="80" y="300" font-family="${FONT}" font-size="76" font-weight="700" fill="${FG}">Web Engineer</text>
  <text x="80" y="392" font-family="${FONT}" font-size="76" font-weight="700" fill="${ACCENT}">Vue · TypeScript</text>
  <text x="80" y="482" font-family="${FONT}" font-size="30" fill="${MUTED}">Kaohsiung, Taiwan · 4 shipped projects</text>

  <rect x="80" y="536" width="1040" height="1" fill="#ffffff" opacity="0.12"/>
  <text x="80" y="582" font-family="${FONT}" font-size="24" fill="${FAINT}">lemoncat0817.github.io</text>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${ACCENT}"/>
  <path d="M11 7.5h3.6v13.2h7.4V24H11z" fill="${ACCENT_INK}"/>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og-default.png');
await sharp(Buffer.from(icon)).resize(180, 180).png({ compressionLevel: 9 }).toFile('public/apple-touch-icon.png');

console.log('✓ public/og-default.png + public/apple-touch-icon.png');
