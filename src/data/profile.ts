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

  /** 是否在 Hero 顯示「開放合作機會」狀態燈。 */
  available: true,

  /** 用來自動算年資，不必每年手動改。 */
  codingSince: 2023,

  /**
   * Serverless 表單轉發端點（Formspree / Web3Forms 等）。
   * 訪客可在站內彈窗直接填表送出，自動轉寄至上方 email。
   */
  formEndpoint: 'https://formspree.io/f/mljebebn',
} as const;
