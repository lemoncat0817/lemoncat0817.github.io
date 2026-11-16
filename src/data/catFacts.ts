import type { Lang } from '../i18n/ui';

/**
 * Hero 打字列與作品路線腳印用的貓咪冷知識。
 * 只放查得到可靠來源的說法；最後兩句是玩笑，不是知識。
 */
export const catFacts: Record<Lang, string[]> = {
  'zh-TW': [
    '貓一天大約要睡 12 到 16 個小時。',
    '貓嚐不到甜味，負責甜味受體的基因在牠們身上是壞掉的。',
    '成年的貓彼此之間很少喵喵叫，「喵」大多是叫給人聽的。',
    '貓的呼嚕聲頻率大約落在 25 到 150 赫茲。',
    '貓對你慢慢眨眼，代表牠很放鬆，也信任你。',
    '多數貓的前腳有五根腳趾，後腳只有四根。',
    '貓從高處掉下來時，會在空中把身體翻正再落地。',
    '貓用前腳踩踩，一般認為是小時候喝奶留下的習慣。',
    'bug 跟貓一樣，總是在你不注意的時候跑到鍵盤上。',
    '如果這行有錯字，那是貓踩過鍵盤。',
  ],
  en: [
    'Cats sleep around 12 to 16 hours a day.',
    "Cats can't taste sweetness. The gene for their sweet receptor doesn't work.",
    'Adult cats rarely meow at each other. Most meows are meant for humans.',
    "A cat's purr sits roughly between 25 and 150 Hz.",
    "A slow blink from a cat means it's relaxed and trusts you.",
    'Most cats have five toes on each front paw and four on each back paw.',
    'When a cat falls, it twists in midair to land on its feet.',
    'Kneading is thought to be a habit left over from nursing as a kitten.',
    'Bugs are like cats: they show up on the keyboard the moment you look away.',
    'If this line has a typo, blame the cat on the keyboard.',
  ],
};
