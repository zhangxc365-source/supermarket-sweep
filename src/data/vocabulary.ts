export interface VocabItem {
  id: string;
  chinese: string;
  pinyin: string;
  category: string;
  emoji: string;
  english: string;
  imageUrl?: string;
  level: string; // Add level field
  scale?: number; // Customized image scale override (e.g. 1.2 to enlarge, 0.8 to shrink)
  yOffset?: number; // Shift vertically in px (positive is down, negative is up)
  xOffset?: number; // Shift horizontally in px (positive is right, negative is left)
  group?: string; // Grouping related items together under the same category
}

export const VOCABULARY: VocabItem[] = [
  // YCT1
  { id: 'cat', chinese: '猫', pinyin: 'māo', category: '动物', emoji: '🐱', english: 'cat', imageUrl: '/猫.png', level: 'YCT1', group: 'pet' },
  { id: 'dog', chinese: '狗', pinyin: 'gǒu', category: '动物', emoji: '🐶', english: 'dog', imageUrl: '/狗.png', level: 'YCT1', group: 'pet' },
  { id: 'fish', chinese: '鱼', pinyin: 'yú', category: '动物', emoji: '🐟', english: 'fish', imageUrl: '/鱼.png', level: 'YCT1', group: 'aquatic' },
  { id: 'bird', chinese: '鸟', pinyin: 'niǎo', category: '动物', emoji: '🐦', english: 'bird', imageUrl: '/鸟.png', level: 'YCT1', group: 'bird' },
  { id: 'rice', chinese: '米饭', pinyin: 'mǐ fàn', category: '食物', emoji: '🍚', english: 'rice', imageUrl: '/第二部分/米饭.png', level: 'YCT1', group: 'staple' },
  { id: 'noodles', chinese: '面条', pinyin: 'miàn tiáo', category: '食物', emoji: '🍜', english: 'noodles', imageUrl: '/第二部分/面条.png', level: 'YCT1', group: 'staple' },
  { id: 'apple', chinese: '苹果', pinyin: 'píng guǒ', category: '食物', emoji: '🍎', english: 'apple', imageUrl: '/苹果.png', level: 'YCT1', group: 'fruit' },
  { id: 'milk', chinese: '牛奶', pinyin: 'niú nǎi', category: '饮品', emoji: '🥛', english: 'milk', imageUrl: '/牛奶.png', level: 'YCT1', group: 'basic' },
  { id: 'water', chinese: '水', pinyin: 'shuǐ', category: '饮品', emoji: '💧', english: 'water', imageUrl: '/水.png', level: 'YCT1', group: 'basic' },
  { id: 'cake', chinese: '蛋糕', pinyin: 'dàn gāo', category: '食物', emoji: '🍰', english: 'cake', imageUrl: '/第二部分/蛋糕.png', level: 'YCT1', group: 'sweet' },

  // YCT2
  { id: 'bed', chinese: '床', pinyin: 'chuáng', category: '生活用品', emoji: '🛏️', english: 'bed', imageUrl: '/第二部分/床.png', level: 'YCT2', group: 'furniture' },
  { id: 'tv', chinese: '电视', pinyin: 'diàn shì', category: '生活用品', emoji: '📺', english: 'TV', imageUrl: '/电视.png', level: 'YCT2', group: 'appliance' },
  { id: 'table', chinese: '桌子', pinyin: 'zhuō zi', category: '生活用品', emoji: '🪑', english: 'table', imageUrl: '/桌子.png', level: 'YCT2', group: 'furniture' },
  { id: 'chair', chinese: '椅子', pinyin: 'yǐ zi', category: '生活用品', emoji: '🪑', english: 'chair', imageUrl: '/椅子.png', level: 'YCT2', group: 'furniture' },
  { id: 'pencil', chinese: '铅笔', pinyin: 'qiān bǐ', category: '学习用品', emoji: '✏️', english: 'pencil', imageUrl: '/第二部分/铅笔.png', level: 'YCT2', group: 'stationery' },
  { id: 'schoolbag', chinese: '书包', pinyin: 'shū bāo', category: '学习用品', emoji: '🎒', english: 'schoolbag', imageUrl: '/书包.png', level: 'YCT2', group: 'stationery' },
  { id: 'steamed_bun', chinese: '包子', pinyin: 'bāo zi', category: '食物', emoji: '🥟', english: 'steamed bun', imageUrl: '/包子.png', level: 'YCT2', group: 'staple' },
  { id: 'tea', chinese: '茶', pinyin: 'chá', category: '饮品', emoji: '🍵', english: 'tea', imageUrl: '/茶.png', level: 'YCT2', group: 'brewed' },
  { id: 'banana', chinese: '香蕉', pinyin: 'xiāng jiāo', category: '食物', emoji: '🍌', english: 'banana', imageUrl: '/第二部分/香蕉.png', level: 'YCT2', group: 'fruit' },
  { id: 'panda', chinese: '熊猫', pinyin: 'xióng māo', category: '动物', emoji: '🐼', english: 'panda', imageUrl: '/第二部分/熊猫.png', level: 'YCT2', group: 'wild_large' },
  { id: 'draw', chinese: '画画', pinyin: 'huà huàr', category: '爱好', emoji: '🎨', english: 'draw', imageUrl: '/第二部分/画画.png', level: 'YCT2', yOffset: -15, group: 'arts_creative' },
  { id: 'chinese_language', chinese: '汉语', pinyin: 'hàn yǔ', category: '学习用品', emoji: '📚', english: 'Chinese', imageUrl: '/第二部分/汉语书.png', level: 'YCT2', group: 'book_map' },

  // YCT3
  { id: 'swim', chinese: '游泳', pinyin: 'yóu yǒng', category: '爱好', emoji: '🏊', english: 'swim', imageUrl: '/第二部分/游泳.png', level: 'YCT3', group: 'sports_active' },
  { id: 'basketball', chinese: '篮球', pinyin: 'lán qiú', category: '爱好', emoji: '🏀', english: 'basketball', imageUrl: '/篮球.png', level: 'YCT3', group: 'sports_ball' },
  { id: 'football', chinese: '足球', pinyin: 'zú qiú', category: '爱好', emoji: '⚽', english: 'football', imageUrl: '/足球.png', level: 'YCT3', group: 'sports_ball' },
  { id: 'run', chinese: '跑步', pinyin: 'pǎo bù', category: '爱好', emoji: '🏃', english: 'run', imageUrl: '/跑步.png', level: 'YCT3', group: 'sports_active' },
  { id: 'sing', chinese: '唱歌', pinyin: 'chàng gē', category: '爱好', emoji: '🎤', english: 'sing', imageUrl: '/唱歌.png', level: 'YCT3', group: 'arts_perf' },
  { id: 'dance', chinese: '跳舞', pinyin: 'tiào wǔ', category: '爱好', emoji: '💃', english: 'dance', imageUrl: '/跳舞.png', level: 'YCT3', group: 'arts_perf' },
  { id: 'dumplings', chinese: '饺子', pinyin: 'jiǎo zi', category: '食物', emoji: '🥟', english: 'dumplings', imageUrl: '/第二部分/饺子.png', level: 'YCT3', group: 'staple' },
  { id: 'clothes', chinese: '衣服', pinyin: 'yī fu', category: '衣物', emoji: '👕', english: 'clothes', imageUrl: '/第二部分/衣服.png', level: 'YCT3', group: 'clothing' },
  { id: 'shoes', chinese: '鞋', pinyin: 'xié', category: '衣物', emoji: '👟', english: 'shoes', imageUrl: '/第二部分/鞋.png', level: 'YCT3', group: 'wear' },
  { id: 'flower', chinese: '花', pinyin: 'huā', category: '植物', emoji: '🌸', english: 'flower', imageUrl: '/第二部分/花.png', level: 'YCT3', yOffset: -15, group: 'plant' },
  { id: 'tiger', chinese: '老虎', pinyin: 'lǎo hǔ', category: '动物', emoji: '🐯', english: 'tiger', imageUrl: '/第二部分/老虎.png', level: 'YCT3', yOffset: -15, group: 'wild_large' },
  { id: 'sugar', chinese: '糖', pinyin: 'táng', category: '食物', emoji: '🍬', english: 'sugar', imageUrl: '/第二部分/糖.png', level: 'YCT3', group: 'sweet' },
  { id: 'watermelon', chinese: '西瓜', pinyin: 'xī guā', category: '食物', emoji: '🍉', english: 'watermelon', imageUrl: '/第二部分/西瓜.png', level: 'YCT3', group: 'fruit' },
  { id: 'egg', chinese: '鸡蛋', pinyin: 'jī dàn', category: '食物', emoji: '🥚', english: 'egg', imageUrl: '/第二部分/鸡蛋.png', level: 'YCT3', group: 'staple' },
  { id: 'coke', chinese: '可乐', pinyin: 'kě lè', category: '饮品', emoji: '🥤', english: 'cola', imageUrl: '/可乐.png', level: 'YCT3', group: 'basic' },
  { id: 'bread', chinese: '面包', pinyin: 'miàn bāo', category: '食物', emoji: '🍞', english: 'bread', imageUrl: '/第二部分/面包.png', level: 'YCT3', group: 'staple' },

  // YCT4
  { id: 'mobile_phone', chinese: '手机', pinyin: 'shǒu jī', category: '电子产品', emoji: '📱', english: 'mobile phone', imageUrl: '/第二部分/手机.png', level: 'YCT4', group: 'electronic' },
  { id: 'computer', chinese: '电脑', pinyin: 'diàn nǎo', category: '电子产品', emoji: '💻', english: 'computer', imageUrl: '/第二部分/电脑.png', level: 'YCT4', group: 'electronic' },
  { id: 'cup', chinese: '杯子', pinyin: 'bēi zi', category: '生活用品', emoji: '🥛', english: 'cup', imageUrl: '/第二部分/杯子.png', level: 'YCT4', group: 'daily_use' },
  { id: 'medicine', chinese: '药', pinyin: 'yào', category: '生活用品', emoji: '💊', english: 'medicine', imageUrl: '/第二部分/药.png', level: 'YCT4', group: 'daily_use' },
  { id: 'juice', chinese: '果汁', pinyin: 'guǒ zhī', category: '饮品', emoji: '🍹', english: 'juice', imageUrl: '/第二部分/果汁.png', level: 'YCT4', group: 'fruit_juice' },
  { id: 'bus', chinese: '公共汽车', pinyin: 'gōng gòng qì chē', category: '交通工具', emoji: '🚌', english: 'bus', imageUrl: '/第二部分/公共汽车.png', level: 'YCT4', group: 'vehicle' },
  { id: 'umbrella', chinese: '雨伞', pinyin: 'yǔ sǎn', category: '生活用品', emoji: '☂️', english: 'umbrella', imageUrl: '/第二部分/雨伞.png', level: 'YCT4', group: 'daily_use' },
  { id: 'plane', chinese: '飞机', pinyin: 'fēi jī', category: '交通工具', emoji: '✈️', english: 'plane', imageUrl: '/第二部分/飞机.png', level: 'YCT4', group: 'vehicle' },
  { id: 'dress', chinese: '裙子', pinyin: 'qún zi', category: '衣物', emoji: '👗', english: 'dress', imageUrl: '/第二部分/裙子.png', level: 'YCT4', group: 'clothing' },
  { id: 'trousers', chinese: '裤子', pinyin: 'kù zi', category: '衣物', emoji: '👖', english: 'trousers', imageUrl: '/第二部分/裤子.png', level: 'YCT4', group: 'clothing' },

  // YCT5
  { id: 'rabbit', chinese: '兔子', pinyin: 'tù zi', category: '动物', emoji: '🐰', english: 'rabbit', imageUrl: '/第二部分/兔子.png', level: 'YCT5', group: 'wild_small' },
  { id: 'elephant', chinese: '大象', pinyin: 'dà xiàng', category: '动物', emoji: '🐘', english: 'elephant', imageUrl: '/第二部分/大象.png', level: 'YCT5', group: 'wild_large' },
  { id: 'butterfly', chinese: '蝴蝶', pinyin: 'hú dié', category: '动物', emoji: '🦋', english: 'butterfly', imageUrl: '/第二部分/蝴蝶.png', level: 'YCT5', group: 'insect' },
  { id: 'insect', chinese: '虫子', pinyin: 'chóng zi', category: '动物', emoji: '🐛', english: 'insect', imageUrl: '/第二部分/虫子.png', level: 'YCT5', group: 'insect' },
  { id: 'air_conditioner', chinese: '空调', pinyin: 'kōng tiáo', category: '生活用品', emoji: '❄️', english: 'air conditioner', imageUrl: '/第二部分/空调.png', level: 'YCT5', group: 'appliance' },
  { id: 'sofa', chinese: '沙发', pinyin: 'shā fā', category: '生活用品', emoji: '🛋️', english: 'sofa', imageUrl: '/第二部分/沙发.png', level: 'YCT5', group: 'furniture' },
  { id: 'coffee', chinese: '咖啡', pinyin: 'kā fēi', category: '饮品', emoji: '☕', english: 'coffee', imageUrl: '/第二部分/咖啡.png', level: 'YCT5', group: 'brewed' },
  { id: 'piano', chinese: '钢琴', pinyin: 'gāng qín', category: '爱好', emoji: '🎹', english: 'piano', imageUrl: '/第二部分/钢琴.png', level: 'YCT5', group: 'arts_perf' },
  { id: 'take_a_photo', chinese: '照相', pinyin: 'zhào xiàng', category: '爱好', emoji: '📸', english: 'take a photo', imageUrl: '/第二部分/照相.png', level: 'YCT5', group: 'arts_creative' },
  { id: 'glasses', chinese: '眼镜', pinyin: 'yǎn jìng', category: '衣物', emoji: '👓', english: 'glasses', imageUrl: '/第二部分/眼镜.png', level: 'YCT5', group: 'accessory' },
  { id: 'collar', chinese: '项圈', pinyin: 'xiàng quān', category: '衣物', emoji: '⾸', english: 'collar', imageUrl: '/第二部分/项圈.png', level: 'YCT5', group: 'accessory' },
  { id: 'tennis', chinese: '网球', pinyin: 'wǎng qiú', category: '爱好', emoji: '🎾', english: 'tennis', imageUrl: '/第二部分/网球.png', level: 'YCT5', group: 'sports_ball' },
  { id: 'volleyball_5', chinese: '排球', pinyin: 'pái qiú', category: '爱好', emoji: '🏐', english: 'volleyball', imageUrl: '/排球.png', level: 'YCT5', group: 'sports_ball' },
  { id: 'ping_pong', chinese: '乒乓球', pinyin: 'pīng pāng qiú', category: '爱好', emoji: '🏓', english: 'table tennis', imageUrl: '/第二部分/乒乓球.png', level: 'YCT5', group: 'sports_ball' },
  { id: 'chocolate', chinese: '巧克力', pinyin: 'qiǎo kè lì', category: '食物', emoji: '🍫', english: 'chocolate', imageUrl: '/第二部分/巧克力.png', level: 'YCT5', group: 'sweet' },
  { id: 'cookie', chinese: '饼干', pinyin: 'bǐng gān', category: '食物', emoji: '🍪', english: 'cookie', imageUrl: '/第二部分/饼干.png', level: 'YCT5', group: 'sweet' },
  { id: 'ice_cream', chinese: '冰淇淋', pinyin: 'bīng qí lín', category: '食物', emoji: '🍦', english: 'ice cream', imageUrl: '/第二部分/冰激凌.png', level: 'YCT5', group: 'sweet' },
  { id: 'watch', chinese: '手表', pinyin: 'shǒu biǎo', category: '衣物', emoji: '⌚', english: 'watch', imageUrl: '/第二部分/手表.png', level: 'YCT5', group: 'accessory' },
  { id: 'roast_duck', chinese: '烤鸭', pinyin: 'kǎo yā', category: '食物', emoji: '🍗', english: 'roast duck', imageUrl: '/第二部分/烤鸭.png', level: 'YCT5', group: 'staple' },
  { id: 'plate', chinese: '盘子', pinyin: 'pán zi', category: '生活用品', emoji: '🍽️', english: 'plate', imageUrl: '/第二部分/盘子.png', level: 'YCT5', group: 'tableware' },
  { id: 'bowl', chinese: '碗', pinyin: 'wǎn', category: '生活用品', emoji: '🥣', english: 'bowl', imageUrl: '/第二部分/碗.png', level: 'YCT5', group: 'tableware' },
  { id: 'chopsticks', chinese: '筷子', pinyin: 'kuài zi', category: '生活用品', emoji: '🥢', english: 'chopsticks', imageUrl: '/第二部分/筷子.png', level: 'YCT5', group: 'tableware' },
  { id: 'fork', chinese: '叉子', pinyin: 'chā zi', category: '生活用品', emoji: '🍴', english: 'fork', imageUrl: '/第二部分/叉子.png', level: 'YCT5', group: 'tableware' },
  { id: 'train', chinese: '火车', pinyin: 'huǒ chē', category: '交通工具', emoji: '🚂', english: 'train', imageUrl: '/第二部分/火车.png', level: 'YCT5', group: 'vehicle' },
  { id: 'map', chinese: '地图', pinyin: 'dì tú', category: '学习用品', emoji: '🗺️', english: 'map', imageUrl: '/第二部分/地图.png', level: 'YCT5', group: 'book_map' },

  // YCT6
  { id: 'monkey', chinese: '猴子', pinyin: 'hóu zi', category: '动物', emoji: '🐵', english: 'monkey', imageUrl: '/第二部分/猴子.png', level: 'YCT6', group: 'wild_large' },
  { id: 'envelope', chinese: '信封', pinyin: 'xìn fēng', category: '生活用品', emoji: '✉️', english: 'envelope', imageUrl: '/第二部分/信封.png', level: 'YCT6', group: 'daily_use' },
  { id: 'lantern', chinese: '灯笼', pinyin: 'dēng long', category: '生活用品', emoji: '🏮', english: 'lantern', imageUrl: '/第二部分/灯笼.png', level: 'YCT6', group: 'daily_use' },
  { id: 'math', chinese: '数学书', pinyin: 'shù xué', category: '学习用品', emoji: '📐', english: 'math', imageUrl: '/第二部分/数学.png', level: 'YCT6', group: 'book_map' },
  { id: 'bike', chinese: '自行车', pinyin: 'zì xíng chē', category: '交通工具', emoji: '🚲', english: 'bike', imageUrl: '/第二部分/自行车.png', level: 'YCT6', group: 'vehicle' },
  { id: 'alarm_clock', chinese: '闹钟', pinyin: 'nào zhōng', category: '生活用品', emoji: '⏰', english: 'alarm clock', imageUrl: '/第二部分/闹钟.png', level: 'YCT6', group: 'daily_use' },
  { id: 'tree', chinese: '树', pinyin: 'shù', category: '植物', emoji: '🌳', english: 'tree', imageUrl: '/第二部分/树.png', level: 'YCT6', group: 'plant' },
  { id: 'grape', chinese: '葡萄', pinyin: 'pú tao', category: '食物', emoji: '🍇', english: 'grape', imageUrl: '/第二部分/葡萄.png', level: 'YCT6', group: 'fruit' },
  { id: 'key', chinese: '钥匙', pinyin: 'yào shi', category: '生活用品', emoji: '🔑', english: 'key', imageUrl: '/第二部分/钥匙.png', level: 'YCT6', group: 'daily_use' },
  { id: 'electric_light', chinese: '电灯', pinyin: 'diàn dēng', category: '生活用品', emoji: '💡', english: 'electric light', imageUrl: '/第二部分/电灯.png', level: 'YCT6', group: 'appliance' },
  { id: 'dictionary', chinese: '词典', pinyin: 'cí diǎn', category: '学习用品', emoji: '📖', english: 'dictionary', imageUrl: '/第二部分/词典.png', level: 'YCT6', group: 'book_map' },
  { id: 'baby_stroller', chinese: '儿童车', pinyin: 'ér tóng chē', category: '生活用品', emoji: '🛒', english: 'baby stroller', imageUrl: '/第二部分/儿童车.png', level: 'YCT6', group: 'daily_use' },
  { id: 'fish_tank', chinese: '鱼缸', pinyin: 'yú gāng', category: '生活用品', emoji: '🐟', english: 'fish tank', imageUrl: '/第二部分/鱼缸.png', level: 'YCT6', group: 'daily_use' },
  { id: 'newspaper', chinese: '报纸', pinyin: 'zhǐ', category: '学习用品', emoji: '📰', english: 'newspaper', imageUrl: '/第二部分/报纸.png', level: 'YCT6', group: 'reading' },
  { id: 'magazine', chinese: '杂志', pinyin: 'zá zhì', category: '学习用品', emoji: '📖', english: 'magazine', imageUrl: '/第二部分/杂志.png', level: 'YCT6', group: 'reading' },
  { id: 'mooncake', chinese: '月饼', pinyin: 'yuè bǐng', category: '食物', emoji: '🥮', english: 'mooncake', imageUrl: '/第二部分/月饼.png', level: 'YCT6', group: 'sweet' },
  { id: 'hat', chinese: '帽子', pinyin: 'mào zi', category: '衣物', emoji: '🧢', english: 'hat', imageUrl: '/第二部分/帽子.png', level: 'YCT6', group: 'wear' },
  { id: 'refrigerator', chinese: '冰箱', pinyin: 'bīng xiāng', category: '生活用品', emoji: '🧊', english: 'refrigerator', imageUrl: '/第二部分/冰箱.png', level: 'YCT6', group: 'appliance' },
  { id: 'tomato', chinese: '西红柿', pinyin: 'xī hóng shì', category: '食物', emoji: '🍅', english: 'tomato', imageUrl: '/第二部分/西红柿.png', level: 'YCT6', group: 'fruit' },
  { id: 'bamboo', chinese: '竹子', pinyin: 'zhú zi', category: '植物', emoji: '🎍', english: 'bamboo', imageUrl: '/第二部分/竹子.png', level: 'YCT6', group: 'plant' },
];

export const CATEGORIES = ['动物', '食物', '饮品', '生活用品', '学习用品', '爱好', '衣物', '植物', '电子产品', '交通工具'];

export const CATEGORY_MAP: Record<string, string> = {
  '动物': 'Animals',
  '食物': 'Food',
  '饮品': 'Drinks',
  '生活用品': 'Household',
  '学习用品': 'Stationery',
  '爱好': 'Hobbies',
  '衣物': 'Clothing',
  '植物': 'Plants',
  '电子产品': 'Electronics',
  '交通工具': 'Vehicles'
};
