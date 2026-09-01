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
  formEndpoint: 'https://formspree.io/f/xpwzgkqv',
} as const;

/**
 * 首頁技術棧區塊。每項技術對應到實際使用它的專案 slug，讓技能由作品背書
 * （取代舊站無法驗證的自評進度條）。
 *
 * 資料來源：各專案 repo 的 package.json 與 GitHub 語言統計，非估計值。
 * 新增專案或幫舊專案換技術棧時，請一併更新此處的對應關係。
 */
export const techStack = [
  { name: 'Vue 3', projects: ['maji-pos', 'todo-list', 'weather-tw', 'lohas-pets-cafe'] },
  { name: 'Angular', projects: [] },
  { name: 'Spring Boot', projects: [] },
  { name: 'TypeScript', projects: ['todo-list', 'weather-tw', 'lohas-pets-cafe'] },
  { name: 'Nuxt', projects: ['weather-tw', 'lohas-pets-cafe'] },
  { name: 'Tailwind CSS', projects: ['maji-pos', 'todo-list', 'weather-tw', 'lohas-pets-cafe'] },
  { name: 'shadcn-vue', projects: ['lohas-pets-cafe'] },
  { name: 'Element Plus', projects: ['maji-pos'] },
  { name: 'ECharts', projects: ['maji-pos', 'weather-tw'] },
  { name: 'MapLibre GL', projects: ['weather-tw'] },
  { name: 'Cloudflare Workers', projects: ['weather-tw'] },
  { name: 'Supabase', projects: ['todo-list'] },
  { name: 'Vitest', projects: ['todo-list', 'weather-tw'] },
  { name: 'Playwright', projects: ['todo-list'] },
] as const;

export type TechItem = (typeof techStack)[number];
