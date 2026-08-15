/**
 * 個人資料單一來源。
 * 這裡的值會流向 Hero、關於頁、Footer、SEO meta 與 JSON-LD 結構化資料。
 */
export const profile = {
  name: 'Lemoncat',
  nameZh: '檸檬',
  github: 'https://github.com/lemoncat0817',
  githubUser: 'lemoncat0817',
  siteUrl: 'https://lemoncat0817.github.io',

  /** 留空字串就不會顯示 email 連結，只保留 GitHub。 */
  email: '',

  /** 是否在 Hero 顯示「開放合作機會」狀態燈。 */
  available: true,

  /** GitHub 帳號建立於 2022-04，用來自動算年資，不必每年手動改。 */
  codingSince: 2022,
} as const;

/**
 * 首頁技術棧區塊。每項技術對應到實際使用它的專案 slug，讓技能由作品背書
 * （取代舊站無法驗證的自評進度條）。
 *
 * 資料來源：各專案 repo 的 package.json 與 GitHub 語言統計，非估計值。
 * 新增專案時請一併更新此處的對應關係。
 */
export const techStack = [
  { name: 'Vue 3', projects: ['maji-pos', 'weather', 'pet-cafe', 'todo-list'] },
  { name: 'TypeScript', projects: ['weather'] },
  { name: 'JavaScript', projects: ['maji-pos', 'pet-cafe', 'todo-list'] },
  { name: 'Pinia', projects: ['maji-pos', 'weather', 'pet-cafe'] },
  { name: 'Vue Router', projects: ['maji-pos', 'weather'] },
  { name: 'Element Plus', projects: ['maji-pos', 'weather', 'pet-cafe'] },
  { name: 'ECharts', projects: ['maji-pos', 'weather'] },
  { name: 'Axios', projects: ['weather'] },
  { name: 'Tailwind CSS', projects: ['maji-pos'] },
  { name: 'Sass', projects: ['maji-pos', 'weather', 'pet-cafe'] },
  { name: 'VueUse', projects: ['pet-cafe'] },
  { name: 'Vite', projects: ['maji-pos', 'weather', 'pet-cafe', 'todo-list'] },
  { name: 'RWD', projects: ['maji-pos', 'weather', 'pet-cafe', 'todo-list'] },
  { name: 'Git', projects: ['maji-pos', 'weather', 'pet-cafe', 'todo-list'] },
] as const;

export type TechItem = (typeof techStack)[number];
