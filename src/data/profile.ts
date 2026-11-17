/**
 * 個人資料單一來源。
 * 這裡的值會流向 Hero、關於頁、Footer、SEO meta 與 JSON-LD 結構化資料。
 */
export const profile = {
  name: 'Lemoncat',
  nameZh: '檸檬貓',
  github: 'https://github.com/lemoncat0817',
  githubUser: 'lemoncat0817',
  siteUrl: 'https://lemoncat0817.github.io',

  /** 留空字串就不會顯示 email 連結，只保留 GitHub。 */
  email: 'jimdeng0817@gmail.com',

  /** 用來自動算年資，不必每年手動改。 */
  codingSince: 2023,
} as const;
