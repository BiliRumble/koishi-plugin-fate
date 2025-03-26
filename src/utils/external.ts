export async function fetchHitokoto() {
	try {
		const response = await fetch('https://v1.hitokoto.cn/?c=a&c&b&k');
		const {
			hitokoto: hitokotoText,
			from: fromText,
			from_who: fromWhoText,
		} = await response.json();

		let hitokoto;
		if (fromWhoText != null) {
			hitokoto = `『${hitokotoText}』<br>——&nbsp;${fromWhoText}「${fromText}」`;
		} else {
			hitokoto = `『${hitokotoText}』<br>——「${fromText}」`;
		}

		return hitokoto;
	} catch (error) {
		console.error('获取 hitokoto 时出错:', error);
		return '无法获取 hitokoto';
	}
}
