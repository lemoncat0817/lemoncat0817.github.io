/**
 * 產生社群分享圖（Open Graph）、favicon、apple-touch-icon 與貓掌游標。
 *
 * 執行：pnpm og
 * 產物：public/og-default.png、public/og-default-en.png（1200×630）、
 *       public/favicon.svg、public/apple-touch-icon.png（180×180）、
 *       public/cursors/paw*.png（一般、指到連結、按下三種，各有 1x／2x）
 *
 * 產物會進版控，改了文案或配色再執行一次即可。
 * 中文分享圖需要本機有中文黑體（Noto Sans CJK TC／微軟正黑體／蘋方擇一）；sharp 讀不了 repo 裡的 woff2，英文版用系統字型。
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const BG = '#0e1015';
const ROAD = '#1b1e26';
const FG = '#f4f4f6';
const FAINT = '#7d7f8a';
const ACCENT = '#f5c518';
const ACCENT_INK = '#2b2412';
const CJK = 'Noto Sans CJK TC,Microsoft JhengHei,PingFang TC';

// 朝上的貓掌：掌墊下緣有凹口，四顆趾豆呈弧形排列（32×32 格線）
const PAW = `
  <path d="M16 15.2c3.7 0 6.6 3 6.6 5.8 0 2.7-2.1 3.8-3.7 3.8-1.3 0-1.9-.7-2.9-.7s-1.6.7-2.9.7c-1.6 0-3.7-1.1-3.7-3.8 0-2.8 2.9-5.8 6.6-5.8z"/>
  <ellipse cx="8.9" cy="13.4" rx="2.2" ry="2.7" transform="rotate(-22 8.9 13.4)"/>
  <ellipse cx="13.2" cy="9.2" rx="2.3" ry="2.9" transform="rotate(-6 13.2 9.2)"/>
  <ellipse cx="18.8" cy="9.2" rx="2.3" ry="2.9" transform="rotate(6 18.8 9.2)"/>
  <ellipse cx="23.1" cy="13.4" rx="2.2" ry="2.7" transform="rotate(22 23.1 13.4)"/>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${ACCENT}"/>
  <g fill="${ACCENT_INK}" transform="translate(0 0.4)">${PAW}
  </g>
</svg>
`;

// 分享圖右下角的一段 S 形道路，腳印沿路往右上走、越早的越淡
const segs = [
  [[560, 700], [700, 610], [760, 560], [880, 530]],
  [[880, 530], [1010, 498], [1090, 420], [1240, 330]],
];
const bez = ([a, b, c, d], t) => {
  const u = 1 - t;
  return [0, 1].map((k) => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k]);
};
const samples = segs.flatMap((s, i) => Array.from({ length: 200 }, (_, j) => bez(s, (j + (i ? 1 : 0)) / 200)));
const lengths = [0];
for (let i = 1; i < samples.length; i++) {
  lengths.push(lengths[i - 1] + Math.hypot(samples[i][0] - samples[i - 1][0], samples[i][1] - samples[i - 1][1]));
}
const pointAt = (l) => {
  const i = Math.max(1, lengths.findIndex((x) => x >= l));
  const [x0, y0] = samples[i - 1];
  const [x1, y1] = samples[i];
  return { x: x0, y: y0, angle: Math.atan2(y1 - y0, x1 - x0) };
};
const roadD = `M ${segs[0][0]} C ${segs[0].slice(1).join(' ')} C ${segs[1].slice(1).join(' ')}`;
let paws = '';
const firstStep = 120;
const lastStep = lengths.at(-1) - 150;
for (let l = firstStep, i = 0; l < lastStep; l += 50, i++) {
  const { x, y, angle } = pointAt(l);
  const side = i % 2 ? 7 : -7;
  const px = x - Math.sin(angle) * side;
  const py = y + Math.cos(angle) * side;
  const opacity = Math.min(1, 0.25 + (0.75 * (l - firstStep)) / (lastStep - firstStep));
  const deg = (angle * 180) / Math.PI + 90;
  paws += `<g transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${deg.toFixed(1)}) scale(0.95) translate(-16 -16)" fill="${ACCENT}" opacity="${opacity.toFixed(2)}">${PAW}</g>`;
}

const base = (url) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <path d="${roadD}" fill="none" stroke="${ROAD}" stroke-width="34" stroke-linecap="round"/>
  <path d="${roadD}" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="2" stroke-dasharray="10 14"/>
  ${paws}
  <text x="80" y="566" font-family="DejaVu Sans Mono, Consolas, monospace" font-size="24" fill="${FAINT}">${url}</text>
</svg>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const text = (markup, font) => sharp({ text: { text: markup, font, rgba: true, dpi: 72, spacing: 6 } }).png().toBuffer();

const variants = [
  {
    file: 'public/og-default.png',
    name: '檸檬貓',
    nameFont: `${CJK} Bold 128`,
    lines: ['網頁該像貓，', ['', '輕巧、安靜、剛好', '在你要的地方。']],
    lineFont: `${CJK} Bold 62`,
  },
  {
    file: 'public/og-default-en.png',
    name: 'Lemoncat',
    nameFont: 'Space Grotesk,Noto Sans,DejaVu Sans Bold 128',
    lines: ['Websites should be like cats:', ['', 'light, quiet', ', and right where\nyou want them.']],
    lineFont: 'Space Grotesk,Noto Sans,DejaVu Sans Bold 62',
  },
];

for (const v of variants) {
  const [line1, [before, mark, after]] = v.lines;
  const markup =
    `<span foreground="${FG}">${esc(line1)}\n${esc(before)}</span>` +
    `<span foreground="${ACCENT_INK}" background="${ACCENT}">\u2009${esc(mark)}\u2009</span>` +
    `<span foreground="${FG}">${esc(after)}</span>`;
  const [nameImg, headlineImg] = await Promise.all([
    text(`<span foreground="${FG}">${esc(v.name)}</span>`, v.nameFont),
    text(markup, v.lineFont),
  ]);
  await sharp(Buffer.from(base('lemoncat0817.github.io')))
    .composite([
      { input: nameImg, left: 74, top: 70 },
      { input: headlineImg, left: 80, top: 250 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(v.file);
}

// 游標：貓掌往左傾，熱點落在左二趾尖，global.css 的 cursor 座標（一般 10 8、按下 11 9）要跟著這裡改
const cursor = (fill, stroke, pressed = false) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <g transform="translate(16 16) scale(${pressed ? '0.77 0.7' : '0.9'}) rotate(-20) translate(-16 -16)" fill="${fill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" paint-order="stroke">${PAW}
  </g>
</svg>`;
await mkdir('public/cursors', { recursive: true });
for (const [name, svg] of [
  ['paw', cursor(ACCENT, ACCENT_INK)],
  ['paw-pointer', cursor(ACCENT_INK, ACCENT)],
  ['paw-pressed', cursor(ACCENT, ACCENT_INK, true)],
]) {
  await sharp(Buffer.from(svg), { density: 288 }).resize(32, 32).png().toFile(`public/cursors/${name}.png`);
  await sharp(Buffer.from(svg), { density: 288 }).resize(64, 64).png().toFile(`public/cursors/${name}@2x.png`);
}

await writeFile('public/favicon.svg', icon);
await sharp(Buffer.from(icon)).resize(180, 180).png({ compressionLevel: 9 }).toFile('public/apple-touch-icon.png');

console.log('✓ public/og-default.png、og-default-en.png、favicon.svg、apple-touch-icon.png、cursors/');
