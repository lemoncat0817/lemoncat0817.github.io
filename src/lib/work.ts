import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

/**
 * 作品集合的 id 形如 `zh-tw/maji-pos`。
 * 這裡把語言前綴剝掉，得到跨語言共用的 slug。
 */
export function entrySlug(entry: CollectionEntry<'work'>): string {
  return entry.id.split('/').pop()!;
}

/**
 * 取得指定語言的作品，依 order 排序。
 *
 * 注意：glob loader 會把 id 轉成小寫 slug，資料夾 `zh-TW/` 對應到的 id 是
 * `zh-tw/...`。因此這裡必須做大小寫不敏感的比對 —— 直接用 `zh-TW/` 比對會
 * 一筆都match 不到，而且 `en` 因為本來就是小寫會正常運作，導致問題只在中文
 * 版浮現、很容易漏掉。
 */
export async function getWorkEntries(lang: Lang): Promise<CollectionEntry<'work'>[]> {
  const prefix = `${lang.toLowerCase()}/`;
  const entries = await getCollection('work', ({ id }) => id.toLowerCase().startsWith(prefix));
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** 案例頁底部「下一個專案」用的循環導覽。 */
export function nextEntry(
  entries: CollectionEntry<'work'>[],
  current: CollectionEntry<'work'>,
): CollectionEntry<'work'> {
  const i = entries.findIndex((e) => e.id === current.id);
  return entries[(i + 1) % entries.length]!;
}
