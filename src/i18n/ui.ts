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
    'nav.stack': '技術',
    'nav.about': '關於',
    'nav.skipToContent': '跳至主要內容',
    'nav.toggleTheme': '切換深淺色主題',
    'nav.switchLang': 'Switch to English',
    'nav.home': '回首頁',
    'nav.menu': '選單',

    'hero.role': '網頁工程師',
    'hero.headline.1': '我把想法',
    'hero.headline.2': '變成能用的介面',
    'hero.intro':
      '從點餐流程到氣象資料視覺化，我用 Vue 生態系打造真正跑得動、而且好用的網頁應用。',
    'hero.location': '高雄，台灣',
    'hero.available': '開放合作機會',
    'hero.projectCount': '個上線專案',
    'hero.yearsLabel': '年開發經驗',
    'hero.viewWork': '看看我的作品',
    'hero.scrollHint': '向下捲動',

    'work.eyebrow': '精選作品',
    'work.title': '四個從零做到上線的專案',
    'work.intro': '每個專案都有完整的問題背景與技術決策，不只是截圖。',
    'work.readCase': '閱讀案例研究',
    'work.viewDemo': '線上 Demo',
    'work.viewSource': '原始碼',
    'work.allProjects': '全部作品',

    'stack.eyebrow': '技術棧',
    'stack.title': '我用什麼做出這些東西',
    'stack.intro': '點擊任一技術，看看實際用它做出來的專案 — 技能由作品背書，不是自評分數。',
    'stack.usedIn': '使用於',
    'stack.showAll': '顯示全部',
    'stack.filtered': '已篩選',

    'about.eyebrow': '關於',
    'about.title': '關於我',

    'contact.eyebrow': '聯絡',
    'contact.title': '一起做點東西',
    'contact.intro': '對我的作品有興趣，或想聊聊合作機會，歡迎透過 GitHub 找到我。',
    'contact.github': '前往 GitHub',
    'contact.email': '寄信給我',
    'contact.copied': '已複製 Email！',
    'contact.copyHint': '點擊複製信箱',

    'modal.title': '傳送訊息',
    'modal.subtitle': '填寫下方表單直接送出，我會盡快回覆您。',
    'modal.name': '您的稱呼 / 姓名',
    'modal.namePlaceholder': '例如：王小明',
    'modal.email': '您的電子郵件',
    'modal.emailPlaceholder': 'name@example.com',
    'modal.message': '訊息內容',
    'modal.messagePlaceholder': '想聊聊合作機會、專案諮詢或任何想法...',
    'modal.send': '送出訊息',
    'modal.sending': '正在傳送...',
    'modal.successTitle': '訊息已成功送出！',
    'modal.successDesc': '感謝您的來信，我已收到您的訊息，會盡快回覆您。',
    'modal.close': '關閉',
    'modal.orGmail': '以 Gmail 網頁版開啟',
    'modal.copyEmail': '複製 Email 地址',
    'modal.errorTitle': '暫時無法直接傳送',
    'modal.errorDesc': '您可以點擊下方按鈕以 Gmail 寄信，或直接複製 Email 地址。',

    'case.overview': '專案概要',
    'case.role': '擔任角色',
    'case.year': '年份',
    'case.stack': '技術棧',
    'case.type': '專案類型',
    'case.backToWork': '返回作品列表',
    'case.nextProject': '下一個專案',
    'case.liveDemo': '線上 Demo',
    'case.sourceCode': '原始碼',
    'case.videoTitle': '功能展示影片',
    'case.toc': '本頁內容',

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
    'nav.stack': 'Stack',
    'nav.about': 'About',
    'nav.skipToContent': 'Skip to main content',
    'nav.toggleTheme': 'Toggle colour theme',
    'nav.switchLang': '切換為繁體中文',
    'nav.home': 'Back to home',
    'nav.menu': 'Menu',

    'hero.role': 'Web Engineer',
    'hero.headline.1': 'I turn ideas',
    'hero.headline.2': 'into interfaces that work',
    'hero.intro':
      'From ordering flows to weather data visualisation, I build web apps with the Vue ecosystem that actually ship — and that people can actually use.',
    'hero.location': 'Kaohsiung, Taiwan',
    'hero.available': 'Open to opportunities',
    'hero.projectCount': 'shipped projects',
    'hero.yearsLabel': 'years building',
    'hero.viewWork': 'See my work',
    'hero.scrollHint': 'Scroll',

    'work.eyebrow': 'Selected work',
    'work.title': 'Four projects taken from zero to production',
    'work.intro':
      'Each one comes with the problem behind it and the technical decisions made along the way — not just screenshots.',
    'work.readCase': 'Read case study',
    'work.viewDemo': 'Live demo',
    'work.viewSource': 'Source',
    'work.allProjects': 'All work',

    'stack.eyebrow': 'Stack',
    'stack.title': 'What I build with',
    'stack.intro':
      'Click any technology to see the projects I actually used it in — skills backed by work, not self-rated percentages.',
    'stack.usedIn': 'Used in',
    'stack.showAll': 'Show all',
    'stack.filtered': 'Filtered',

    'about.eyebrow': 'About',
    'about.title': 'About me',

    'contact.eyebrow': 'Contact',
    'contact.title': "Let's build something",
    'contact.intro':
      'If my work interests you or you want to talk about working together, find me on GitHub.',
    'contact.github': 'Go to GitHub',
    'contact.email': 'Send me an email',
    'contact.copied': 'Email copied!',
    'contact.copyHint': 'Click to copy email',

    'modal.title': 'Send a Message',
    'modal.subtitle': 'Fill in the form below and I will get back to you as soon as possible.',
    'modal.name': 'Your Name',
    'modal.namePlaceholder': 'e.g. Jane Doe',
    'modal.email': 'Your Email',
    'modal.emailPlaceholder': 'name@example.com',
    'modal.message': 'Message',
    'modal.messagePlaceholder': 'Discuss a project, ask a question, or say hello...',
    'modal.send': 'Send Message',
    'modal.sending': 'Sending...',
    'modal.successTitle': 'Message Sent Successfully!',
    'modal.successDesc': 'Thank you! I have received your message and will reply soon.',
    'modal.close': 'Close',
    'modal.orGmail': 'Compose in Gmail Web',
    'modal.copyEmail': 'Copy email address',
    'modal.errorTitle': 'Unable to send directly',
    'modal.errorDesc': 'You can open Gmail directly or copy my email address below.',

    'case.overview': 'Overview',
    'case.role': 'Role',
    'case.year': 'Year',
    'case.stack': 'Stack',
    'case.type': 'Type',
    'case.backToWork': 'Back to work',
    'case.nextProject': 'Next project',
    'case.liveDemo': 'Live demo',
    'case.sourceCode': 'Source code',
    'case.videoTitle': 'Feature walkthrough',
    'case.toc': 'On this page',

    'footer.rights': 'All rights reserved',
    'footer.source': 'Source of this site',

    '404.title': 'Page not found',
    '404.intro': 'This URL does not exist — the link may be outdated or mistyped.',
    '404.back': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh-TW'];
