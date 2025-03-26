export interface RollEvent {
	name: string;
	good: string;
	bad: string;
}

export interface UserFortune {
	id: number;
	name: string;
	time: Date;
	exp: number;
	signCount: number;
}

export interface LevelInfo {
	level: number;
	levelExp: number;
	levelName: string;
	levelColor: string;
}

export interface FortuneInfo {
	luck: number;
	desc: string;
}

export interface TimeGreeting {
	range: [number, number];
	message: string;
}

export interface SigninResult {
	status: number;
	getExp: number;
	allExp: number;
	getCoin: number;
	signTime: Date;
	count: number;
}

export interface TemplateData {
	isNight: boolean;
	bgUrl: string;
	avatarUrl: string;
	greeting: string;
	dateString: string;
	username: string;
	signStatus: number;
	expGained: number;
	coinGained: number;
	levelColor: string;
	levelName: string;
	currentExp: number;
	nextLevelExp: number | string;
	progressPercent: string;
	luckValue: number;
	luckDescription: string;
	hitokoto: string;
	goodActions: string[];
	badActions: string[];
}
