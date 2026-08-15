import { defaultLang, ui, type Lang, type UIKey } from './ui';

/** 從 URL 取出語言。`/en/...` → 'en'，其餘 → 'zh-TW'。 */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'en') return 'en';
  return defaultLang;
}

/** 取得翻譯函式。缺字時退回預設語言，不會顯示 undefined。 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * 產生帶語言前綴的路徑。
 * zh-TW（預設語言）不加前綴；en 加 /en。
 * 全站一律尾隨斜線，與 astro.config 的 trailingSlash: 'always' 一致。
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = `/${path.replace(/^\/+|\/+$/g, '')}`;
  const base = lang === defaultLang ? clean : `/en${clean === '/' ? '' : clean}`;
  return base === '/' ? '/' : `${base}/`;
}

/** html lang 屬性用的正式 BCP 47 標籤。 */
export function htmlLang(lang: Lang): string {
  return lang === 'zh-TW' ? 'zh-Hant-TW' : 'en';
}

/** 目前頁面在「另一個語言」的對應網址，供語言切換鈕使用。 */
export function alternateUrl(url: URL, lang: Lang): string {
  const path = url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return localizePath(path, lang === 'zh-TW' ? 'en' : 'zh-TW');
}

export { defaultLang, type Lang };
