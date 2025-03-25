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
