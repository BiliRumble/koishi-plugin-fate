import { Schema } from 'koishi';
import { FortuneInfo, LevelInfo, RollEvent } from '../data/types';
import { defaultFortuneInfo, defaultLevelInfo } from '../data/defaults';

export interface Config {
	imgUrl: string;
	signExp: number[];
	signCoin: number[];
	currency: string;
	levelSet: LevelInfo[];
	fortuneSet: FortuneInfo[];
	event: RollEvent[];
}

export const Config: Schema<Config> = Schema.object({
	imgUrl: Schema.string().role('link').description('随机横图api或者本地路径').required(),
	signExp: Schema.tuple([Number, Number]).description('签到获得经验范围').default([1, 100]),
	currency: Schema.string().description('Monetary货币名称').default('coin'),
	signCoin: Schema.tuple([Number, Number]).description('签到获得货币范围').default([1, 100]),

	levelSet: Schema.array(
		Schema.object({
			level: Schema.number().description('等级'),
			levelExp: Schema.number().description('等级最低经验'),
			levelName: Schema.string().description('等级名称'),
			levelColor: Schema.string().role('color').description('等级颜色'),
		})
	)
		.role('table')
		.default(defaultLevelInfo)
		.description('经验等级设置: 升序排列 | 最低等级经验必须为0'),

	fortuneSet: Schema.array(
		Schema.object({
			luck: Schema.number().description('每级最低运势'),
			desc: Schema.string().description('运势描述'),
		})
	)
		.role('table')
		.default(defaultFortuneInfo)
		.description(
			'运势值描述信息: 升序排列 | 运势取值0~100, 最低一级必须为0 | 描述信息最长14个中文字符'
		),

	event: Schema.array(
		Schema.object({
			name: Schema.string().description('事件名称'),
			good: Schema.string().description('好的结局'),
			bad: Schema.string().description('坏的结局'),
		})
	)
		.role('table')
		.default([{ name: '网购', good: '买到超值好物', bad: '会被坑' }])
		.description('自定义黄历事件'),
});
