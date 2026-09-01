import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// 直接使用 zod：astro:content 轉出的 `z` 已標記為 deprecated
import * as z from 'zod';

/**
 * 作品案例研究。
 *
 * 檔案結構：src/content/work/<lang>/<slug>.md
 * 例如     src/content/work/zh-TW/maji-pos.md
 *          src/content/work/en/maji-pos.md
 *
 * 新增一個作品 = 新增兩個 Markdown 檔，不需要改動任何元件。
 */
const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** 一句話定位：這是什麼、為誰做 */
      tagline: z.string(),
      /** 卡片與 SEO description 用的摘要 */
      summary: z.string(),

      year: z.number().int().min(2020).max(2100),
      role: z.string(),
      type: z.string(),
      stack: z.array(z.string()).min(1),

      demo: z.url(),
      repo: z.url(),
      /** YouTube 影片 ID（可選）。有值時案例頁會嵌入播放器。 */
      video: z.string().optional(),

      cover: image(),
      /** 封面替代文字 — 無障礙必填，不接受空字串 */
      coverAlt: z.string().min(1),

      /** 首頁 Bento 排序，數字小的在前 */
      order: z.number().int(),
      /** 是否為主打作品（在 Bento 網格佔較大版位） */
      featured: z.boolean().default(false),
    }),
});

export const collections = { work };
