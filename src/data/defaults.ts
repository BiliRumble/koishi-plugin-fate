// src/data/defaults.ts
import { LevelInfo, FortuneInfo, TimeGreeting, RollEvent } from './types';

export const defaultLevelInfo: LevelInfo[] = [
	{ level: 0, levelExp: 0, levelName: '不知名杂鱼', levelColor: '#838383' },
	{ level: 1, levelExp: 500, levelName: '荒野漫步者', levelColor: '#838383' },
	{ level: 2, levelExp: 1000, levelName: '拓荒者', levelColor: '#838383' },
	{ level: 3, levelExp: 1500, levelName: '冒险家', levelColor: '#838383' },
	{ level: 4, levelExp: 2000, levelName: '传说的冒险家', levelColor: '#000000' },
	{ level: 5, levelExp: 3000, levelName: '隐秘收藏家', levelColor: '#000000' },
	{ level: 6, levelExp: 4000, levelName: '言灵探索者', levelColor: '#42bc05' },
	{ level: 7, levelExp: 5000, levelName: '水系魔法师', levelColor: '#42bc05' },
	{ level: 8, levelExp: 6000, levelName: '水系魔导师', levelColor: '#42bc05' },
	{ level: 9, levelExp: 8000, levelName: '藏书的魔女', levelColor: '#2003da' },
	{ level: 10, levelExp: 10000, levelName: '人形图书馆', levelColor: '#2003da' },
	{ level: 11, levelExp: 15000, levelName: '文明归档员', levelColor: '#2003da' },
	{ level: 12, levelExp: 20000, levelName: '高塔思索者', levelColor: '#03a4da' },
	{ level: 13, levelExp: 25000, levelName: '未知探索者', levelColor: '#03a4da' },
	{ level: 14, levelExp: 30000, levelName: '背负真相之人', levelColor: '#9d03da' },
	{ level: 15, levelExp: 35000, levelName: '守密人', levelColor: '#9d03da' },
	{ level: 16, levelExp: 40000, levelName: '被缚的倒吊者', levelColor: '#9d03da' },
	{ level: 17, levelExp: 45000, levelName: '崩毁世界之人', levelColor: '#f10171' },
	{ level: 18, levelExp: 50000, levelName: '命运眷顾者', levelColor: '#f10171' },
	{ level: 19, levelExp: 100000, levelName: '文明领航员', levelColor: '#c9b86d' },
	{ level: 20, levelExp: 1000000, levelName: '天选之人', levelColor: '#ffd000' },
];

export const defaultFortuneInfo: FortuneInfo[] = [
	{ luck: 0, desc: '走平坦的路但会摔倒的程度' },
	{ luck: 5, desc: '吃泡面会没有调味包的程度' },
	{ luck: 15, desc: '上厕所会忘记带纸的程度' },
	{ luck: 20, desc: '上学/上班路上会堵车的程度' },
	{ luck: 25, desc: '点外卖很晚才会送到的程度' },
	{ luck: 30, desc: '点外卖会多给予赠品的程度' },
	{ luck: 35, desc: '出门能捡到几枚硬币的程度' },
	{ luck: 40, desc: '踩到香蕉皮不会滑倒的程度' },
	{ luck: 50, desc: '玩滑梯能流畅滑到底的程度' },
	{ luck: 60, desc: '晚上走森林不会迷路的程度' },
	{ luck: 70, desc: '打游戏能够轻松过关的程度' },
	{ luck: 80, desc: '抽卡能够大成功的程度' },
	{ luck: 95, desc: '天选之人' },
];

export const timeGreetings: TimeGreeting[] = [
	{ range: [0, 5], message: '晚安' },
	{ range: [5, 9], message: '早上好' },
	{ range: [9, 11], message: '上午好' },
	{ range: [11, 14], message: '中午好' },
	{ range: [14, 18], message: '下午好' },
	{ range: [18, 20], message: '傍晚好' },
	{ range: [20, 24], message: '晚上好' },
];

export const defaultEventJson: RollEvent[] = [
	{
		name: '看直播',
		good: '喜欢的V开歌回啦',
		bad: '喜欢的V咕了一整天',
	},
	{
		name: '打轴',
		good: '一次性过',
		bad: '谁说话这么难懂',
	},
	{
		name: '剪辑',
		good: '灵感爆发',
		bad: '一团乱麻',
	},
	{
		name: '校对',
		good: '变成无情的审轴机器',
		bad: '被闪轴闪瞎眼',
	},
	{
		name: '浏览Pixiv',
		good: '发现符合xp的涩图',
		bad: '找不到想要的涩图',
	},
	{
		name: '打SC',
		good: '享受石油佬的乐趣',
		bad: '吃土中',
	},
	{
		name: '吃人',
		good: '你面前这位有成为神龙的潜质',
		bad: '这人会用Aegisub吗？',
	},
	{
		name: '背单词',
		good: '这次六级肯定过',
		bad: '背完50个忘了45个',
	},
	{
		name: '翘课',
		good: '老师不会点名',
		bad: '老师准会抽到你来回答问题',
	},
	{
		name: '做作业',
		good: '做的每个都对',
		bad: '做一个做错一个',
	},
	{
		name: '锻炼一下身体',
		good: '身体健康, 更加性福',
		bad: '能量没消耗多少, 吃得却更多',
	},
	{
		name: '浏览成人网站',
		good: '重拾对生活的信心',
		bad: '你会心神不宁',
	},
	{
		name: '修复BUG',
		good: '你今天对BUG的嗅觉大大提高',
		bad: '新产生的BUG将比修复的更多',
	},
	{
		name: '上AB站',
		good: '还需要理由吗?',
		bad: '满屏兄贵亮瞎你的眼',
	},
	{
		name: '打LOL',
		good: '你将有如神助',
		bad: '你会被虐的很惨',
	},
	{
		name: '打DOTA',
		good: '天梯5000分不是梦',
		bad: '你会遇到猪一样的队友',
	},
	{
		name: '打DOTA2',
		good: 'Godlike',
		bad: '不怕神一样的对手，就怕猪一样的队友',
	},
	{
		name: '穿女装',
		good: '你会得到很多炙热的目光',
		bad: '被父母看到',
	},
	{
		name: '组模型',
		good: '今天的喷漆会很完美',
		bad: '精神不集中板件被剪断了',
	},
	{
		name: '熬夜',
		good: '夜间的效率更高',
		bad: '明天有很重要的事',
	},
	{
		name: '抚摸猫咪',
		good: '才不是特意蹭你的呢',
		bad: '死开! 愚蠢的人类',
	},
	{
		name: '烹饪',
		good: '黑暗料理界就由我来打败',
		bad: '难道这就是……仰望星空派?',
	},
	{
		name: '告白',
		good: '其实我也喜欢你好久了',
		bad: '对不起, 你是一个好人',
	},
	{
		name: '追新番',
		good: '完结之前我绝不会死',
		bad: '会被剧透',
	},
	{
		name: '日麻',
		good: '立直一发自摸！',
		bad: '碰喵吃喵杠喵荣喵！',
	},
	{
		name: '音游',
		good: 'FCACFRPR不过如此',
		bad: '又双叒叕LOST了...',
	},
	{
		name: '向大佬请教',
		good: '太棒了，学到许多',
		bad: '太棒了，什么都没学到',
	},
	{
		name: '早起',
		good: '迎接第一缕阳光',
		bad: '才4点，再睡一会',
	},
	{
		name: '早睡',
		good: '第二天精神饱满',
		bad: '失眠数羊画圈圈',
	},
	{
		name: '入正版游戏',
		good: '买了痛三天，不买悔三年',
		bad: 'emmmm，汇率还是……',
	},
	{
		name: '补旧作',
		good: '意外地对胃口',
		bad: '会踩雷',
	},
	{
		name: '晾晒老婆（抱枕套）',
		good: '天気も晴れココロも晴れ',
		bad: '引发路人围观',
	},
	{
		name: '不按攻略打',
		good: '居然是HAPPY END',
		bad: '碰到BAD END',
	},
	{
		name: '观赏CG包',
		good: '社保。',
		bad: '还不去如看游戏剧情',
	},
	{
		name: '研究黄油创作理论',
		good: '增进鉴赏水平',
		bad: '闲适玩家不需要这些',
	},
	{
		name: '暴露性癖',
		good: '会引来很多趣味相同的变态',
		bad: '四斋蒸鹅心',
	},
	{
		name: '施法',
		good: '传统手艺精进了',
		bad: '房间门关好了吗',
	},
	{
		name: '刷新作动态',
		good: '喜欢的画师发了新图',
		bad: '发现游戏跳票',
	},
	{
		name: '回味玩过的作品',
		good: '重温感动',
		bad: '还是先看看新作',
	},
	{
		name: '出门走走',
		good: '宅久了要发霉',
		bad: '太陽が眩しすぎる',
	},
	{
		name: '思考人生',
		good: '自己的幸福呢？',
		bad: '喵喵……喵？',
	},
	{
		name: '撸猫',
		good: '啊……好爽',
		bad: '家里没有猫的洗洗睡吧',
	},
	{
		name: '抽卡',
		good: '单抽出货',
		bad: '到井前一发出货',
	},
	{
		name: '拼乐高',
		good: '顺利完工',
		bad: '发现少了一块零件',
	},
	{
		name: '跳槽',
		good: '新工作待遇大幅提升',
		bad: '待遇还不如之前的',
	},
	{
		name: '和女神聊天',
		good: '今天天气不错',
		bad: '我去洗澡了，呵呵',
	},
	{
		name: '写开源库',
		good: '今天北斗七星汇聚，裤子造的又快又好',
		bad: '写好会发现github上已经有了更好的',
	},
	{
		name: '给测试妹子埋个bug',
		good: '下辈子的幸福就靠这个bug了',
		bad: '妹子会认为你活和代码一样差',
	},
	{
		name: '写单元测试',
		good: '写单元测试将减少出错',
		bad: '写单元测试会降低你的开发效率',
	},
	{
		name: '洗澡',
		good: '你几天没洗澡了？',
		bad: '会把设计方面的灵感洗掉',
	},
	{
		name: '白天上线',
		good: '今天白天上线是安全的',
		bad: '可能导致灾难性后果',
	},
	{
		name: '重构',
		good: '代码质量得到提高',
		bad: '你很有可能会陷入泥潭',
	},
	{
		name: '招人',
		good: '你面前这位有成为牛人的潜质',
		bad: '这人会写程序吗？',
	},
	{
		name: '面试',
		good: '面试官今天心情很好',
		bad: '面试官不爽，会拿你出气',
	},
	{
		name: '申请加薪',
		good: '老板今天心情很好',
		bad: '公司正在考虑裁员',
	},
	{
		name: '提交代码',
		good: '遇到冲突的几率是最低的',
		bad: '会遇到的一大堆冲突',
	},
	{
		name: '代码复审',
		good: '发现重要问题的几率大大增加',
		bad: '你什么问题都发现不了，白白浪费时间',
	},
	{
		name: '晚上上线',
		good: '晚上是程序员精神最好的时候',
		bad: '你白天已经筋疲力尽了',
	},
	{
		name: '乘电梯',
		good: '正好赶上打卡截止时间',
		bad: '电梯超载',
	},
	{
		name: '复读',
		good: '有时候，人云亦云也是一种生存方式',
		bad: '你的对手是鸽子',
	},
	{
		name: '肝爆',
		good: '努力使人进步，肝爆让人快乐',
		bad: '醒醒，限时活动没了',
	},
	{
		name: '氪金',
		good: '早买早享受，晚买哭着求',
		bad: '第二天就 50% off',
	},
	{
		name: '卖弱',
		good: '楚楚动人更容易打动群友',
		bad: 'Boy♂next♂door',
	},
	{
		name: '唱脑力',
		good: '唱一次提神醒脑，唱两次精神百倍',
		bad: '会与复读机一起对群聊造成毁灭性打击',
	},
	{
		name: '看手元',
		good: '从手元中获得一点音游经验',
		bad: '会被大佬闪瞎',
	},
	{
		name: '录手元',
		good: '音游届的未来新星UP主就是你',
		bad: '打完歌才发现忘记开录像',
	},
	{
		name: '挑战魔王曲',
		good: '一上来就是一个新纪录',
		bad: '有这点时间还不如干点别的',
	},
	{
		name: '咕咕咕',
		good: '一时咕一时爽',
		bad: '会被抓起来，被群友强迫穿上女装',
	},
	{
		name: '与群友水聊',
		good: '扶我起来我还能打字',
		bad: '一不小心就被大佬闪瞎',
	},
	{
		name: '迫害大佬',
		good: '迫害是大佬进步的阶梯',
		bad: '亲爱的，你号没了',
	},
	{
		name: '算命',
		good: '算啥都准',
		bad: '诸事不宜',
	},
	{
		name: '成为魔法少女',
		good: '勇敢的烧酒啊快去拯救世界吧！',
		bad: '会掉头',
	},
	{
		name: '沟通克苏鲁',
		good: '奇怪的知识增加了',
		bad: '&▓▓▓◆▓▓▓￥#▓@■.◆',
	},
	{
		name: '看新番',
		good: '你看的这部新番有成为本季度霸权的可能',
		bad: '这周更新的是总集篇',
	},
	{
		name: '看旧番',
		good: '在宅的道路上又前进了一步',
		bad: '被剧情喂屎',
	},
	{
		name: '看里番',
		good: '传统手艺精进了',
		bad: '房间门关好了吗？',
	},
	{
		name: '看漫画',
		good: '正在追的作品十话连发',
		bad: '刷到正在追的作品的腰斩停更通知',
	},
	{
		name: '看轻小说',
		good: '插画很好舔，孩子很满意',
		bad: '买插画送的厕纸有啥好看的',
	},
	{
		name: '看本子',
		good: '被精准戳中性癖',
		bad: '更新的全是你不喜欢的类型',
	},
	{
		name: '前往女仆咖啡厅',
		good: '感受身心上的治愈',
		bad: '虚假的女仆只会让你内心更加空虚',
	},
	{
		name: '女装Cosplay',
		good: '好评如潮',
		bad: '照片传到班级群还被认出来',
	},
	{
		name: '修仙',
		good: '能突破到下一个境界',
		bad: '会在进阶中遭受心魔侵蚀',
	},
	{
		name: '渡劫',
		good: '万事俱备，只待飞升',
		bad: '没能扛过去，寿元终',
	},
	{
		name: '在妹子面前吹牛',
		good: '改善你矮穷挫的形象',
		bad: '会被识破',
	},
	{
		name: '发超过10条的状态',
		good: '显得你很高产',
		bad: '会被人直接拉黑',
	},
	{
		name: '在B站上传视频',
		good: '播放量爆炸',
		bad: '没人看',
	},
	{
		name: '搬运视频',
		good: '会被硬币砸得很爽',
		bad: '不会有人看的',
	},
	{
		name: '上微博',
		good: '今天的瓜不能错过',
		bad: '被智障发言糊一脸',
	},
	{
		name: '作死',
		good: '节目效果一流',
		bad: '吾之旧友弔似汝，如今坟头草丈五',
	},
	{
		name: '看老黄历',
		good: '反正你已经看了',
		bad: '反正你已经看了',
	},
	{
		name: '学习一门新技能',
		good: '有会成为大神的资质',
		bad: '可能会误入歧途',
	},
	{
		name: '睡懒觉',
		good: '避免内存不足',
		bad: '早上很早醒来睡不着了',
	},
	{
		name: '睡懒觉',
		good: '你今天会更有精神',
		bad: '会错过重要的事情',
	},
	{
		name: '上课玩手机',
		good: '会发现好玩的事情',
		bad: '会被老师教训',
	},
	{
		name: '抄作业',
		good: '没有作业抄的学生生活是罪恶的！',
		bad: '老师会认真批改，你懂的……',
	},
	{
		name: '学习',
		good: '你已经几天(月、年)没学习了？',
		bad: '会睡着',
	},
	{
		name: '出门带伞',
		good: '今天下雨你信不信',
		bad: '好运气都被遮住了',
	},
	{
		name: '走夜路',
		good: '偶尔也要一个人静一静',
		bad: '有坏人',
	},
	{
		name: '补番',
		good: '你会后悔没早点看这部番',
		bad: '你会后悔看了这部番',
	},
	{
		name: '玩Minecraft',
		good: '建筑灵感爆发',
		bad: '启动器都会崩溃',
	},
	{
		name: '上Steam',
		good: '愿望单里全是90%off',
		bad: '钱包被G胖洗劫一空',
	},
	{
		name: '修图',
		good: '原片直出毫无压力',
		bad: 'Photoshop未响应',
	},
	{
		name: '赶稿',
		good: '完美守住deadline',
		bad: '终究还是超期了',
	},
	{
		name: '摸鱼',
		good: '摸鱼一时爽，一直摸鱼一直爽',
		bad: '被老板当场抓获',
	},
	{
		name: '入手新游戏',
		good: '你会玩的很开心',
		bad: '这游戏明天就99%off',
	},
	{
		name: '出门',
		good: '今天会是个好天气',
		bad: '中途突降暴雨',
	},
];
