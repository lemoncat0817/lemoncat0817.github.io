import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// 直接使用 zod：astro:content 轉出的 `z` 已標記為 deprecated
import * as z from 'zod';

/**
 * 首頁作品卡的資料，只用 frontmatter，沒有內文（詳細說明在各專案 repo 的 README）。
 *
 * 檔案結構：src/content/work/<lang>/<slug>.md
 * 新增一個作品 = 新增兩個 Markdown 檔，不需要改動任何元件。
 */
const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** 一句話定位。中文版會優先用 GitHub repo 的 About（見 lib/repoAbout.ts），這裡是抓不到時的備援 */
      tagline: z.string(),
      /** Hero「最近做的」那行裡代表這個作品的詞，滑過會顯示封面 */
      keyword: z.string().min(1),
      stack: z.array(z.string()).min(1),

      demo: z.url(),
      repo: z.url(),

      cover: image(),
      /** 封面替代文字，無障礙必填，不接受空字串 */
      coverAlt: z.string().min(1),

      /** 首頁排序，數字小的在前 */
      order: z.number().int(),
    }),
});

export const collections = { work };
