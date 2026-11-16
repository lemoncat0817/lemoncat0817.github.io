export const languages = {
  'zh-TW': '繁體中文',
  en: 'English',
} as const;

export const defaultLang = 'zh-TW' as const;
export type Lang = keyof typeof languages;

export const ui = {
  'zh-TW': {
    'meta.title': 'Lemoncat — 網頁工程師',
    'meta.description':
      '專注 Vue 生態系的網頁工程師，來自高雄。作品包含 POS 點餐系統、氣象資訊站、寵物咖啡廳形象網站與待辦事項應用。',

    'nav.work': '作品',
    'nav.about': '關於',
    'nav.contact': '聯絡',
    'nav.skipToContent': '跳至主要內容',
    'nav.toggleTheme': '切換深淺色主題',
    'nav.switchLang': 'Switch to English',
    'nav.menu': '選單',

    'hero.role': '網頁工程師',
    'hero.headline.1': '好用的網頁，',
    'hero.headline.2': '是一個一個決定堆出來的。',
    'hero.mark': '一個一個決定',
    'hero.recent': '最近做的：',
    'hero.available': '開放合作機會',
    'hero.viewWork': '看看我的作品',
    'hero.scrollHint': '向下捲動',

    'work.eyebrow': '作品',
    'work.stop': '第 {n} 站',
    'work.pawHint': '喵？點我看看',
    'work.viewDemo': '線上 Demo',
    'work.viewSource': '原始碼',
    'work.allProjects': '全部作品',
    'work.zoomImage': '放大檢視截圖',

    'about.eyebrow': '關於',
    'about.title': '關於我',

    'contact.eyebrow': '聯絡',
    'contact.title': '一起做點東西',
    'contact.intro': '想聊工作或合作，直接寄信給我；想看我最近在寫什麼，GitHub 上都有。',
    'contact.github': '前往 GitHub',
    'contact.email': '寄信給我',
    'contact.copy': '複製信箱',
    'contact.copied': '已複製',
    'contact.copyFailed': '已選取，請手動複製',

    'modal.close': '關閉',

    'case.stack': '技術棧',

    'footer.rights': '版權所有',
    'footer.source': '本站原始碼',

    '404.title': '找不到這個頁面',
    '404.intro': '這個網址不存在，可能是連結過期或輸入有誤。',
    '404.back': '返回首頁',
  },

  en: {
    'meta.title': 'Lemoncat — Web Engineer',
    'meta.description':
      'Web engineer from Kaohsiung, Taiwan, focused on the Vue ecosystem. Projects include a POS ordering system, a weather data app, a pet cafe site, and a todo app.',

    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.skipToContent': 'Skip to main content',
    'nav.toggleTheme': 'Toggle colour theme',
    'nav.switchLang': '切換為繁體中文',
    'nav.menu': 'Menu',

    'hero.role': 'Web Engineer',
    'hero.headline.1': 'Good interfaces',
    'hero.headline.2': 'are a pile of small decisions.',
    'hero.mark': 'small decisions',
    'hero.recent': 'Recently: ',
    'hero.available': 'Open to opportunities',
    'hero.viewWork': 'See my work',
    'hero.scrollHint': 'Scroll',

    'work.eyebrow': 'Work',
    'work.stop': 'Stop {n}',
    'work.pawHint': 'Meow? Click me',
    'work.viewDemo': 'Live demo',
    'work.viewSource': 'Source',
    'work.allProjects': 'All work',
    'work.zoomImage': 'View enlarged screenshot',

    'about.eyebrow': 'About',
    'about.title': 'About me',

    'contact.eyebrow': 'Contact',
    'contact.title': "Let's build something",
    'contact.intro':
      "For jobs or collaborations, email me directly. To see what I'm working on lately, it's all on GitHub.",
    'contact.github': 'Go to GitHub',
    'contact.email': 'Email me',
    'contact.copy': 'Copy email',
    'contact.copied': 'Copied',
    'contact.copyFailed': 'Selected, copy it manually',

    'modal.close': 'Close',

    'case.stack': 'Stack',

    'footer.rights': 'All rights reserved',
    'footer.source': 'Source of this site',

    '404.title': 'Page not found',
    '404.intro': 'This URL does not exist. The link may be outdated or mistyped.',
    '404.back': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh-TW'];
